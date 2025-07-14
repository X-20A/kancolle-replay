import { AbyssalEquippedShip } from "@/models/ship/equipped";
import { WarningType } from "@/types/ship/abyssal";
import { match } from "ts-pattern";

export function calc_warning_message(
    ship: AbyssalEquippedShip,
    warning_type: WarningType,
): string {
    return match(warning_type)
        .with('LBAS_Mod_Boss_unknown', () => `${ship.name_jp}(${ship.master_id})の基地航空隊攻撃時における Mod Boss は不明であり、再登場時は検証される必要があります`)
        .exhaustive();
}