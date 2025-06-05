import { DeepReadonly } from "@/types";
import { AACITriggerEquipType, SkillTriggerEquipType } from "@/types/equip";
import { ShipType } from "@/types/ship";
import { EquipType } from "./equips";

export const enum AddStatusType {
    /** 昼砲戦火力 */
    SHELL_POWER = 1,
    /** 夜戦火力 */
    NIGHT_BATTLE_POWER = 2,
    /** 昼砲戦命中 */
    SHELL_ACCURACY = 3,
    /** 雷装 */
    TORPEDO_POWER = 4,
    /** 雷撃命中 */
    TORPEDO_ACCURACY = 5,
    /** 雷撃回避 */
    TORPEDO_EVASION = 6,
    /** 夜戦命中 */
    NIGHT_BATTLE_ACCURACY = 7,
    /** 対潜 */
    ASW_POWER = 8,
    /** 対潜命中 */
    ASW_ACCURACY = 9,
    /** 艦隊防空 */
    FLEET_ANTI_AIR = 10,
    /** 加重対空 */
    SELF_ANTI_AIR = 11,
    /** 制空力 */
    AIR_SUPERIORITY = 12,
    /** 索敵 */
    LOS = 13,
}

export type ImplovementData = Partial<Record<AddStatusType, {
    /** 係数 */
    coeffient: number,
    /** 平方根処理を行うか */
    is_sqrt: boolean,
}>>

/**
 * 装備種別ごとの諸元
 */
export type EquipTypeData = {
    label: string,
    icon: number,
    b_type?: SkillTriggerEquipType,
    a_type?: AACITriggerEquipType,
    /**
     * 改修による上昇値の計算に必要なデータ    
     * 参考: https://akashi-list.me/
     */
    implovement: ImplovementData,
    can_equip_ship_types: ShipType[],
    can_equip_ship_ids?: number[],
    can_not_equip_ship_ids?: number[],
    can_asw_damage?: true,
    can_equip_land_base?: true,
    is_plane?: true,
    is_fighter?: true,
    is_torpedo_bomber?: true,
    can_contact?: true,
    can_detect?: true,
    is_dive_bomber?: true,
    is_asw_plane?: true,
    can_support_asw?: true,
}

export type EquipTypeDatas = DeepReadonly<Record<EquipType, EquipTypeData>>;

export const EQUIP_TYPE_DATAS: EquipTypeDatas = {
    [EquipType.MAINGUNS]: {
        label: 'Main Gun (S)',
        icon: 1,
        b_type: SkillTriggerEquipType.B_MAINGUN,
        a_type: AACITriggerEquipType.A_GUN,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.AS, ShipType.AV, ShipType.AO, ShipType.AR, ShipType.LHA, ShipType.DE],
        can_equip_ship_ids: [541],
        can_not_equip_ship_ids: [507, 645, 650, 717, 900, 943],
    },
    [EquipType.MAINGUNSAA]: {
        label: 'Main Gun (S)',
        icon: 16,
        b_type: SkillTriggerEquipType.B_MAINGUN,
        a_type: AACITriggerEquipType.A_HAGUN,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
            [AddStatusType.SELF_ANTI_AIR]: {
                coeffient: 0.7,
                is_sqrt: true,
            },
            [AddStatusType.FLEET_ANTI_AIR]: {
                coeffient: 2,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.AS, ShipType.AV, ShipType.AO, ShipType.AR, ShipType.LHA, ShipType.DE],
        can_equip_ship_ids: [541],
        can_not_equip_ship_ids: [507, 645, 650, 717, 900, 943],
    },
    [EquipType.MAINGUNM]: {
        label: 'Main Gun (M)',
        icon: 2,
        b_type: SkillTriggerEquipType.B_MAINGUN,
        a_type: AACITriggerEquipType.A_GUN,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.BB, ShipType.BBV],
        can_equip_ship_ids: [372, 491, 500, 507, 581, 586, 634, 635, 639, 640, 690, 911],
        can_not_equip_ship_ids: [877],
    },
    [EquipType.MAINGUNL]: {
        label: 'Main Gun (L)',
        icon: 3,
        b_type: SkillTriggerEquipType.B_MAINGUN,
        a_type: AACITriggerEquipType.A_GUN,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1.5,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.FBB, ShipType.BB, ShipType.BBV],
    },
    [EquipType.MAINGUNXL]: {
        label: 'Main Gun (L)',
        icon: 3,
        b_type: SkillTriggerEquipType.B_MAINGUN,
        a_type: AACITriggerEquipType.A_GUN,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1.5,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [],
        can_equip_ship_ids: [131, 136, 143, 148, 275, 276, 541, 546, 573, 911, 916],
    },
    [EquipType.SECGUN]: { // (分類A)
        label: 'Secondary Gun',
        icon: 4,
        b_type: SkillTriggerEquipType.B_SECGUN,
        a_type: AACITriggerEquipType.A_GUN,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.AS, ShipType.AV, ShipType.AR, ShipType.LHA],
        can_equip_ship_ids: [352, 460, 500, 699, 717],
        can_not_equip_ship_ids: [477, 478, 622, 623, 624, 945],
    },
    [EquipType.SECGUNAA]: { // (分類B)
        label: 'Secondary Gun',
        icon: 16,
        b_type: SkillTriggerEquipType.B_SECGUN,
        a_type: AACITriggerEquipType.A_HAGUN,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1,
                is_sqrt: false,

            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: false,
            },
            [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: false,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: false,
            },
            [AddStatusType.FLEET_ANTI_AIR]: {
                coeffient: 2,
                is_sqrt: false,
            },
            [AddStatusType.SELF_ANTI_AIR]: {
                coeffient: 1,
                is_sqrt: false,
            },
        },
        can_equip_ship_types: [ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.AS, ShipType.AV, ShipType.AR, ShipType.LHA],
        can_equip_ship_ids: [352, 460, 500, 699, 717],
        can_not_equip_ship_ids: [477, 478, 622, 623, 624, 945],
    },
    [EquipType.SECGUNL]: { // (分類C)
        label: 'Secondary Gun',
        icon: 4,
        b_type: SkillTriggerEquipType.B_SECGUN,
        a_type: AACITriggerEquipType.A_GUN,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1,
                is_sqrt: false,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: false,
            },
            [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
       },
        can_equip_ship_types: [ShipType.CA, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CV, ShipType.CVB],
    },
    [EquipType.APSHELL]: {
        label: 'AP Shell',
        icon: 13,
        b_type: SkillTriggerEquipType.B_APSHELL,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            }, [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.FBB, ShipType.BB, ShipType.BBV],
        can_not_equip_ship_ids: [877],
    },
    [EquipType.TORPEDO]: {
        label: 'Torpedo',
        icon: 5,
        b_type: SkillTriggerEquipType.B_TORPEDO,
        implovement: {
            [AddStatusType.TORPEDO_POWER]: {
                coeffient: 1.2,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.TORPEDO_ACCURACY]: {
                coeffient: 2,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.SS, ShipType.SSV],
        can_equip_ship_ids: [178, 507, 591, 592, 593, 877, 879, 954],
        can_not_equip_ship_ids: [657],
    },
    [EquipType.TORPEDOSS]: {
        label: 'Torpedo',
        icon: 5,
        b_type: SkillTriggerEquipType.B_TORPEDO,
        implovement: {
            [AddStatusType.TORPEDO_POWER]: {
                coeffient: 1.2,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            }, [AddStatusType.TORPEDO_ACCURACY]: { // ! 明石にはない
                coeffient: 2,
                is_sqrt: true,
            }, [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.SS, ShipType.SSV],
    },
    [EquipType.MIDGETSUB]: {
        label: 'Midget Sub',
        icon: 5,
        implovement: {
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: { // ! 明石にはない
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.CLT, ShipType.SS, ShipType.SSV, ShipType.AV],
        can_equip_ship_ids: [200, 488, 506, 623, 657, 668],
        can_not_equip_ship_ids: [372, 445, 450, 491, 539, 605, 731, 939],
    },
    [EquipType.AAGUN]: {
        label: 'Anti-Air Gun',
        icon: 15,
        a_type: AACITriggerEquipType.A_AAGUN,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.TORPEDO_POWER]: {
                coeffient: 1.2,
                is_sqrt: true,
            },
            [AddStatusType.TORPEDO_ACCURACY]: { // ! 明石にはない
                coeffient: 2,
                is_sqrt: true,
            },
            [AddStatusType.SELF_ANTI_AIR]: {
                coeffient: 2,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.AS, ShipType.AV, ShipType.AO, ShipType.AR, ShipType.LHA, ShipType.DE],
        can_equip_ship_ids: [530, 539, 939, 940],
        can_not_equip_ship_ids: [645, 650],
    },
    [EquipType.AAFD]: {
        label: 'Fire Director',
        icon: 30,
        a_type: AACITriggerEquipType.A_AAFD,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.SHELL_ACCURACY]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.NIGHT_BATTLE_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
            [AddStatusType.FLEET_ANTI_AIR]: {
                coeffient: 2,
                is_sqrt: true,
            },
            [AddStatusType.SELF_ANTI_AIR]: { // ! 明石の対空と異なる そもそも SELF_ANTI_AIR は 明石の 対空 を指すか？
                coeffient: 1,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.AS, ShipType.AV, ShipType.AO, ShipType.AR, ShipType.LHA, ShipType.DE],
        can_not_equip_ship_ids: [621, 645, 650, 727, 877, 945],
    },
    [EquipType.SONARS]: {
        label: 'Sonar',
        icon: 18,
        b_type: SkillTriggerEquipType.B_SONAR,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 0.75,
                is_sqrt: true,
            },
            [AddStatusType.ASW_POWER]: { // ! 明石0.66
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.ASW_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            }, [AddStatusType.TORPEDO_EVASION]: {
                coeffient: 1.5,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.SS, ShipType.SSV, ShipType.DE],
        can_equip_ship_ids: [352, 372, 380, 381, 382, 450, 491, 500, 507, 529, 534, 536, 546, 554, 586, 591, 592, 593, 626, 645, 650, 690, 699, 707, 713, 717, 879, 885, 889, 894, 899, 900, 911, 916, 943, 948, 954],
        can_asw_damage: true,
    },
    [EquipType.SONARL]: {
        label: 'Sonar',
        icon: 18,
        b_type: SkillTriggerEquipType.B_SONAR,
        implovement: {
            [AddStatusType.SHELL_POWER]: {
                coeffient: 0.75, // ! 明石0.66
                is_sqrt: true,
            },
            [AddStatusType.ASW_POWER]: {
                coeffient: 1,
                is_sqrt: true,
            },
            [AddStatusType.ASW_ACCURACY]: {
                coeffient: 1.3,
                is_sqrt: true,
            },
            [AddStatusType.TORPEDO_EVASION]: {
                coeffient: 1.5,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.AS, ShipType.AV, ShipType.LHA],
        can_equip_ship_ids: [330, 346, 357, 500, 537, 538, 624, 629, 650, 662, 663, 668, 717],
        can_not_equip_ship_ids: [380, 381, 382, 521, 522, 526, 534, 581, 727, 877, 884, 943, 945],
        can_asw_damage: true,
    },
    [EquipType.DEPTHCHARGE]: { // ! 明石では爆雷と爆雷投射機で上昇の挙動が異なる
        label: 'Depth Charge',
        icon: 17,
        b_type: SkillTriggerEquipType.B_DEPTHCHARGE,
        implovement: {
            [AddStatusType.SHELL_POWER]: { // ! 明石に無い
                coeffient: 0.75,
                is_sqrt: true,
            },
            [AddStatusType.ASW_POWER]: {
                coeffient: 1, // ! 明石0.66
                is_sqrt: true,
            },
            [AddStatusType.ASW_ACCURACY]: { // ! 明石に無い
                coeffient: 1.3,
                is_sqrt: true,
            },
        },
        can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.AV, ShipType.DE],
        can_equip_ship_ids: [380, 381, 382, 411, 412, 500, 529, 534, 536, 699, 717, 889, 900],
        can_not_equip_ship_ids: [372, 491, 507, 581, 586, 690],
        can_asw_damage: true,
    },
    [EquipType.FIGHTER]: {
        label: 'Fighter',
        icon: 6,
        implovement: {
            [AddStatusType.AIR_SUPERIORITY]: {
                coeffient: 0.2,
                is_sqrt: false,
            },
        },
        can_equip_ship_types: [ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.LHA],
        can_equip_ship_ids: [553, 554, 717],
        can_not_equip_ship_ids: [621, 626, 727, 943, 945],
        can_equip_land_base: true,
        is_plane: true,
        is_fighter: true,
    },
    [EquipType.TORPBOMBER]: {
        label: 'Torpedo Bomber',
        icon: 8,
        implovement: {
            base: { [AddStatusType.SHELL_POWER]: 0.2, [AddStatusType.ASW_POWER]: 0.2 },
            is_sqrt: false,
        },
        can_equip_ship_types: [ShipType.CVL, ShipType.CV, ShipType.CVB],
        can_equip_ship_ids: [352],
        can_not_equip_ship_ids: [521, 899],
        can_equip_land_base: true,
        is_plane: true,
        is_fighter: true,
        is_torpedo_bomber: true,
        can_contact: true,
        is_asw_plane: true,
        can_asw_damage: true,
        can_support_asw: true,
    },
    [EquipType.DIVEBOMBER]: {
        label: 'Dive Bomber',
        icon: 7,
        implovement: {
            base: { [AddStatusType.SHELL_POWER]: 0.2, [AddStatusType.ASW_POWER]: 0.2 },
            is_sqrt: false,
        },
        can_equip_ship_types: [ShipType.CVL, ShipType.CV, ShipType.CVB],
        can_equip_ship_ids: [553, 554, 717, 948],
        can_equip_land_base: true,
        is_plane: true,
        is_fighter: true,
        is_dive_bomber: true,
        is_asw_plane: true,
        can_asw_damage: true,
        can_support_asw: true,
    },
    [EquipType.FIGHTERBOMBER]: {
        label: 'Dive Bomber',
        icon: 7,
        implovement: {
            base: { [AddStatusType.AIR_SUPERIORITY]: 0.25 },
            is_sqrt: false,
        },
        can_equip_ship_types: [ShipType.CVL, ShipType.CV, ShipType.CVB],
        can_equip_ship_ids: [553, 554, 717, 948],
        can_equip_land_base: true,
        is_plane: true,
        is_fighter: true,
        is_dive_bomber: true,
        is_asw_plane: true,
        can_asw_damage: true,
        can_support_asw: true,
    },
    [EquipType.SEAPLANE]: {
        label: 'Recon Seaplane',
        icon: 10,
        b_type: SkillTriggerEquipType.B_RECON,
        implovement: {
            base: { los: 1.2 },
            is_sqrt: true,
        },
        can_equip_ship_types: [ShipType.CL, ShipType.CT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.SSV, ShipType.AS, ShipType.AV, ShipType.AO],
        can_equip_ship_ids: [621, 626],
        can_not_equip_ship_ids: [477, 478, 622, 623, 624, 645, 650, 657, 699, 717, 900],
        can_equip_land_base: true,
        is_plane: true,
        can_contact: true,
        can_detect: true,
        can_support_asw: true,
    },
    [EquipType.SEAPLANEBOMBER]: {
        label: 'Seaplane Bomber',
        icon: 10,
        b_type: SkillTriggerEquipType.B_RECON,
        implovement: { los: 1.15 },
        can_equip_ship_types: [ShipType.CAV, ShipType.BBV, ShipType.SSV, ShipType.AV, ShipType.AO],
        can_equip_ship_ids: [305, 306, 307, 314, 358, 361, 392, 446, 447, 488, 496, 547, 574, 579, 591, 593, 626, 630, 639, 640, 652, 662, 663, 668, 724, 879, 911, 954],
        can_not_equip_ship_ids: [645, 650, 699, 717, 900],
        can_equip_land_base: true,
        is_plane: true,
        is_fighter: true,
        is_dive_bomber: true,
        can_detect: true,
        is_asw_plane: true,
        can_asw_damage: true,
        can_support_asw: true,
    }
};

EQUIP_TYPE_DATAS[] = {

};
EQUIP_TYPE_DATAS[CARRIERSCOUT] = {
    label: 'Scout Plane',
    icon: 9,
    can_equip_ship_types: [ShipType.CVL, ShipType.CV, ShipType.CVB],
    can_equip_ship_ids: [553, 554],
    can_not_equip_ship_ids: [380, 381, 382, 521, 522, 526, 534, 884],
    can_equip_land_base: true,
    is_plane: true,
    can_contact: true,
    can_detect: true,
};
EQUIP_TYPE_DATAS[CARRIERSCOUT2] = {
    label: 'Scout Plane',
    icon: 9,
    implovement: { los: 1.2 },
    can_equip_ship_types: [ShipType.CVB],
    can_equip_land_base: true,
    is_plane: true,
    can_contact: true,
    can_detect: true,
};
EQUIP_TYPE_DATAS[AUTOGYRO] = {
    label: 'Anti-Sub Plane',
    icon: 21,
    can_equip_ship_types: [ShipType.CAV, ShipType.BBV, ShipType.CVL, ShipType.AS, ShipType.AO, ShipType.AR, ShipType.LHA],
    can_equip_ship_ids: [372, 477, 478, 491, 546, 547, 573, 574, 586, 630, 646, 652, 662, 663, 668, 690, 713, 885, 911, 920],
    can_not_equip_ship_ids: [380, 381, 382, 521, 522, 526, 534, 621, 645, 699, 727, 884, 889, 900, 943, 945],
    can_equip_land_base: true,
    is_plane: true,
    is_fighter: true,
    is_dive_bomber: true,
    is_asw_plane: true,
    can_asw_damage: true,
    can_support_asw: true,
};
EQUIP_TYPE_DATAS[ASWPLANE] = {
    label: 'Anti-Sub Plane',
    icon: 22,
    can_equip_ship_types: [ShipType.CVL, ShipType.LHA],
    can_equip_ship_ids: [553, 554, 646, 717, 900],
    can_not_equip_ship_ids: [521, 522, 526, 534, 621, 626, 727, 884, 894, 945],
    can_equip_land_base: true,
    is_plane: true,
    is_fighter: true,
    is_dive_bomber: true,
    is_asw_plane: true,
    can_asw_damage: true,
    can_support_asw: true,
};
EQUIP_TYPE_DATAS[RADARS] = {
    label: 'Radar (S)',
    icon: 11,
    b_type: SkillTriggerEquipType.B_RADAR,
    implovement: { [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3, los: 1.25 },
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.AS, ShipType.AV, ShipType.AO, ShipType.AR, ShipType.LHA, ShipType.DE],
    can_not_equip_ship_ids: [945],
};
EQUIP_TYPE_DATAS[RADARL] = {
    label: 'Radar (L)',
    icon: 11,
    b_type: SkillTriggerEquipType.B_RADAR,
    implovement: { [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3, los: 1.4 },
    can_equip_ship_types: [ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.AV],
    can_equip_ship_ids: [179, 180, 330, 346, 352, 357, 419, 421, 422, 423, 470, 532, 533, 537, 538, 626, 645, 650, 699, 717, 948],
    can_not_equip_ship_ids: [477, 478, 521, 522, 574, 623, 624, 877],
};
EQUIP_TYPE_DATAS[RADARXL] = {
    label: 'Radar (L)',
    icon: 11,
    b_type: SkillTriggerEquipType.B_RADAR,
    implovement: { [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3, los: 1.4 },
    can_equip_ship_types: [ShipType.FBB, ShipType.BB, ShipType.BBV],
    can_not_equip_ship_ids: [877],
};
EQUIP_TYPE_DATAS[ENGINE] = {
    label: 'Engine',
    icon: 19,
    implovement: { EVshell: 1.5 },
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.SS, ShipType.SSV, ShipType.AS, ShipType.AV, ShipType.AO, ShipType.AR, ShipType.LHA],
    can_not_equip_ship_ids: [],
};
EQUIP_TYPE_DATAS[TYPE3SHELL] = {
    label: 'Anti-Air Shell',
    icon: 12,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    a_type: AACITriggerEquipType.A_TYPE3SHELL,
    can_equip_ship_types: [ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV],
    can_not_equip_ship_ids: [877],
    can_equip_ship_ids: [507],
};
EQUIP_TYPE_DATAS[BULGEM] = {
    label: 'Torpedo Bulge',
    icon: 23,
    can_equip_ship_types: [ShipType.CT, ShipType.CA, ShipType.CAV, ShipType.CVL, ShipType.AS, ShipType.AV, ShipType.AR],
    can_equip_ship_ids: [146, 147, 179, 180, 216, 217, 305, 306, 307, 314, 330, 346, 357, 500, 537, 538, 542, 543, 547, 556, 559, 563, 564, 566, 567, 568, 569, 578, 579, 621, 622, 623, 624, 626, 629, 630, 645, 649, 650, 652, 656, 657, 662, 663, 668, 670, 699, 717, 727, 900, 915, 943, 948, 951, 955, 960, 961],
};
EQUIP_TYPE_DATAS[BULGEL] = {
    label: 'Torpedo Bulge',
    icon: 23,
    can_equip_ship_types: [ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CV, ShipType.CVB],
    can_equip_ship_ids: [650],
};
EQUIP_TYPE_DATAS[LANDINGCRAFT] = {
    label: 'Misc',
    icon: 20,
    b_type: SkillTriggerEquipType.B_LC1,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    can_equip_ship_types: [ShipType.AV, ShipType.LHA],
    can_equip_ship_ids: [147, 198, 199, 200, 260, 352, 382, 418, 419, 434, 435, 464, 468, 469, 470, 478, 487, 488, 489, 490, 498, 500, 506, 541, 547, 548, 559, 563, 587, 623, 630, 645, 647, 650, 657, 666, 667, 699, 703, 707, 716, 718, 720, 725, 889, 899, 908, 915, 916, 951, 959, 960, 975],
    can_not_equip_ship_ids: [445, 491, 727, 945],
};
EQUIP_TYPE_DATAS[SEARCHLIGHTS] = {
    label: 'Night Equip',
    icon: 24,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.AV],
    can_equip_ship_ids: [343, 356, 500, 626, 639, 640, 645, 650, 699, 727, 948],
};
EQUIP_TYPE_DATAS[SEARCHLIGHTL] = {
    label: 'Night Equip',
    icon: 24,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    can_equip_ship_types: [ShipType.FBB, ShipType.BB, ShipType.BBV],
    can_equip_ship_ids: [372, 477, 491, 496, 501, 502, 506, 507, 579, 586, 626, 630, 645],
};
EQUIP_TYPE_DATAS[STARSHELL] = {
    label: 'Night Equip',
    icon: 27,
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.AS, ShipType.AV, ShipType.AR],
    can_equip_ship_ids: [500, 699, 727],
};
EQUIP_TYPE_DATAS[PICKET] = {
    label: 'Night Equip',
    icon: 32,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.AS, ShipType.AV, ShipType.DE],
    can_equip_ship_ids: [381, 500, 529, 536, 621, 626, 699, 889, 894, 899],
};
EQUIP_TYPE_DATAS[WG42] = {
    label: 'Misc',
    icon: 31,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CAV, ShipType.BBV, ShipType.SS, ShipType.SSV, ShipType.AS, ShipType.AV, ShipType.LHA],
    can_equip_ship_ids: [500, 573, 591, 592, 593, 699, 877, 878, 879, 954],
    can_not_equip_ship_ids: [445, 553, 554, 943, 948],
};
EQUIP_TYPE_DATAS[SRF] = {
    label: 'Misc',
    icon: 26,
    can_equip_ship_types: [ShipType.AR],
    can_equip_ship_ids: [450],
};
EQUIP_TYPE_DATAS[FCF] = {
    label: 'Misc',
    icon: 28,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    can_equip_ship_types: [ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.AS, ShipType.AV, ShipType.LHA],
    can_equip_ship_ids: [330, 346, 357, 419, 421, 422, 423, 464, 497, 498, 500, 532, 533, 537, 538, 542, 543, 567, 587, 628, 629, 645, 649, 650, 651, 656, 667, 699, 720, 915, 961, 975],
    can_not_equip_ship_ids: [521, 522, 727, 877, 943, 945, 948],
};
EQUIP_TYPE_DATAS[DRUM] = {
    label: 'Misc',
    icon: 25,
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CAV, ShipType.AV, ShipType.AO, ShipType.LHA],
    can_equip_ship_ids: [530, 539, 605, 707, 731, 899, 939, 940],
    can_not_equip_ship_ids: [717, 900, 943, 948],
};
EQUIP_TYPE_DATAS[SCAMP] = {
    label: 'Misc',
    icon: 29,
    can_equip_ship_types: [ShipType.CAV, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.AO],
    can_equip_ship_ids: [166, 372, 450, 488, 491, 496, 507, 547, 574, 579, 581, 586, 626, 630, 652, 662, 663, 668, 690, 879, 943, 948],
    can_not_equip_ship_ids: [645, 699],
};
EQUIP_TYPE_DATAS[FLYINGBOAT] = {
    label: 'Recon Seaplane',
    icon: 33,
    implovement: { los: 1.2 },
    can_equip_ship_types: [],
    can_equip_ship_ids: [445, 450, 500, 586, 690],
    can_equip_land_base: true,
    is_plane: true,
    can_contact: true,
    can_detect: true,
    is_asw_plane: true,
    can_support_asw: true,
};
EQUIP_TYPE_DATAS[REPAIR] = {
    label: 'Misc',
    icon: 14,
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.SS, ShipType.SSV, ShipType.AS, ShipType.AV, ShipType.AO, ShipType.AR, ShipType.LHA, ShipType.DE],
};
EQUIP_TYPE_DATAS[RATION] = {
    label: 'Misc',
    icon: 34,
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.SS, ShipType.SSV, ShipType.AS, ShipType.AV, ShipType.AO, ShipType.AR, ShipType.LHA, ShipType.DE],
};
EQUIP_TYPE_DATAS[SEAPLANEFIGHTER] = {
    label: 'Seaplane Fighter',
    icon: 43,
    can_equip_ship_types: [ShipType.CAV, ShipType.BBV, ShipType.SSV, ShipType.AS, ShipType.AV, ShipType.AO],
    can_equip_ship_ids: [136, 148, 275, 276, 358, 361, 446, 447, 488, 496, 541, 546, 547, 573, 592, 593, 621, 626, 652, 668, 879, 911],
    can_not_equip_ship_ids: [645, 650, 699, 717, 900],
    can_equip_land_base: true,
    is_plane: true,
    is_fighter: true,
    can_support_asw: true,
};
EQUIP_TYPE_DATAS[LANDINGTANK] = {
    label: 'Misc',
    icon: 36,
    b_type: SkillTriggerEquipType.B_LC3,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    can_equip_ship_types: [ShipType.SS, ShipType.SSV, ShipType.AV, ShipType.LHA],
    can_equip_ship_ids: [147, 198, 199, 200, 352, 418, 464, 468, 470, 478, 487, 488, 489, 490, 497, 500, 506, 541, 547, 548, 556, 564, 568, 569, 573, 578, 587, 588, 623, 647, 656, 657, 662, 663, 666, 667, 668, 670, 899, 908, 915, 916, 954, 960, 961],
    can_not_equip_ship_ids: [445, 491, 581, 943],
};
EQUIP_TYPE_DATAS[OILDRUM] = {
    label: 'Misc',
    icon: 35,
    can_equip_ship_types: [ShipType.AO],
    can_equip_ship_ids: [943, 948],
};
EQUIP_TYPE_DATAS[LANDBOMBER] = {
    label: 'Misc',
    icon: 37,
    can_equip_ship_types: [],
    can_equip_land_base: true,
    is_plane: true,
    is_dive_bomber: true,
    is_torpedo_bomber: true,
    isLB: true,
};
EQUIP_TYPE_DATAS[INTERCEPTOR] = {
    label: 'Misc',
    icon: 38,
    can_equip_ship_types: [],
    can_equip_land_base: true,
    is_plane: true,
    isLB: true,
};
EQUIP_TYPE_DATAS[LANDSCOUT] = {
    label: 'Misc',
    icon: 9,
    can_equip_ship_types: [],
    can_equip_land_base: true,
    is_plane: true,
    can_contact: true,
};
EQUIP_TYPE_DATAS[TRANSPORTITEM] = {
    label: 'Transportation Material',
    icon: 41,
    can_equip_ship_types: [ShipType.CAV, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.SSV, ShipType.AV, ShipType.AR, ShipType.LHA],
    can_equip_ship_ids: [500, 530, 539, 605, 645, 650, 699, 717, 731, 900, 939, 940],
    can_not_equip_ship_ids: [502, 507, 621, 626, 916],
};
EQUIP_TYPE_DATAS[SUBRADAR] = {
    label: 'Submarine Equipment',
    icon: 42,
    can_equip_ship_types: [ShipType.SS, ShipType.SSV],
};
EQUIP_TYPE_DATAS[LANDBOMBERL] = {
    label: 'Misc',
    icon: 49,
    can_equip_ship_types: [],
    can_equip_land_base: true,
    is_plane: true,
    is_dive_bomber: true,
    is_torpedo_bomber: true,
    isLB: true,
};
EQUIP_TYPE_DATAS[JETBOMBER] = {
    label: 'Jet Fighter-Bomber',
    icon: 39,
    can_equip_ship_types: [],
    can_equip_ship_ids: [466, 467, 646, 713],
    can_equip_land_base: true,
    is_plane: true,
    is_fighter: true,
    is_dive_bomber: true,
    isjet: true,
};
EQUIP_TYPE_DATAS[ARMYUNIT] = {
    label: 'Army Unit',
    icon: 52,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    can_equip_ship_types: [],
    can_equip_ship_ids: [727, 945],
};
EQUIP_TYPE_DATAS[SMOKESCREEN] = {
    label: 'Smoke Generator',
    icon: 54,
    implovement: { [AddStatusType.SHELL_POWER]: 1, [AddStatusType.NIGHT_BATTLE_POWER]: 1, [AddStatusType.SHELL_ACCURACY]: 1, [AddStatusType.NIGHT_BATTLE_ACCURACY]: 1.3 },
    can_equip_ship_types: [ShipType.DE, ShipType.DD, ShipType.CL, ShipType.CLT, ShipType.CA, ShipType.CT],
    can_equip_ship_ids: [411, 412, 507, 645, 650, 699],
};
EQUIP_TYPE_DATAS[OTHER] = {
    label: 'Misc',
    icon: 14,
    can_equip_ship_types: [ShipType.DD, ShipType.CL, ShipType.CT, ShipType.CLT, ShipType.CA, ShipType.CAV, ShipType.FBB, ShipType.BB, ShipType.BBV, ShipType.CVL, ShipType.CV, ShipType.CVB, ShipType.SS, ShipType.SSV, ShipType.AS, ShipType.AV, ShipType.AO, ShipType.AR, ShipType.LHA, ShipType.DE],
};