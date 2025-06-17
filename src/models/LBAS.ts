import { PlaneEquip } from "./equip/basic";

export type LBAS = {
    equips: PlaneEquip[],
    hp: number,
    armor: number,
}

export function derive_LBAS(
    equips: PlaneEquip[],
): LBAS {

    return {
        equips,
        hp: 200,
        armor: 0,
    }
}