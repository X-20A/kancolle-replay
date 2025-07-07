import { Rand } from "@/effects/random";
import { is_player_equip } from "@/models/equip/basic";
import { concat_fleet_ships, PlayerFleet } from "@/models/fleet/Fleet";
import { EquippedShip } from "@/models/ship/equipped";
import { Maf } from "@/utils/Maf";

const SMOKE_SCREEN_TYPE = {
    Misfire: 1,
    Single: 2,
    Twofold: 3,
    Threefold: 4,
} as const

export type SmokeScreenType = keyof typeof SMOKE_SCREEN_TYPE

export type SmokeScreenValues = {
    [key in SmokeScreenType]: number
}

type SmokeCalcPremise = {
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
const calc_premise = (
    ships: EquippedShip[],
): SmokeCalcPremise => {
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
export function calc_smoke_screen_activate_rate(player_fleet: PlayerFleet): SmokeScreenValues {
    const fleet_units = concat_fleet_ships(player_fleet);
    const {
        substantial_smoke_count,
        total_base_stars,
        total_kai_stars,
        flagship_luck,
    } = calc_premise(fleet_units);

    const rates: SmokeScreenValues = { Misfire: 0, Single: 0, Twofold: 0, Threefold: 0 };

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
    rates: SmokeScreenValues,
    rand: Rand,
): SmokeScreenType {
    const rand_value = rand.next() * 100; // 0～100

    // 確率の累積値を計算
    const misfire = rates.Misfire;
    const single = misfire + rates.Single;
    const twofold = single + rates.Twofold;


    // 低い効果から順に判定
    if (rand_value < misfire) return 'Misfire';
    if (rand_value < single)  return 'Single';
    if (rand_value < twofold) return 'Twofold';
    return 'Threefold';
}