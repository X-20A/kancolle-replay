import { AvgProficiency } from "@/types/brands/other";
import { is_jet_bomber, is_plane_equip, is_player_plane_equip, JetBomberEquip, PlaneEquip, PlayerPlaneEquip } from "./equip/basic";
import { calc_average_proficiencyfrom_equip_slots, calc_average_proficiencyfrom_equips } from "@/logics/proficiency";
import { AffiliationFleetType, PlayerFleetUnit } from "./fleet/FleetUnit";
import { EquipType } from "@/datas/equip/base/player";
import { Fleet, is_combined_fleet } from "./fleet/Fleet";
import { produce } from "immer";
import { is_equip_exsist } from "./ship/EquipSlot";

type SquadronBase = {
    /** 航空隊機数 */
    readonly slot_count: number,
    /** 航空隊熟練度 */
    readonly proficiency: number,
    
    /** 基地の平均航空機熟練度 */
    readonly avg_proficiency: AvgProficiency,
}

/** 空母航空隊 */
type ShipSquadronBase = SquadronBase & {
    readonly each_fleet: AffiliationFleetType,
    /** 艦 index */
    readonly ship_index: number,
    /** 装備 index */
    readonly slot_index: number,
}

/** 航空隊 */
type LbasSquadronBase = SquadronBase & {
    /** 基地航空隊 index */
    readonly lbas_index: number,
    /** 航空中隊内でのindex */
    readonly squadron_index: number,
}

/**
 * 基地航空隊フェイズにおける基地中隊
 */
export type NormalLbasSquadron = LbasSquadronBase & {
    /**
     * 機体    
     * planeとしたいがEquipSlotと互換が効いたほうが便利
     */
    readonly equip: PlayerPlaneEquip,
}

/**
 * 航空戦フェイズにおける空母航空隊
 */
export type NormalShipSquadron = ShipSquadronBase & {
    /**
     * 機体    
     * planeとしたいがEquipSlotと互換が効いたほうが便利
     */
    readonly equip: PlaneEquip,
}

export type NormalSquadron = NormalLbasSquadron | NormalShipSquadron

/** ジェット基地航空隊 */
export type LbasJetSquadron = LbasSquadronBase & {
    readonly equip: JetBomberEquip,
}
/** ジェット空母航空隊 */
export type ShipJetSquadron = ShipSquadronBase & {
    readonly equip: JetBomberEquip,
}

export type LbasSquadron = NormalLbasSquadron | LbasJetSquadron
export type ShipSquadron = NormalShipSquadron | ShipJetSquadron
/** ジェット航空隊 */
export type JetSquadron = LbasJetSquadron | ShipJetSquadron

export type Squadron = NormalSquadron | JetSquadron

/**
 * 航空中隊が全滅状態であるか判定して返す
 * @param squadron 
 * @returns 
 */
export function is_squadron_destruction(
    squadron: Squadron,
): boolean {
    return squadron.slot_count <= 0;
}

/**
 * 基地航空隊からジェット航空中隊を抽出して返す
 * @param lbases 
 * @returns 
 */
export function extract_jet_squadrons(
    lbases: LBAS[],
): LbasJetSquadron[] {
    return lbases.flatMap(lbas => {
        return lbas.squadrons.flatMap(squadron => {
            if (!is_jet_bomber(squadron.equip)) return [];

            return [squadron] as LbasJetSquadron[];
        });
    });
}

export function derive_specific_type_squadron(
    fleet_units: PlayerFleetUnit[],
    target_types: EquipType[],
): NormalShipSquadron[] {
    return fleet_units.flatMap(unit => {
        const valid_plane_slots = unit.ship.equip_slots.flatMap(slot => {
            const equip = slot.equip;
            if (
                !is_equip_exsist(equip) ||
                !is_plane_equip(equip)
            ) return [];

            if (!target_types.includes(equip.type_id)) return [];

            return [slot];
        });

        if (valid_plane_slots.length === 0) return [];

        const avg_proficiency = calc_average_proficiencyfrom_equip_slots(valid_plane_slots);

        return valid_plane_slots.flatMap(slot => {
            const equip = slot.equip;
            if (!is_equip_exsist(equip) || !is_player_plane_equip(equip)) return [];
            
            return {
                equip: equip,
                each_fleet: unit.affiliation_type,
                ship_index: unit.original_index,
                slot_index: slot.slot_index,
                slot_count: slot.slot_count,
                proficiency: is_player_plane_equip(equip) ? equip.plane_proficiency : 0,
                avg_proficiency,
            };
        })
    })
}

export function derive_normal_ship_squadron(
    fleet_units: PlayerFleetUnit[],
): NormalShipSquadron[] {
    const VALID_TRANSFER_EQUIP_TYPE: EquipType[] = [
        'FIGHTER',
        'DIVE_BOMBER',
        'FIGHTER_BOMBER',
        'TORPEDO_BOMBER',
        'JET_BOMBER',
        'SEAPLANE_FIGHTER',
        'SEAPLANE_BOMBER',
        'ASW_PLANE',
        'AUTOGYRO',
    ];
    return derive_specific_type_squadron(
        fleet_units,
        VALID_TRANSFER_EQUIP_TYPE,
    )
}

export function derive_jet_bomber_squadron(
    fleet_units: PlayerFleetUnit[],
): ShipJetSquadron[] {
    return derive_specific_type_squadron(
        fleet_units,
        ['JET_BOMBER'],
    ) as ShipJetSquadron[];
}

export function calc_returned_origin_fleet<T extends Fleet>(
    squadrons: ShipSquadron[],
    fleet: T,
): T {
    return produce(fleet, draft_fleet => {
        // 主力艦隊の処理
        draft_fleet.main_fleet_units = draft_fleet.main_fleet_units.map(unit => {
            const match_squadron = squadrons.find(squadron =>
                squadron.each_fleet !== 'escort' &&
                squadron.ship_index === unit.original_index
            );

            if (!match_squadron) return unit;

            const equip_slot_index = unit.ship.equip_slots.findIndex(
                slot => slot.equip && slot.slot_index === match_squadron.slot_index
            );

            if (equip_slot_index === -1) {
                throw new Error('抽出元の装備スロットが見つかりませんでした');
            }

            return produce(unit, draftUnit => {
                draftUnit.ship.equip_slots[equip_slot_index].slot_count =
                    match_squadron.slot_count;
            });
        }) as typeof draft_fleet.main_fleet_units;

        if (!is_combined_fleet(draft_fleet)) return;

        draft_fleet.escort_fleet_units = draft_fleet.escort_fleet_units.map(unit => {
            const match_squadron = squadrons.find(squadron =>
                squadron.each_fleet === 'escort' &&
                squadron.ship_index === unit.original_index
            );

            if (!match_squadron) return unit;

            const equipSlotIndex = unit.ship.equip_slots.findIndex(
                slot => slot.equip && slot.slot_index === match_squadron.slot_index
            );

            if (equipSlotIndex === -1) {
                throw new Error('抽出元の装備スロットが見つかりませんでした');
            }

            return produce(unit, draftUnit => {
                draftUnit.ship.equip_slots[equipSlotIndex].slot_count =
                    match_squadron.slot_count;
            });
        }) as typeof draft_fleet.escort_fleet_units;
    });
}

/**
 * 抽出した基地航空隊を所属元に返還した新しいLBAS[]を返す
 * @param squadrons 
 * @param original_lbases 
 * @returns 
 */
export function calc_returned_origin_lbas(
    squadrons: readonly LbasSquadron[],
    original_lbases: readonly LBAS[],
): LBAS[] {
    return original_lbases.map((lbas, lbas_index) => {
        const match_squadrons = squadrons.filter(
            squadron => squadron.lbas_index === lbas_index
        );
        if (match_squadrons.length === 0) return lbas;

        const new_squadrons = lbas.squadrons.map((squadron, squadron_index) => {
            const jet_squadron = match_squadrons.find(jet_squadron =>
                jet_squadron.squadron_index === squadron_index
            );

            if (!jet_squadron) return squadron;

            return {
                ...squadron,
                slot_count: jet_squadron.slot_count,
            };
        });

        return {
            ...lbas,
            squadrons: new_squadrons,
        }
    });
}

/** 基地航空隊 */
export type LBAS = {
    readonly squadrons: NormalLbasSquadron[],
    /** 出撃Node */
    readonly target_node: [number, number],
    readonly hp: number,
    readonly armor: number,
}

/**
 * 基地航空隊の出撃Nodeを更新して返す
 * @param lbas 
 * @param new_nodes 
 * @returns 
 */
export function calc_updated_target_node_LBAS(
    lbas: LBAS,
    new_nodes: [number, number],
): LBAS {
    return {
        ...lbas,
        target_node: new_nodes,
    };
}

export function derive_LBAS(
    param_units: PlayerPlaneEquip[],
    lbas_index: number,
    edit_slot_counts?: readonly number[],
): LBAS {
    const DEFAULT_LBAS_SLOTS: readonly number[] = [18, 18, 18, 18];
    const units = param_units.length >= 5 ? param_units.slice(0, 4) : param_units;

    const slot_counts = edit_slot_counts
        ? [
            ...edit_slot_counts.slice(0, 4),
            ...DEFAULT_LBAS_SLOTS.slice(edit_slot_counts.length) // 空きがあれば埋めて
        ].slice(0, 4)  // 最終的に4要素に制限
        : DEFAULT_LBAS_SLOTS;

    const avg_lbas_proficiency = calc_average_proficiencyfrom_equips(units);

    const squadrons: NormalLbasSquadron[] = units.flatMap((unit, index) => {
        return {
            equip: unit,
            slot_count: slot_counts[index],
            proficiency: unit.plane_proficiency,
            lbas_index: lbas_index,
            squadron_index: index,
            avg_proficiency: avg_lbas_proficiency,
        }
    })
    return {
        squadrons: squadrons,
        target_node: [0,0],
        hp: 200,
        armor: 0,
    }
}