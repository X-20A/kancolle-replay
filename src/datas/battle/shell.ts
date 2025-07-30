import { CombinedFleetType, FleetType } from "@/models/fleet/Fleet"
import { AffiliationFleetType } from "@/models/fleet/FleetUnit";
import { is_combined_fleet_type } from "@/models/fleet/predicates";
import { EquippedShip, is_player_equipped_ship } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";

/// 使うか未定

type ShellData = {
    player_power: number;
    abyssal_power: number;
    player_accuracy: number;
    abyssal_accuracy: number;
};

type AffiliationKey = 'main' | 'escort';

type DefenderFleetKey = 'single' | 'combined';

type SingleFleetType = {
    single: {
        main: ShellData;
    };
    combined: {
        main: ShellData;
        escort: ShellData;
    };
};

type CombinedFleetTypeData = {
    single: {
        main: ShellData;
        escort: ShellData;
    };
    combined: {
        main: ShellData;
        escort: ShellData;
    };
};

type ShellBaseDatas = {
    Single: SingleFleetType;
} & {
    [key in CombinedFleetType]: CombinedFleetTypeData;
};

/**
 * 昼砲撃における命中、火力定数データ    
 * ENwikiでは火力は定数と連合艦隊補正(Mod_CF)に分かれているが、命中では区別が無い    
 * シミュではどちらも定数にまとめる
 */
const SHELL_BASE_DATAS: ShellBaseDatas = {
    // 攻撃側艦隊種別
    Single: {
        // 防御側艦隊種別
        single: {
            // 防御側所属艦隊
            main: { player_power: 5, abyssal_power: 5, player_accuracy: 90, abyssal_accuracy: 90 },
        },
        combined: {
            main: { player_power: 5, abyssal_power: 10, player_accuracy: 80, abyssal_accuracy: 88 },
            escort: { player_power: 5, abyssal_power: -5, player_accuracy: 80, abyssal_accuracy: 75 },
        },
    },
    Carrier_Task_Force: {
        single: {
            main: { player_power: 2, abyssal_power: 10, player_accuracy: 78, abyssal_accuracy: 88 },
            escort: { player_power: 10, abyssal_power: 5, player_accuracy: 45, abyssal_accuracy: 65 },
        },
        combined: {
            main: { player_power: 2, abyssal_power: 10, player_accuracy: 78, abyssal_accuracy: 88 },
            escort: { player_power: -5, abyssal_power: -5, player_accuracy: 67, abyssal_accuracy: 75 },
        },
    },
    Surface_Task_Force: {
        single: {
            main: { player_power: 10, abyssal_power: 5, player_accuracy: 45, abyssal_accuracy: 65 },
            escort: { player_power: -5, abyssal_power: -5, player_accuracy: 67, abyssal_accuracy: 75 },
        },
        combined: {
            main: { player_power: 2, abyssal_power: 10, player_accuracy: 78, abyssal_accuracy: 88 },
            escort: { player_power: -5, abyssal_power: -5, player_accuracy: 67, abyssal_accuracy: 75 },
        },
    },
    Transport_Escort_Force: {
        single: {
            main: { player_power: -5, abyssal_power: 10, player_accuracy: 54, abyssal_accuracy: 88 },
            escort: { player_power: 10, abyssal_power: 5, player_accuracy: 45, abyssal_accuracy: 65 },
        },
        combined: {
            main: { player_power: -5, abyssal_power: 10, player_accuracy: 54, abyssal_accuracy: 88 },
            escort: { player_power: -5, abyssal_power: -5, player_accuracy: 67, abyssal_accuracy: 75 },
        },
    },
} as const;

type AttackerFleetKey = keyof ShellBaseDatas;

/**
 * 昼砲撃戦の基本データを返す
 */
const get_base_data = (
    attacker_fleet_type: FleetType,
    defender_fleet_type: FleetType,
    defender_affiliation_type: AffiliationFleetType,
): ShellData => {
    const attacker_fleet_key: AttackerFleetKey = is_combined_fleet_type(attacker_fleet_type)
        ? attacker_fleet_type
        : 'Single';

    const defender_fleet_key: DefenderFleetKey = is_combined_fleet_type(defender_fleet_type)
        ? 'combined'
        : 'single';

    const affiliation_key: AffiliationKey = defender_affiliation_type === 'escort'
        ? 'escort'
        : 'main';

    if (attacker_fleet_key === 'Single') {
        return defender_fleet_key === 'single' || affiliation_key === 'main'
            ? SHELL_BASE_DATAS[attacker_fleet_key][defender_fleet_key].main
            : SHELL_BASE_DATAS[attacker_fleet_key][defender_fleet_key].escort;
    }

    return SHELL_BASE_DATAS[attacker_fleet_key][defender_fleet_key][affiliation_key];
}

export type ShellAttackPowerBase = Brand<number, 'ShellAttackPowerBase'>

/**
 * 昼砲撃戦の火力定数を取得する関数。
 */
export function get_shell_base(
    attacker_fleet_type: FleetType,
    defender_fleet_type: FleetType,
    attacker_ship: EquippedShip,
    defender_affiliation_type: AffiliationFleetType,
): ShellAttackPowerBase {
    const data = get_base_data(attacker_fleet_type, defender_fleet_type, defender_affiliation_type);
    return is_player_equipped_ship(attacker_ship)
        ? data.player_power as ShellAttackPowerBase
        : data.abyssal_power as ShellAttackPowerBase;
}

export type ShellAccuracyBase = Brand<number, 'ShellAccuracyBase'>

/**
 * 昼砲撃戦の命中定数を取得する関数。
 */
export function get_accuracy_base(
    attacker_fleet_type: FleetType,
    defender_fleet_type: FleetType,
    attacker_ship: EquippedShip,
    defender_affiliation_type: AffiliationFleetType,
): ShellAccuracyBase {
    const data = get_base_data(attacker_fleet_type, defender_fleet_type, defender_affiliation_type);
    return is_player_equipped_ship(attacker_ship)
        ? data.player_accuracy as ShellAccuracyBase
        : data.abyssal_accuracy as ShellAccuracyBase;
}