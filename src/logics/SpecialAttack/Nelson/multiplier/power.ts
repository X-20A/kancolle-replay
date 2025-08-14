import { SpecialAttackPowerMod } from "../..";
import { EngagementType } from "@/logics/engagemenet";
import { PlayerFleetUnit } from "@/models/fleet/FleetUnit";
import { is_flagship_unit } from "@/models/fleet/predicates";
import { FifthShip, ThirdShip } from "@/types/fleet/ship";

const BASE = 2;

const calc_engagement_mod = (
    engagement_type: EngagementType,
): number => {
    return engagement_type === 'Disadvantage_T'
        ? 1.25
        : 1;
}

const calc_Nelson_class_partner_mod = (
    attacker_unit: PlayerFleetUnit,
    third_ship: ThirdShip,
    fifth_ship: FifthShip,
): number => {
    // NOTE: ENwikiには記述が無いがソースには攻撃艦自身もNelson級でなければならないとある
    // https://x.com/hojo_rennka/status/1697963510800801842
    if (
        attacker_unit.ship.ship_class !== 'Nelson' ||
        (third_ship.ship_class !== 'Nelson' || fifth_ship.ship_class === 'Nelson')
    ) return 1;

    return is_flagship_unit(attacker_unit)
        ? 1.15
        : 1.2;
}

export function calc_Nelson_special_power_mod(
    attacker_unit: PlayerFleetUnit,
    third_ship: ThirdShip,
    fifth_ship: FifthShip,
    engagement_type: EngagementType,
): SpecialAttackPowerMod {
    const engagement_mod = calc_engagement_mod(engagement_type);
    const Nelson_class_partner_mod = calc_Nelson_class_partner_mod(
        attacker_unit,
        third_ship,
        fifth_ship,
    );

    return BASE
        * engagement_mod
        * Nelson_class_partner_mod as SpecialAttackPowerMod;
}