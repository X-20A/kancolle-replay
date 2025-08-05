import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { AbyssalEquippedShip, includes_ship_class, includes_ship_name, includes_ship_type, is_Dock, is_Harbour_vacation, is_Pillbox, is_submarine_category, is_Summer_BB, is_Summer_CV, is_Summer_CA, PlayerEquippedShip, is_French_BB, is_Anchorage } from "../../models/ship/equipped";
import { PlayerShipClass } from "@/types/ship/shipClass";

/// 艦相性別対地ボーナス
// https://en.kancollewiki.net/Combat/Anti-Installation#Ship_Type_Bonuses

const HARBOUR_VACATION_BONUS_SHIP_NAMES: PlayerShipNameJP[] = [
    '赤城', '赤城改', '赤城改二', '赤城改二戊',
    '飛龍', '飛龍改', '飛龍改二',
    '蒼龍', '蒼龍改', '蒼龍改二',
] as const;

const DOCK_BONUS_SHIP_CLASSES: PlayerShipClass[] = [
    'Vittorio_Veneto',
    'Maestrale',
    'Zara',
    'Aquila',
    'Guglielmo_Marconi',
    'Abruzzi',
    'Conte_di_Cavour',
] as const;

const SUMMER_BONUS_SHIP_NAMES: PlayerShipNameJP[] = [
    'Bismarck',
    'Bismarck改',
    'Bismarck zwei',
    'Bismarck drei',
    'Prinz Eugen',
    'Prinz Eugen改',
    'Ark Royal',
    'Ark Royal改',
    'Nelson',
    'Nelson改',
    'Gotland',
    'Gotland改',
    'Gotland andra',
] as const;

const FRENCH_BB_BONUS_SHIP_CLASSES: PlayerShipClass[] = [
    'Commandant_Teste',
    'Richelieu',
    'La_Galissonnière',
    'Mogador',
] as const;

const ANCHORAGE_BONUS_SHIP_NAMES: PlayerShipNameJP[] = [
    '長門',
    '長門改',
    '長門改二',
    '陸奥',
    '陸奥改',
    '陸奥改二',
    '大和',
    '大和改',
    '大和改二',
    '大和改二重',
    '武蔵',
    '武蔵改',
    '武蔵改二',
] as const;

/**
 * 艦相性による対地乗算値(A0)を返す
 * @param attacker_ship 
 * @param target_ship 
 * @returns 
 */
export function calc_ship_compatibility_multiplier(
    attacker_ship: PlayerEquippedShip,
    target_ship: AbyssalEquippedShip,
): number {
    const {
        name_jp: attacker_ship_name,
        type_id: attacker_ship_type,
        ship_class: attacker_ship_class
    } = attacker_ship;

    if (
        is_Pillbox(target_ship) &&
        includes_ship_type(['DD', 'CL'], attacker_ship_type)
    ) return 1.4;
    if (
        is_Harbour_vacation(target_ship) &&
        includes_ship_name(HARBOUR_VACATION_BONUS_SHIP_NAMES, attacker_ship_name)
    ) return 1.25;
    if (
        is_Dock(target_ship) &&
        includes_ship_class(DOCK_BONUS_SHIP_CLASSES, attacker_ship_class)
    ) return 1.1;
    if (
        is_Summer_BB(target_ship) &&
        includes_ship_name(SUMMER_BONUS_SHIP_NAMES, attacker_ship_name)
    ) return 1.1;
    if (
        is_Summer_CA(target_ship) &&
        includes_ship_name(SUMMER_BONUS_SHIP_NAMES, attacker_ship_name)
    ) return 1.1;
    if (
        is_Summer_CV(target_ship) &&
        includes_ship_name(SUMMER_BONUS_SHIP_NAMES, attacker_ship_name)
    ) return 1.1;
    if (
        is_French_BB(target_ship) &&
        includes_ship_class(FRENCH_BB_BONUS_SHIP_CLASSES, attacker_ship_class)
    ) return 1.15;
    if (
        is_Anchorage(target_ship) &&
        includes_ship_name(ANCHORAGE_BONUS_SHIP_NAMES, attacker_ship_name)
    ) return 1.2;

    return 1;
}

/**
 * 艦種による対地加算値(B0)を返す
 * @param attacker_ship 
 * @returns 
 */
export function calc_ship_type_flat(
    attacker_ship: PlayerEquippedShip,
): number {
    return is_submarine_category(attacker_ship)
        ? 30
        : 0;
}