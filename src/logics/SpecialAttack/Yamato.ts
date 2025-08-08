import { PlayerShipNameJP } from "@/types/ship/playerNameJP";
import { SpecialAttacckIneligible, ValidSpecialAttack } from ".";
import { is_already_special_attack_activated, PlayerFleet } from "@/models/fleet/Fleet";
import { SpecialAttackComponentLength, SpecialAttackUnits } from "./util";
import { FormationType, has_at_least } from "@/types";
import { includes_formation_type } from "../formation";
import { includes_ship_name, is_damage_moderatery_or_more } from "@/models/ship/equipped";

const TRIGGERABLE_SHIP_NAMES: PlayerShipNameJP[] = [
    '大和改二', '大和改二重',
    '武蔵改二',
] as const;

const TRIGGERABLE_FORMATION: FormationType[] = [
    'Echelon',
    'CruisingFormation_4',
] as const;

const REQUIRED_SURFACE_SHIP_COUNT = 6;

const THREE_SHIPS_ATTACK_PARTNER_COMBINATIONS: [PlayerShipNameJP, PlayerShipNameJP][] = [
    ['長門改二', '陸奥改二'],
    ['伊勢改二', '日向改二'],
    ['扶桑改二', '山城改二'],
    ['Warspite改', 'Nelson改'],
    ['Warspite改', 'Valiant改'],
    ['Nelson改', 'Rodney改'],
    ['金剛改二丙', '比叡改二丙'],
    ['金剛改二丙', '榛名改二乙'],
    ['金剛改二丙', '榛名改二丙'],
    ['金剛改二丙', '霧島改二丙'],
    ['比叡改二丙', '霧島改二丙'],
    ['South Dakota改', 'Washington改'],
    ['Colorado改', 'Maryland改'],
    ['Italia', 'Roma改'],
    ['Richelieu改', 'Jean Bart改'],
    ['Richelieu', 'Jean Bart改'],
] as const;

type YamatoClassSpecialAttack = ValidSpecialAttack<
    | 'Yamato_2_Ships_Special'
    | 'Yamato_3_Ships_Special'
>

export function evaluate_Yamato_class_special_attack(
    attacker_fleet: PlayerFleet,
    attacker_units: SpecialAttackUnits,
    valid_ship_length: SpecialAttackComponentLength,
): YamatoClassSpecialAttack | SpecialAttacckIneligible {
    if (!has_at_least(attacker_units, 3)) return 'Ineligible';

    const flagship = attacker_units[0].ship;
    const second_ship = attacker_units[1].ship;
    const third_ship = attacker_units[2].ship;

    const can_trigger = (
        includes_ship_name(TRIGGERABLE_SHIP_NAMES, flagship.name_jp) &&
        !is_already_special_attack_activated(attacker_fleet) &&
        valid_ship_length >= REQUIRED_SURFACE_SHIP_COUNT &&
        includes_formation_type(TRIGGERABLE_FORMATION, attacker_fleet.formation) &&
        !is_damage_moderatery_or_more(flagship) &&
        !is_damage_moderatery_or_more(second_ship)
    );

    if (!can_trigger) return 'Ineligible';


}