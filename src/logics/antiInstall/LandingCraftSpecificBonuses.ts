import { AntiInstallPreInfo } from "./preInfo";

/// 対地乗算補正・対地加算補正
// https://en.kancollewiki.net/Combat/Anti-Installation#Landing_Craft_Specific_Bonuses

/**
 * 上陸支援舟艇シナジー補正を適用した攻撃力を返す
 * @param info 
 * @param attack_power 
 */
const apply_armed_boats_synergy = (
    info: AntiInstallPreInfo,
    attack_power: number,
): number => {
    const {
        AB_count,
        armed_LC_count,
        armed_boats_synergy_type_A_count,
        armed_boats_synergy_type_B_count,
    } = info;

    let applied_attack_power = attack_power;

    if (
        (AB_count === 1 || armed_LC_count === 1) &&
        AB_count < 2 &&
        armed_LC_count < 2
    ) {
        if (AB_count === 1 && armed_LC_count === 1) {
            if (armed_boats_synergy_type_A_count + armed_boats_synergy_type_B_count >= 2) {
                applied_attack_power *= 1.5;
                applied_attack_power += 25;
            } else if (armed_boats_synergy_type_B_count) {
                applied_attack_power *= 1.4;
                applied_attack_power += 20;
            } else if (armed_boats_synergy_type_A_count) {
                applied_attack_power *= 1.3;
                applied_attack_power += 15;
            }
        } else if (armed_boats_synergy_type_A_count + armed_boats_synergy_type_B_count) {
            applied_attack_power *= 1.2;
            applied_attack_power += 10;
        }
    }

    return applied_attack_power;
}

/**
 * 対地特効補正を適用した攻撃力返す
 * @param info 
 * @param attack_power 
 * @returns 
 */
export function apply_Landing_Craft_specific_bonuses(
    info: AntiInstallPreInfo,
    attack_power: number,
): number {
    const {
        Toku_11_tank_count,
        Isshiki_tank_count,
        Panzer_3_count,
        m4a1_count,
        chiha_count,
        chiha_kai_count,
        Army_infantry_count,
        Army_chiha_count,
        Army_chiha_kai_count,
        Army_infantry_chiha_count,
        Armys_count,
        landing_tank_count,
        Katsu_tanks_count,
        Katsu_tank_kai_count,
    } = info;

    let applied_attack_power = attack_power;

    if (
        Toku_11_tank_count
        + Isshiki_tank_count
        + Panzer_3_count
    ) {
        applied_attack_power * 1.8 + 25;
    }
    if (m4a1_count) {
        applied_attack_power * 1.4 + 35;
    }
    if (Isshiki_tank_count) {
        applied_attack_power * 1.3 + 42;
    }
    if (chiha_count) {
        applied_attack_power * 1.4 + 28;
    }
    if (chiha_kai_count) {
        applied_attack_power * 1.5 + 33;
    }
    if (Army_infantry_count + Army_infantry_chiha_count) {
        applied_attack_power * 1.2 + 60;
    }
    if (Army_chiha_count + Army_chiha_kai_count) {
        applied_attack_power * 1.5 + 70;
    }
    if (Army_chiha_kai_count) {
        applied_attack_power * 1.5 + 50;
    }
    if (Army_infantry_chiha_count) {
        applied_attack_power * 1.6 + 70;
    }
    if (Armys_count >= 2) {
        applied_attack_power * 2 + 100;

        if (
            Army_infantry_chiha_count >= 1 ||
            Armys_count + landing_tank_count >= 3
        ) {
            applied_attack_power * 3 + 150;
        }
        if (Katsu_tanks_count) applied_attack_power += 100;
        if (Katsu_tank_kai_count) applied_attack_power += 72;
    }
    if (Katsu_tanks_count) {
        applied_attack_power * 1.2 + 42;
    }
    if (Katsu_tank_kai_count) {
        applied_attack_power * 1.1 + 28;
    }
    applied_attack_power = apply_armed_boats_synergy(info, applied_attack_power);

    return applied_attack_power;
}