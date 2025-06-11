<template>
	<div>
		<h1>Kancolle Sortie Simulator with Wasm</h1>
		<div v-if="is_loading">
			<p>WASM初期化中...</p>
		</div>
		<div v-else>
			<button style="border: 1px solid rgb(100, 108, 255)" @click="runSim">sim 実行</button>
			<div v-if="sim_result">
				<h2>sim結果</h2>
				<pre>{{ sim_result }}</pre>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import init, { echo_data, rand_noop, rand_test, start_sim } from './wasm/kssw';

const sim_result = ref<string>('');
const is_loading = ref<boolean>(true);

/**
 * sim関数を実行し、結果を表示する。
 * WASM初期化はonMountedで明示的に行う。
 * @returns {void}
 */
function runSim(): void {
  try {
    sim_result.value = start_sim();
  } catch (error) {
    sim_result.value = `sim実行時エラー: ${String(error)}`;
  }
}

onMounted(async () => {
	init()
		.then(async () => {
			// 純粋なts - rs -ts やり取り計測用の空関数（Wasm呼び出しのみ）
			console.time('wasm-overhead');
			await rand_noop();
			console.timeEnd('wasm-overhead'); // 0.01904296875 ms

			// 1MBのデータを渡して帰ってくるまでを計測
			const input = new Uint8Array(1024 * 1024).fill(0x55);

			console.time('wasm-data-transfer');
			const output = await echo_data(input);
			console.timeEnd('wasm-data-transfer'); // 1.12109375 ms

			console.log('output length:', output.length);

			// 100万回乱数生成して合算する時間を比較(wasmはオーバーヘッド込み)

			// wasm側計測
			console.time('wasm-rand');
			const result = await rand_test();
			console.log('rust sum: ', result);
			console.timeEnd('wasm-rand'); // 4.090087890625 ms

			// ts側計測
			console.time('ts-rand');
			let sum = 0;
			for (let i = 0; i < 1_000_000; i++) {
				sum += Math.floor(Math.random() * 0x100000000);
			}
			console.log('ts-rand sum', sum);
			console.timeEnd('ts-rand'); // 5.748046875 ms

			// NOTE: 処理時間に劇的な短縮はないが妥当なコストといえる。やりとり時間は小さいがシミュで毎周とかは避けるべき
			// NOTE: tsでseed固定しようとすると、Math.randomよりかなり低速なライブラリを使うことになる
		}).catch((e) => {
			console.error('Wasmの初期化に失敗', e);
		});
});
</script>

<style scoped>

</style>
