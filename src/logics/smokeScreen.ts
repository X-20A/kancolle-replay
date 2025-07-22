import { is_player_equip } from "@/models/equip/basic";
import { concat_fleet_ships, PlayerFleet } from "@/models/fleet/Fleet";
import { EquippedShip, is_player_ship } from "@/models/ship/equipped";
import { Brand } from "@/types/brands";
import { RandValue } from "@/types/brands/other";
import { Maf } from "@/utils/Maf";

const SMOKE_SCREEN_TYPE = {
    Single: 1,
    Twofold: 2,
    Threefold: 3,
} as const

export type SmokeScreenType = keyof typeof SMOKE_SCREEN_TYPE

export type SmokeScreenRates = {
    [key in (SmokeScreenType | 'Misfire')]: number
}

type PreInfo = {
    /** 処理上の煙幕装置数 */
    substantial_smoke_count: number;
    /** 煙幕装置の改修値合計 */
    total_base_stars: number;
    /** 煙幕装置改の改修値合計 */
    total_kai_stars: number;
    /** 旗艦運 */
    flagship_luck: number;
};

/**
 * 煙幕発動率計算に必要な諸元を用意
 * @param ships 
 * @returns 
 */
const calc_pre_info = (
    ships: EquippedShip[],
): PreInfo => {
    const SMOKE_GENERATOR_ID = 500;
    const SMOKE_GENERATOR_KAI_ID = 501;

    return ships.reduce((total, ship) => {
        ship.equip_slots.forEach((equip_built) => {
            const equip = equip_built.equip;
            if (!equip || !is_player_equip(equip)) return total;

            if (equip.master_id === SMOKE_GENERATOR_ID) {
                total.substantial_smoke_count += 1;
                total.total_base_stars += equip.improvement_lv;
            } else if (equip.master_id === SMOKE_GENERATOR_KAI_ID) {
                total.substantial_smoke_count += 2;
                total.total_kai_stars += equip.improvement_lv;
            }
        });

        return total;
    }, {
        substantial_smoke_count: 0,
        total_smoke_count: 0,
        total_base_stars: 0,
        total_kai_stars: 0,
        flagship_luck: ships[0].edited_status.luck,
    });
}

/**
 * 煙幕の各タイプ発動率を返す
 * @param player_fleet 
 * @returns 
 */
export function calc_smoke_screen_activate_rate(
    player_fleet: PlayerFleet,
): SmokeScreenRates {
    const fleet_units = concat_fleet_ships(player_fleet);
    const {
        substantial_smoke_count,
        total_base_stars,
        total_kai_stars,
        flagship_luck,
    } = calc_pre_info(fleet_units);

    const rates: SmokeScreenRates = { Misfire: 0, Single: 0, Twofold: 0, Threefold: 0 };

    // TODO: 0 - 1 でいいのでは？
    if (substantial_smoke_count <= 0) {
        rates.Misfire = 100;
        return rates;
    }

    // 共通係数を事前計算
    const luck_sqrt = Maf.from(flagship_luck).sqrt();
    const stars_factor = 0.3 * total_base_stars + 0.5 * total_kai_stars;

    // 基本発動率計算関数
    const calcActivationRate = (offset: number) => {
        return Maf.from(5 * substantial_smoke_count - offset)
            .add(luck_sqrt.mul(1.5).done)
            .add(stars_factor)
            .ceil()
            .mul(3)
            .add(1)
            .min(100)
            .done;
    };

    // 各発動率計算
    if (substantial_smoke_count >= 3) {
        rates.Threefold = calcActivationRate(15);
        rates.Twofold = Math.min(30, 100 - rates.Threefold);
        rates.Single = Math.max(0, 100 - rates.Threefold - rates.Twofold);
    } else if (substantial_smoke_count === 2) {
        rates.Twofold = calcActivationRate(5);
        rates.Single = 100 - rates.Twofold;
    } else {
        rates.Single = 100;
    }

    // 不発率計算
    const misfireRate = Maf.from(luck_sqrt.done)
        .add(stars_factor)
        .ceil()
        .mul(0.2)
        .sub(3.2)
        .neg()
        .sub(substantial_smoke_count)
        .max(0)
        .min(1)
        .done;

    // 不発率を適用
    const successRate = 1 - misfireRate;
    rates.Single *= successRate;
    rates.Twofold *= successRate;
    rates.Threefold *= successRate;
    rates.Misfire = misfireRate * 100;

    return rates;
}

/**
 * 実際に発動する煙幕のタイプを返す
 * @param rates 
 * @param rand 
 * @returns 
 */
export function calc_triggered_smoke_type(
    rates: SmokeScreenRates,
    rand_value: RandValue,
): SmokeScreenType | 'Misfire' {
    // 確率の累積値を計算
    const misfire = rates.Misfire;
    const single = misfire + rates.Single;
    const twofold = single + rates.Twofold;

    const percentage_rand_value = rand_value * 100;

    if (percentage_rand_value < misfire) return 'Misfire';
    if (percentage_rand_value < single)  return 'Single';
    if (percentage_rand_value < twofold) return 'Twofold';
    return 'Threefold';
}

export type ShellAccuracySmokeMod = Brand<number, 'ShellAccuracySmokeMod'>

/**
 * 攻撃側昼砲撃命中に係る煙幕補正を返す
 * @param attacker_ship 
 * @param smoke_type 
 * @returns 
 */
export function calc_shell_accuracy_smoke_mod(
    attacker_ship: EquippedShip,
    smoke_type: SmokeScreenType | 'Misfire',
): ShellAccuracySmokeMod {
    if (smoke_type === 'Misfire') return 1 as ShellAccuracySmokeMod;

    type SmokeData = Record<SmokeScreenType, number>
    /** 攻撃: プレイヤー, 電探: 有 */
    const PLAYER_WITH_RADAR_ACCURACY_MOD: SmokeData =
        { Single: 0.35, Twofold: 0.25, Threefold: 0.25 } as const;
    /** 攻撃: プレイヤー, 電探: 無 */
    const PLAYER_WITHOUT_RADAR_ACCURACY_MOD: SmokeData =
        { Single: 0.01, Twofold: 0.01, Threefold: 0.01 } as const;
    /** 攻撃: 深海, 電探: 有 */
    const ABYSSAL_WITH_RADAR_ACCURACY_MOD: SmokeData =
        { Single: 0.9, Twofold: 0.83, Threefold: 0.75 } as const;
    /** 攻撃: 深海, 電: 無 */
    const ABYSSAL_WITHOUT_RADAR_ACCURACY_MOD: SmokeData =
        { Single: 0.5, Twofold: 0.5, Threefold: 0.5 } as const;
    

    const has_radar = attacker_ship.equip_slots.some(
        slot => slot.equip?.skill_trigger_type === 'B_RADAR'
    );
    const is_attacker_player = is_player_ship(attacker_ship);

    if (is_attacker_player) {
        return has_radar
            ? PLAYER_WITH_RADAR_ACCURACY_MOD[smoke_type] as ShellAccuracySmokeMod
            : PLAYER_WITHOUT_RADAR_ACCURACY_MOD[smoke_type] as ShellAccuracySmokeMod;
    } else {
        return has_radar
            ? ABYSSAL_WITH_RADAR_ACCURACY_MOD[smoke_type] as ShellAccuracySmokeMod
            : ABYSSAL_WITHOUT_RADAR_ACCURACY_MOD[smoke_type] as ShellAccuracySmokeMod;
    }
}