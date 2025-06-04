import { StatusComponent } from "@/types";
import { EquipDatas, EquipFlags, EquipType } from "@/types/equip";
import { createEquipMaster } from "./EquipMaster";

export type Equip = {
    /** 装備マスターID */
    master_id: number,
    /** 装備名(EN) */
    name_en: string,
    /** 装備名(日) */
    name_jp: string,
    /** 装備改修値 */
    implovement: number,
    /** 装備種別ID */
    type: EquipType,
    /** フラグ類 */
    flags: EquipFlags,
    /** マスターデータままの装備加算値 */
    readonly equip_master_addition: StatusComponent,
    /** 装備ボーナス加算値 */
    readonly equip_bonus_addition: StatusComponent,
    /** 装備改修加算値 */
    readonly equip_implovement_addition: StatusComponent,
}

export function createEquip(
    master_id: number,
    ship_id: number,
    implovement: number,
    equip_datas: EquipDatas,
): Equip {
    const equip_master = createEquipMaster(master_id, equip_datas);

    const name_jp = equip_master.name_jp;
    const name_en = equip_master.name_en;

    const type = equip_master.type;
    const flags = equip_master.flags;
    const equip_master_addition = equip_master.status;

    return {
        master_id,
        name_jp,
        name_en,
        implovement,
        type,
        flags,
        equip_master_addition,
    }
}