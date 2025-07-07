import { Rand } from "@/effects/random";
import { EquippedShip, is_damage_lightly_or_more, is_install, is_PT, is_submarine_category, is_sunk } from "@/models/ship/equipped";
import { CombinedFleetFormationType, SingleFleetFormationType } from "@/types";
import { is_front } from "../formation";
import { AbyssalSingleFleet, CombinedFleet, SingleFleet } from "@/models/fleet/Fleet";
import { COMBINED_FLEET_FORMATION_PROTECT_RATIO_DATA, MAIN_FLEET_RATE_MAP, SINGLE_FLEET_FORMATION_PROTECT_RATIO_DATA } from "./data";
import { FleetUnit, is_flag_ship, is_primary_flag_ship } from "@/models/fleet/FleetUnit";
import { EscortFleetUnits } from "@/types/brands/fleet";

const CHOICE_TARGET_FROM_COMBINED_FLEET = {
    LBAS: 'lbas',
    AerialCombat: 'aerial_combat',
    SupoortShelling: 'support_shelling',
    OpeningTorpedo: 'opening_torpedo',
    Shelling: 'shelling',
    Torpedo: 'torpedo',
    FriendFleet: 'friend_fleet',
} as const;

/**
 * 連合艦隊で第一艦隊と第二艦隊の両方が対象選択可能な場合にどちらを狙うか の種別
 * https://wikiwiki.jp/kancolle/攻撃対象の選択#ddf0a2b0
 */
export type TargetFromCombinedFleet =
    typeof CHOICE_TARGET_FROM_COMBINED_FLEET[keyof typeof CHOICE_TARGET_FROM_COMBINED_FLEET];

type EachFleet = 'main' | 'escort'

/**
 * 主力 | 随伴 どちらかが全滅していれば、残存艦のある方を返す    
 * どちらも生き残っていれば 'undetermined' を返す
 * @param target_fleet 
 * @returns 
 */
const calc_prefer_alive_fleet = (
    target_fleet: CombinedFleet,
): EachFleet | 'undetermined' => {
    if (target_fleet.main_fleet_units.every(unit => is_sunk(unit.ship))) return 'escort';
    if (target_fleet.escort_fleet_units.every(unit => is_sunk(unit.ship))) return 'main';
    return 'undetermined';
}

/**
 * 天霧とももちの優先ターゲティングの結果を返す    
 * 条件に該当しなければ 'undetermined' を返す
 * @param attacker_ship 
 * @param target_fleet 
 * @returns 
 */
const calc_unique_fleet_targeting = (
    attacker_ship: EquippedShip,
    target_fleet: CombinedFleet,
): EachFleet | 'undetermined' => {
    if (['天霧改二', '天霧改二丁'].includes(attacker_ship.name_jp)) {
        const includes_pt_in_main_fleet = target_fleet.main_fleet_units.some(is_PT);
        const includes_pt_in_escort_fleet = target_fleet.escort_fleet_units.some(is_PT);

        if (includes_pt_in_main_fleet && !includes_pt_in_escort_fleet) return 'main';
        if (!includes_pt_in_main_fleet && includes_pt_in_escort_fleet) return 'escort';
    }
    if (['第百一号輸送艦', '第百一号輸送艦改'].includes(attacker_ship.name_jp)) {
        const includes_install_in_main_fleet =
            target_fleet.main_fleet_units.some(unit => is_install(unit.ship));
        const includes_install_in_escort_fleet =
            target_fleet.escort_fleet_units.some(unit => is_install(unit.ship));

        if (includes_install_in_main_fleet && !includes_install_in_escort_fleet) return 'main';
        if (!includes_install_in_main_fleet && includes_install_in_escort_fleet) return 'escort';
    }
    return 'undetermined';
}

/**
 * 対連合艦隊ターゲティングにおける、艦 vs 艦の砲撃戦時に 主力 | 随伴 どちらをターゲットするか返す    
 * ! 砲撃支援は含まない
 * @param attacker_ship 
 * @param target_fleet 
 * @param rand 
 * @param main_fleet_rate 
 * @returns 
 */
export function calc_shelling_target_fleet(
    attacker_ship: EquippedShip,
    target_fleet: CombinedFleet,
    rand: Rand,
): EachFleet {
    const prefer_alive_fleet = calc_prefer_alive_fleet(target_fleet);
    if (prefer_alive_fleet !== 'undetermined') return prefer_alive_fleet;

    const unique_target = calc_unique_fleet_targeting(
        attacker_ship,
        target_fleet,
    );
    if (unique_target !== 'undetermined') return unique_target;

    if (rand.next() < MAIN_FLEET_RATE_MAP['shelling']) return 'main';
    return 'escort';
}

/**
 * 対連合艦隊ターゲティングにおける、砲撃戦"以外"の場合に 主力 | 随伴 どちらをターゲットするか返す  
 * @param target_fleet 
 * @param rand 
 * @param main_fleet_rate 
 * @returns 
 */
export function calc_general_target_fleet(
    target_fleet: CombinedFleet,
    rand: Rand,
    phase_type: Exclude<TargetFromCombinedFleet, 'shelling'>,
): EachFleet {
    const prefer_alive_fleet = calc_prefer_alive_fleet(target_fleet);
    if (prefer_alive_fleet !== 'undetermined') return prefer_alive_fleet;

    if (rand.next() < MAIN_FLEET_RATE_MAP[phase_type]) return 'main';
    return 'escort';
}

/**
 * 警戒陣によるリロールで選ばれた艦を返す
 * @param first_target_ship_struct 
 * @param target_ship_structs 
 * @param formation 
 * @param ship_length 
 * @param ship_index 
 * @param rand 
 * @returns 
 */
const calc_vanguard_target = (
    first_target_ship_struct: FleetUnit,
    target_ship_structs: FleetUnit[],
    formation: SingleFleetFormationType,
    ship_length: number,
    ship_index: number,
    rand: Rand,
): FleetUnit => {
    if (
        formation !== 'Vanguard'
        || !is_front(ship_length, ship_index)
    ) return first_target_ship_struct;

    return target_ship_structs[Math.floor(rand.next() * target_ship_structs.length)]
}

/**
 * 艦群から完全にランダムに艦を返す
 * @param target_ship_structs 
 * @param rand 
 * @returns 
 */
const select_random_target = (
    target_ship_structs: FleetUnit[],
    rand: Rand
): FleetUnit => {
    return target_ship_structs[Math.floor(rand.next() * target_ship_structs.length)];
}

/**
 * 通常艦隊旗艦庇い後の選択艦を返す
 * @param pre_target_unit 
 * @param target_units 
 * @param protect_ratio 
 * @param rand 
 * @returns 
 */
const protect_flagship_in_single_fleet = (
    pre_target_unit: FleetUnit,
    target_units: FleetUnit[],
    protect_ratio: number,
    rand: Rand
): FleetUnit => {
    if (pre_target_unit.fleet_type !== 'single') throw new Error('連合艦隊の「かばう」処理に誤って通常艦隊の「かばう」処理が呼び出されています');
    if (!is_primary_flag_ship(pre_target_unit) || is_install(pre_target_unit.ship)) {
        return pre_target_unit;
    }

    const is_pre_target_submarine = is_submarine_category(pre_target_unit.ship);
    const protect_candidates = target_units.filter(target_unit =>
        !is_primary_flag_ship(pre_target_unit) && // 旗艦弾き
        is_pre_target_submarine === is_submarine_category(target_unit.ship) &&
        is_damage_lightly_or_more(target_unit.ship)
    );

    if (!protect_candidates.length) {
        return pre_target_unit;
    }

    return rand.next() < protect_ratio
        ? protect_candidates[Math.floor(rand.next() * protect_candidates.length)]
        : pre_target_unit;
}

const protect_flagship_in_combined_fleet = (
    pre_target_unit: FleetUnit,
    target_units: FleetUnit[],
    escort_fleet_units: EscortFleetUnits[],
    protect_ratio: number,
    rand: Rand
): FleetUnit => {
    if (pre_target_unit.fleet_type === 'single') throw new Error('通常艦隊の「かばう」処理に誤って連合艦隊の「かばう」処理が呼び出されています');
    if (!is_primary_flag_ship(pre_target_unit) || is_install(pre_target_unit.ship)) {
        return pre_target_unit;
    }

    const is_pre_target_submarine = is_submarine_category(pre_target_unit.ship);

    // NOTE: 主力艦隊旗艦が潜水艦系であった場合、随伴艦隊の潜水艦も「かばう」に参加できる 😩
    const considered_submarine_target_units = is_pre_target_submarine
        ? target_units.concat(escort_fleet_units.filter(unit => is_submarine_category(unit.ship)))
        : target_units;
    const protect_candidates = considered_submarine_target_units.filter(target_unit =>
        !is_primary_flag_ship(pre_target_unit) && // 旗艦弾き
        is_pre_target_submarine === is_submarine_category(target_unit.ship) &&
        is_damage_lightly_or_more(target_unit.ship)
    );

    if (!protect_candidates.length) {
        return pre_target_unit;
    }

    return rand.next() < protect_ratio
        ? protect_candidates[Math.floor(rand.next() * protect_candidates.length)]
        : pre_target_unit;
}

/**
 * 通常艦隊 vs 通常艦隊 においてターゲットを選出して返す
 * @param target_units 
 * @param formation 
 * @param rand 
 * @returns 
 */
export function choice_target_in_single_vs_single(
    target_units: FleetUnit[],
    formation: SingleFleetFormationType,
    target_fleet: SingleFleet,
    rand: Rand,
): FleetUnit {
    const first_target_unit = select_random_target(target_units, rand);

    const post_vanguard_target_unit = calc_vanguard_target(
        first_target_unit,
        target_units,
        formation,
        target_fleet.main_fleet_units.length,
        first_target_unit.original_index,
        rand,
    )

    return protect_flagship_in_single_fleet(
        post_vanguard_target_unit,
        target_units,
        SINGLE_FLEET_FORMATION_PROTECT_RATIO_DATA[formation],
        rand
    );
}

/**
 * 通常艦隊 vs 連合艦隊 においてターゲットを選出して返す
 * @param target_units 
 * @param formation 
 * @param rand 
 * @returns 
 */
export function choice_target_in_single_vs_combined(
    target_units: FleetUnit[],
    formation: CombinedFleetFormationType,
    rand: Rand,
): FleetUnit {
    const first_target_unit = select_random_target(target_units, rand);

    return protect_flagship_in_single_fleet(
        first_target_unit,
        target_units,
        COMBINED_FLEET_FORMATION_PROTECT_RATIO_DATA[formation],
        rand
    );
}