import { PlayerNakedShip } from "@/models/ship/naked";
import { FitPreInfo } from "./preInfo";
import { includes_ship_type } from "@/models/ship/equipped";
import { calc_fit_mold } from "..";

export function calc_fit(
    info: FitPreInfo,
    ship: PlayerNakedShip,
    married_mod: number,
): number {
    const {
        type_id,
        ship_class,
    } = ship;
    const {
        count_normal_46_gun,
        count_proto_46_gun,
        count_41_gun_series,
        count_356_gun_series,
        count_381mm_series,
        count_16inch_mk7,
        count_46_gun_kai,
        count_51_gun,
        count_305_gun,
        count_320_gun,
        count_normal_mk7,
        count_GFCS_mk7,
        count_38_quadruple,
        count_41_gun,
        count_Nagato_low_bonus_gun,
        count_381mm_mk1_series,
        count_155_sec_gun_series,
        count_14_and_152_gun_series,
        count_8inch_series,
        count_152_series,
        count_main_gun_M,
        count_155_series,
        count_Atlanta_gun,
        count_127_HA_gun,
        count_130_gun,
        count_QF_XII,
        count_ASDIC_series,
        count_Mk30_gun,
        count_Mk30_series,
        count_127_kai_ni,
    } = info;

    if (type_id === 'FBB') {
        let total = 0;
        total += calc_fit_mold(-10, count_normal_46_gun, married_mod);
        total += calc_fit_mold(-7, count_46_gun_kai, married_mod);
        total += calc_fit_mold(-5, count_41_gun_series, married_mod);
        total += calc_fit_mold(4, count_356_gun_series);
        total += calc_fit_mold(-2, count_381mm_series, married_mod);
        total += calc_fit_mold(-5, count_16inch_mk7, married_mod);
        total += calc_fit_mold(-10, count_51_gun, married_mod);
        total += calc_fit_mold(12, count_305_gun);
        total += calc_fit_mold(14, count_320_gun);

        if (ship_class === 'Bismarck') {
            // こいつだけ例外でプラス補正 かつ ケッカリ補正がかかる
            // 艦これ改でそうなってるらしい
            total += calc_fit_mold(3, count_356_gun_series, married_mod);
            return total;
        }
        if (ship_class === 'Iowa') {
            total += calc_fit_mold(7, count_normal_mk7, married_mod);
            total += calc_fit_mold(14, count_GFCS_mk7, married_mod);
            return total;
        }
        if (ship_class === 'Гангут') {
            total += calc_fit_mold(-4, count_41_gun_series, married_mod);
            total += calc_fit_mold(3, count_356_gun_series);
            return total;
        }
        if (ship_class === 'Richelieu') {
            total += calc_fit_mold(2, count_38_quadruple);
            total += (calc_fit_mold(-2, count_41_gun_series + count_16inch_mk7, married_mod));
            return total;
        }
        if (ship_class === 'Conte_di_Cavour') {
            total += calc_fit_mold(-4, count_41_gun_series, married_mod);
            return total;
        }
        if (ship_class === 'Yamato') {
            total += calc_fit_mold(3, count_normal_46_gun);
            total += calc_fit_mold(3, count_proto_46_gun);
            total += calc_fit_mold(7, count_46_gun_kai);
            return total;
        }
        return total;
    }
    if (type_id === 'BB') {
        let total = 0;
        if (ship.status.hp <= 92) { // よく分からん基準だけど艦これ改解析でこうなってるらしい
            total += calc_fit_mold(-7, count_normal_46_gun, married_mod);
            total += calc_fit_mold(-3, count_proto_46_gun, married_mod);
            total += calc_fit_mold(2, count_41_gun_series);
            total += calc_fit_mold(2, count_356_gun_series);
            total += calc_fit_mold(2, count_381mm_series, married_mod);
        }
        if (ship_class !== 'Yamato') { // 否定注意
            total += calc_fit_mold(-3, count_46_gun_kai, married_mod);
            total += calc_fit_mold(-5, count_51_gun, married_mod);
        }
        if (ship_class === 'Nagato') {
            if (ship.name_jp === '長門改二') {
                total += calc_fit_mold(4, count_41_gun);
                total += calc_fit_mold(3, count_Nagato_low_bonus_gun);
                return total;
            }

            total += calc_fit_mold(2, count_41_gun_series);
            return total;
        }
        if (ship_class === 'Queen_Elizabeth') {
            total += calc_fit_mold(2, count_381mm_mk1_series);
            return total;
        }
        if (ship_class === 'Yamato') {
            total += calc_fit_mold(3, count_normal_46_gun);
            total += calc_fit_mold(3, count_proto_46_gun);
            total += calc_fit_mold(7, count_46_gun_kai);
            total += count_155_sec_gun_series >= 1
                ? 2
                : 0;
            return total;
        }
        return total;
    }
    if (type_id === 'BBV') {
        let total = 0;
        if (ship_class === 'Yamato') {
            total += calc_fit_mold(-8, count_normal_46_gun + count_46_gun_kai + count_51_gun, married_mod);
            total += calc_fit_mold(-5, count_proto_46_gun, married_mod);
            total += calc_fit_mold(2, count_41_gun_series);
            total += calc_fit_mold(4, count_356_gun_series);
            total += calc_fit_mold(2, count_381mm_series, married_mod);
            total += calc_fit_mold(3, count_normal_46_gun);
            total += calc_fit_mold(3, count_proto_46_gun);
            total += calc_fit_mold(7, count_46_gun_kai);
            total += count_155_sec_gun_series >= 1
                ? 2
                : 0;
            return total;
        }

        total += calc_fit_mold(-7, count_normal_46_gun, married_mod);
        total += calc_fit_mold(-3, count_proto_46_gun, married_mod);
        total += calc_fit_mold(2, count_41_gun_series);
        total += calc_fit_mold(4, count_356_gun_series);
        total += calc_fit_mold(2, count_381mm_series, married_mod);
        total += calc_fit_mold(-7, count_46_gun_kai, married_mod);
        return total;
    }
    if (includes_ship_type(['CL', 'CLT', 'CT'], type_id)) {
        let total = 0;
        total += calc_fit_mold(4, count_14_and_152_gun_series);
        total += -6 * count_8inch_series;

        let penalty = 0
        penalty += -3 * count_main_gun_M;
        penalty += -2 * count_8inch_series;
        penalty *= married_mod;

        total += penalty;
        if (ship_class === 'Agano') {
            total += -1 * count_main_gun_M;
            // この二つはおいおい統合できるといい
            total += calc_fit_mold(3, count_152_series);
            total += count_152_series >= 1
                ? 3
                : 0;
            return total;
        }
        if (ship_class === 'Ooyodo') {
            total += -2 * count_main_gun_M;
            total += 4 * count_155_series;
            return total;
        }
        if (ship_class === 'Atlanta') {
            total += 3 * count_Atlanta_gun;
            return total;
        }
        if (ship.name_jp === '由良改二') {
            total += calc_fit_mold(10, count_127_HA_gun);
            return total;
        }
        return total;
    }
    if (includes_ship_type(['AV', 'AO'], type_id)) {
        let total = 0;
        if (count_main_gun_M === 0) return total;

        total += count_14_and_152_gun_series >= 1
            ? -6 * count_14_and_152_gun_series
            : -8;
        total += -10 * (count_main_gun_M - count_14_and_152_gun_series);
        return total;
    }
    if (ship_class === 'Mogami') {
        return calc_fit_mold(4, count_155_series);
    }
    if (ship_class === 'Ташкент' || ship.name_jp === 'Верный') {
        return calc_fit_mold(5, count_130_gun);
    }
    if (ship_class === 'J') {
        let total = 0;
        total += calc_fit_mold(3, count_QF_XII);
        total += calc_fit_mold(3, count_ASDIC_series);
        return total;
    }
    if (ship_class === 'John_C_Butler') {
        return calc_fit_mold(4, count_Mk30_series);
    }
    if (ship_class === 'Fletcher') {
        let total = 0;
        total += calc_fit_mold(4, count_Mk30_gun + count_Mk30_series);
        total += count_Mk30_gun >= 2
            ? 4
            : 0;
        return total;
    }
    if (ship_class === 'Mutsuki') {
        return calc_fit_mold(5, count_127_HA_gun + count_127_kai_ni);
    }
    return 0;
}