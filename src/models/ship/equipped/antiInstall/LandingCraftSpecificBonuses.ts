import { AntiInstallPreInfo } from "./preInfo";

// https://en.kancollewiki.net/Combat/Anti-Installation#Landing_Craft_Specific_Bonuses

export type LandingCraftSpecificBonuses = {
    multiplier: number,
    flat: number,
}

export function calc_Landing_Craft_specific_bonuses(
    info: AntiInstallPreInfo,
): LandingCraftSpecificBonuses {
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
    } = info;

    const total: LandingCraftSpecificBonuses = {
        multiplier: 1,
        flat: 0,
    };

    if (
        Toku_11_tank_count
        + Isshiki_tank_count
        + Panzer_3_count
    ) {
        total.multiplier *= 1.8; // ? 効かないけどえんやろか
        total.flat += 25;
    }
    if (m4a1_count) {
        total.multiplier *= 1.4;
        total.flat += 35;
    }
    if (Isshiki_tank_count) {
        total.multiplier *= 1.3;
        total.flat += 42;
    }
    if (chiha_count) {
        total.multiplier *= 1.4;
        total.flat += 28;
    }
    if (chiha_kai_count) {
        total.multiplier *= 1.5;
        total.flat += 33;
    }
    if (Army_infantry_count + Army_infantry_chiha_count) {
        total.multiplier *= 1.2;
        total.flat += 60;
    }
    if (Army_chiha_count + Army_chiha_kai_count) {
        total.multiplier *= 1.5;
        total.flat += 70;
    }
    if (Army_chiha_kai_count) {
        total.multiplier *= 1.5;
        total.flat += 50;
    }
    if (Army_infantry_chiha_count) {
        total.multiplier *= 1.6;
        total.flat += 70;
    }

    return total;
}