/**
 * 配列の先頭要素を返す
 * @throws 配列が空の場合
 */
export function get_first_or_throw<T>(
    items: T[],
): T {
    const [first_item] = items;

    if (first_item === undefined) {
        throw new Error('配列が空です');
    }

    return first_item;
}

