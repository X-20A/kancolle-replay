import seedrandom from "seedrandom";

/**
 * 乱数生成器。seedを渡すと固定乱数を吐く
 * 出力表:    
 * https://gist.github.com/X-20A/dd25abda5235ae1867eaac21146568f7
 */
export class Rand {
    private rand: () => number;

    constructor(seed?: string) {
        this.rand = seed
            ? seedrandom(seed)
            : Math.random;
    }

    public next(): number {
        return this.rand();
    }
}