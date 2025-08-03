import { includes_equip_type, includes_player_equip_name, PlayerEquip } from "@/models/equip/basic"
import { Brand } from "@/types/brands"
import { AntiInstallPreInfo } from "./preInfo";
import { Type3InstallBonus } from "./generalBonus";





export type AntiDockMultiplier = Brand<number, 'AntiDockMultiplier'>

export function calc_anti_Dock_multiplier(
    info: AntiInstallPreInfo,
    type_3_install_bonus: Type3InstallBonus,
): AntiDockMultiplier {
    const {
        type_3_LC_count,
        carrier_bomber_count,
        seaplane_bomber_count,
        WG_count,
        Type_3_shell_count,
    } = info;

    let total = 1;

    if (carrier_bomber_count >= 1) total *= 1.1;
    if (carrier_bomber_count >= 2) total *= 1.1;
    if (seaplane_bomber_count >= 1) total *= 1.1;
    if (WG_count >= 1) total *= 1.1;
    if (WG_count >= 2) total *= 1.1;
    if (Type_3_shell_count) total *= 1.3;
    if (type_3_LC_count >= 1) total *= 1.2 * type_3_install_bonus;
    
}