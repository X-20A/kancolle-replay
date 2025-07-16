export type NavalBase = {
    /**
     * 消費コスト    
     * 噴式強襲や洋上補給はこれに加算される    
     * 轟沈による資源もここでやる？
     */
    fuel: number,
    ammo: number,
    steel: number,
    imo: number,

    // 以下は必ずしも実機通りではない
    // 艦隊に持たせるのもひとつだが、再生成時に注入しないといけないのと、コストもかかる
    maritime_resupply_consume_count: number,
    // 表示ではごっちゃにするかもしれないが、ひとまず分けとく
    normal_damecon_consume_count: number,
    goddes_damecon_consume_count: number,
}

export function derive_naval_base(): NavalBase {
    return {
        fuel: 0,
        ammo: 0,
        steel: 0,
        imo: 0,
        maritime_resupply_consume_count: 0,
        normal_damecon_consume_count: 0,
        goddes_damecon_consume_count: 0,
    };
}