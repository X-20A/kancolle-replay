import { describe, it } from "vitest";
import { REGACY_PLAYER_EQUIP_DATAS } from "./data/player";
import { calc_aaci_trigger_type } from "@/models/equip/master";
import { derive_player_equip_master } from "@/models/equip/master/player";
import { brandEquipId } from "@/types/brands/equip";
import { PLAYER_EQUIP_DATAS } from "@/datas/equip/base/player";
import { EQUIP_TYPE_DATAS } from "@/datas/equip/typeData";
import { REGACY_ABYSSAL_EQUIP_DATAS } from "./data/abbysal";
import { derive_abyssal_equip_master } from "@/models/equip/master/abyssal";
import { ABYSSAL_EQUIP_DATAS } from "@/datas/equip/base/abbysal";

describe('データ移行テスト a-type', () => {
    it('プレイヤー', () => {
        // 旧式評価
        Object.entries(REGACY_PLAYER_EQUIP_DATAS).forEach(([id, regacy_equip_data]) => {
            const equip_id = Number(id);
            const regacy_equip_master = derive_player_equip_master(brandEquipId(equip_id))

            const original_a_type = calc_aaci_trigger_type(
                regacy_equip_master.skill_trigger_type,
                regacy_equip_data,
                EQUIP_TYPE_DATAS[regacy_equip_master.type_id],
                regacy_equip_master.icon_id,
                regacy_equip_master.status.anti_air,
            )

            // 新式評価
            const new_a_type = PLAYER_EQUIP_DATAS[equip_id].a_type;

            if (
                new_a_type === undefined
                || original_a_type !== new_a_type
            ) {
                console.log(`name: ${regacy_equip_master.name_jp}, original_a_type: ${original_a_type}`);
            }
        });
    });

    it('深海', () => {
        // 旧式評価
        Object.entries(REGACY_ABYSSAL_EQUIP_DATAS).forEach(([id, regacy_equip_data]) => {
            const equip_id = Number(id);
            const regacy_equip_master = derive_abyssal_equip_master(brandEquipId(equip_id))

            const original_a_type = calc_aaci_trigger_type(
                regacy_equip_master.skill_trigger_type,
                regacy_equip_data,
                EQUIP_TYPE_DATAS[regacy_equip_master.type_id],
                regacy_equip_master.icon_id,
                regacy_equip_master.status.anti_air,
            )

            // 新式評価
            const new_a_type = ABYSSAL_EQUIP_DATAS[equip_id].a_type;

            if (
                new_a_type === undefined
                || original_a_type !== new_a_type
            ) {
                console.log(`name: ${regacy_equip_master.name_jp}, original_a_type: ${original_a_type}`);
            }
        });
    });
});