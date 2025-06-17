/**
 * 普通の計算をチェインしたいだけのやつ    
 * Math Abstractor Framework    
 * マフろう
 */
export class Maf {
    private value: number;

    /** 初期値から MathChain を作成*/
    static from(value: number): Maf {
        return new Maf(value);
    }
    private constructor(value: number) {
        this.value = value;
    }
    /** 加算 */
    add(x: number): this {
        this.value += x;
        return this;
    }
    /** 減算 */
    sub(x: number): this {
        this.value -= x;
        return this;
    }
    /** 乗算 */
    mul(x: number): this {
        this.value *= x;
        return this;
    }
    /** 除算 */
    div(x: number): this {
        this.value /= x;
        return this;
    }
    /** 累乗 */
    pow(exponent: number): this {
        this.value = Math.pow(this.value, exponent);
        return this;
    }
    /** 平方根 */
    sqrt(): this {
        this.value = Math.sqrt(this.value);
        return this;
    }
    /** 切り捨て */
    floor(): this {
        this.value = Math.floor(this.value);
        return this;
    }
    /** 四捨五入 */
    round(): this {
        this.value = Math.round(this.value);
        return this;
    }
    /** 切り上げ */
    ceil(): this {
        this.value = Math.ceil(this.value);
        return this;
    }
    /** 最小値制限 */
    min(x: number): this {
        this.value = Math.min(this.value, x);
        return this;
    }
    /** 最小値制限 */
    max(x: number): this {
        this.value = Math.max(this.value, x);
        return this;
    }
    /** 符号反転 (-x) */
    neg(): this {
        this.value = -this.value;
        return this;
    }
    /** 最終結果の取得 */
    get done(): number {
        return this.value;
    }
}