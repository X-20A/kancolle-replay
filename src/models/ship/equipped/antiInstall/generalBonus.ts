import { Brand } from "@/types/brands";
import { AntiInstallPreInfo } from "./preInfo";

export type Type1InstallBonus = Brand<number, 'Type1InstallBonus'>

const calc_type_1_bonus = (
    info: AntiInstallPreInfo,
): Type1InstallBonus => {
    const {
        type_1_LC_count,
        type_2_LC_count,
        total_type_1_LC_improvement,
        Toku_4_tanks_count,
        total_Toku_4_tanks_improvement,
    } = info;

    let total = 1;
    if (
        type_1_LC_count ||
        type_2_LC_count
    ) total += (
        total_type_1_LC_improvement / (type_1_LC_count + type_2_LC_count)
    ) / 50;

    if (Toku_4_tanks_count) {
        total += (total_Toku_4_tanks_improvement / Toku_4_tanks_count) / 50;
    }

    return total as Type1InstallBonus;
}

export type Type3InstallBonus = Brand<number, 'Type3InstallBonus'>

const calc_type_3_bonus = (
    info: AntiInstallPreInfo,
): Type3InstallBonus => {
    const {
        type_3_LC_count,
        total_type_3_LC_improvement,
    } = info;

    const BASE = 1;
    return type_3_LC_count >= 1
        ? BASE + (total_type_3_LC_improvement / type_3_LC_count) / 30 as Type3InstallBonus
        : BASE as Type3InstallBonus;
}

export type GeneralInstallBonuses = {
    type_3_install_bonus: Type3InstallBonus,
}

const calc_general_install_bonuses = (
    info: AntiInstallPreInfo,
): GeneralInstallBonuses => {
    const bonuses: GeneralInstallBonuses = {
        type_3_install_bonus: calc_type_3_bonus(info),
    };

    return bonuses;
}