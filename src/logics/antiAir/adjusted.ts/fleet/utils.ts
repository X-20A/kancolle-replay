import { Equip } from "@/models/equip/basic";
import { match } from "ts-pattern";

/**
 * 装備倍率(艦隊防空)を返す
 * @param equip 
 * @returns 
 */
export function calc_mod_equip_fleet(
    equip: Equip,
): number {
    return match(equip.aaci_trigger_type)
        .with('A_HAGUN', 'A_HAFD', 'A_AAFD', () => 0.35)
        .with('A_AIRRADAR', () => 0.4)
        .with('A_TYPE3SHELL', () => 0.6)
        // ? 試製46, 46改, 51系が該当するかは未検証
        // ? 暫定: 46cm三連装砲 のみが該当
        .with('A_XLGUN', () => 0.25)
        .with('NONE', 'A_MAINGUNL', 'A_AAGUN', 'A_GUN', () => 0.2)
        .exhaustive();
}