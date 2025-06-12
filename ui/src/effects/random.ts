import init, { InitOutput } from "@/wasm/kssw";

// Finalizerで使用するデータの型をより厳密に定義
type FinalizerData = {
    pointer: number;
    cache_size: number;
    wasm_module: InitOutput;
} & { __brand: "FinalizerData" }; // ブランド型を追加して型の混同を防ぐ

/**
 * Seed値を指定して乱数を生成するクラス    
 * cache_sizeは大きいほど高速化が期待できるが、100万あたりまでにしとくのが無難    
 * スレッドセーフではないので、スレッドごとにインスタンス化すること
 */
export class SeedableRand {
    /** 一度に生成してキャッシュする数 */
    private readonly cache_size: number;
    /** メモリアクセスの為のポインタ */
    private pointer: number | null;
    /** 初期化されたWasmインスタンス */
    private readonly wasm_module: InitOutput;
    /** wasmと共有する乱数の配列 */
    private randoms: Float64Array | null;

    private cache_index: number;
    private finalizer: FinalizationRegistry<FinalizerData>;


    static async createSeedableRand(seed: number, cache_size: number) {
        const wasmModule = await init();
        const pointer = wasmModule.allocate_buffer(cache_size);

        if (pointer === 0) {  // WASM側のエラーをチェック アホデカいcache_sizeを指定するとたぶんここでコケる
            throw new Error('Wasmの初期化に失敗しました');
        }

        const randoms = new Float64Array(wasmModule.memory.buffer, pointer, cache_size);
        wasmModule.fill_buffer(seed, pointer, cache_size);

        // ファイナライザーを登録
        // jsが変数を破棄したらwasmのメモリを解放する
        // ファイナライザーを登録
        const finalizer = new FinalizationRegistry((heldValue: FinalizerData) => {
            if (heldValue.pointer !== 0) {
                heldValue.wasm_module.deallocate_buffer(heldValue.pointer, heldValue.cache_size);
            }
        });

        const instance = new SeedableRand(
            cache_size,
            wasmModule,
            pointer,
            randoms,
            0,
            finalizer
        );

        finalizer.register(
            instance,
            {
                pointer,
                cache_size,
                wasm_module: wasmModule,
                __brand: "FinalizerData"
            } as FinalizerData
        );

        return instance;
    }

    private constructor(
        cache_size: number,
        wasmModule: InitOutput,
        pointer: number,
        randoms: Float64Array,
        cache_index: number,
        finalizer: FinalizationRegistry<FinalizerData>,
    ) {
        this.cache_size = cache_size;
        this.wasm_module = wasmModule;
        this.pointer = pointer;
        this.randoms = randoms;
        this.cache_index = cache_index;
        this.finalizer = finalizer;
    }

    /**
     * 乱数取得
     */
    public next(): number {
        if (!this.pointer || !this.randoms) throw new Error('このインスタンスは既に破棄されています');

        if (this.cache_index >= this.cache_size) {
            this.wasm_module.fill_buffer(this.randoms[this.cache_index - 1], this.pointer, this.cache_size);
            this.cache_index = 0;
        }
        const value = this.randoms[this.cache_index];
        this.cache_index++;
        return value;
    }

    /**
     * 明示的にメモリを解放
     */
    public free() {
        if (this.pointer !== null && this.randoms !== null) {
            this.wasm_module.deallocate_buffer(this.pointer, this.cache_size);
            this.finalizer.unregister(this); // ファイナライザーの登録を解除
            this.pointer = null;
            this.randoms = null;
        }
    }

    // デストラクタ
    public [Symbol.dispose](): void {
        this.free();
    }

    /**
     * ベンチマーク: Math.randomと比較
     * @param {number} seed - 乱数シード
     */
    static async benchmark(
        seed: number,
        cache_size: number,
        taken_count: number,
    ) {
        const ts_start = performance.now();
        let ts_rand_sum = 0;
        for (let i = 0; i < taken_count; i++) {
            ts_rand_sum += Math.random();
        }
        console.log('ts-rand sum', ts_rand_sum);
        console.log(`ts time cost: ${performance.now() - ts_start}ms`);

        const rand_gen = await SeedableRand.createSeedableRand(seed, cache_size);

        const start = performance.now();
        let sum = 0;
        for (let i = 0; i < taken_count; i++) {
            sum += rand_gen.next();
        }
        console.log('rand sum: ', sum);
        console.log(`WASM time cost: ${performance.now() - start}ms`);

        rand_gen.free();
    }
}