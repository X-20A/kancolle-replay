import { Brand } from "@/types/brands";
import { AntiInstallPreInfo } from "./preInfo";

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