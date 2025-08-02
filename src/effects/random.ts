import { brandRandValue, RandValue } from "@/types/brands/other";
import seedrandom from "seedrandom";

export interface RandGenerator {
    next(): RandValue;
}

/**
 * 乱数生成器。seedを渡すと固定乱数を吐く    
 * 出力表:    
 * https://gist.github.com/X-20A/dd25abda5235ae1867eaac21146568f7
 */
export class Rand implements RandGenerator {
    private rand: () => number;

    constructor(seed?: string) {
        this.rand = seed
            ? seedrandom(seed)
            : Math.random;
    }

    public next(): RandValue {
        return brandRandValue(this.rand());
    }
}

/**
 * 乱数生成器モック    
 * 予め渡した数値を吐くだけ
 */
export class MockRand implements RandGenerator {
    private values: number[];
    private index: number;

    constructor(values: number[]) {
        this.values = [...values];
        this.index = 0;
    }

    next(): RandValue {
        if (this.index >= this.values.length) throw new Error('乱数値が足りません');
        
        return brandRandValue(this.values[this.index++]);
    }
}

/**
 * 乱数抽選をパスするか判定して返す
 * @param success_rate 
 * @param rand_value 
 * @returns 
 */
export function is_random_successful(
    success_rate: number,
    rand_value: RandValue,
): boolean {
    return rand_value < success_rate;
}