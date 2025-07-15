type Cost = {
    fuel: number,
    ammo: number,
    steel: number,
    imo: number,
}

/**
 * 母港
 */
export type NavalBase = {
    /**
     * 消費コスト    
     * 噴式強襲や洋上補給はこれに加算される    
     * 轟沈による資源もここでやる？
     */
    costs: Cost,
}

export function derive_naval_base(): NavalBase {
    return {
        costs: {
            fuel: 0,
            ammo: 0,
            steel: 0,
            imo: 0,
        }
    }
}