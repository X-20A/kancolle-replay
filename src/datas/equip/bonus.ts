import { EquipType } from "@/datas/equip/base/player";
import { EquipBonusKey } from "@/models/equip/EquipBonus";
import { ShipType } from "@/types/ship/ship";
import { PlayerShipClass } from "@/types/ship/shipClass";

/** 国籍ID */
export const enum Country {
    /** 日本 */
    Japan = 1,
    /** アメリカ */
    USA = 2,
    /** イタリア */
    Italia = 3,
    /** イギリス */
    UK = 4,
    /** ドイツ */
    Germany = 5,
    /** フランス */
    France = 6,
    /** ソ連 */
    USSR = 7,
    /** オーストラリア */
    Australia = 8,
    /** スウェーデン */
    Sweden = 9,
    /** オランダ */
    Netherlands = 10,
}

export type Bonus = {
    addition: Partial<Record<EquipBonusKey, number>>,
    /** 艦ID */
    ship_ids?: number[],
    /** 未改造状態での艦ID */
    ship_base_ids?: number[],
    /** 艦種ID */
    ship_type_ids?: ShipType[],
    /** 艦型ID */
    ship_class_names?: PlayerShipClass[],
    /** 艦の国籍ID */
    ship_country_ids?: Country[],
    /** 重ね掛け上限数 */
    stack_limit?: number,
    /** 必要なシナジー装備のID */
    requires_synergy_equip_id?: number[],
    /** 必要な シナジー装備の数 requires_equip_idを指向 */
    requires_synergy_equip_count?: number,
    /** 必要なシナジー装備の改修値 requires_equip_idを指向 */
    requires_synergy_equip_improvement?: number,
    /** 必要なシナジー装備の種別ID */
    requires_synergy_equip_type_ids?: EquipType[],
    /** 必要改修値 */
    required_improvement?: number,
    /** 水上電探(素索敵5以上)が必要であるか */
    requires_surface_radar?: true,
    /** 対空電探(素対空2以上)が必要であるか */
    requires_air_radar?: true,
    /** 命中8以上の電探が必要であるか */
    requires_high_precision_radar?: true,
}

export type EquipBonusData = {
    ids?: number[],
    types?: EquipType[],
    bonuses: Bonus[],
}

export const EQUIP_BONUS_DATAS: EquipBonusData[] = [
    {
        types: [EquipType.CARRIER_SCOUT],
        bonuses: [
            {
                addition: { los: 1 },
                ship_type_ids: ["CVL", "BBV", "CV", "CVB"],
                stack_limit: 1,
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["CVL", "BBV", "CV", "CVB"],
                stack_limit: 1,
                required_improvement: 4
            },
            {
                addition: { los: 1 },
                ship_type_ids: ["CVL", "BBV", "CV", "CVB"],
                stack_limit: 1,
                required_improvement: 6
            },
            {
                addition: { fire_power: 1, los: 1 },
                ship_type_ids: ["CVL", "BBV", "CV", "CVB"],
                stack_limit: 1,
                required_improvement: 10
            }
        ]
    },
    {
        types: [EquipType.SEAPLANE],
        bonuses: [
            {
                addition: { fire_power: 2, asw: 3, evasion: 1 },
                ship_ids: [662, 663, 668],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.SEAPLANE_BOMBER],
        bonuses: [
            {
                addition: { fire_power: 1, asw: 1, evasion: 1 },
                ship_ids: [662, 663, 668],
                stack_limit: 1
            },

            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.RADAR_S, EquipType.RADAR_L],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [569, 648, 951, 961],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 1 },
                ship_ids: [955, 956, 960, 981, 983],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.AUTOGYRO],
        bonuses: [
            {
                addition: { asw: 4, evasion: 1 },
                ship_ids: [662],
                stack_limit: 1
            },
            {
                addition: { asw: 3, evasion: 1 },
                ship_ids: [663, 668],
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.SEARCHLIGHT_S],
        bonuses: [
            {
                addition: { fire_power: 4, evasion: -1 },
                ship_base_ids: [34, 55, 69, 85, 86],
                stack_limit: 1
            },
            {
                addition: { fire_power: 4, torpedo_power: 8 },
                ship_base_ids: [55],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [132]
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_base_ids: [20]
            },
            {
                addition: { fire_power: 4, torpedo_power: 2 },
                ship_ids: [662, 663, 668],
                stack_limit: 1
            }
        ]
    },
    {
        types: [EquipType.SEARCHLIGHT_L],
        bonuses: [
            {
                addition: { fire_power: 6, evasion: -2 },
                ship_base_ids: [85, 86],
                stack_limit: 1
            },
            {
                addition: { fire_power: 4, evasion: -1 },
                ship_base_ids: [131, 143],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, torpedo_power: 3 },
                ship_ids: [592],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 5 },
                ship_ids: [592],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            },
            {
                addition: { fire_power: 4, torpedo_power: 1 },
                ship_ids: [694],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 7 },
                ship_ids: [694],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [
            3, // 12.7cm連装砲B型改二
            122, // 10cm連装高角砲+高射装置
            533, // 10cm連装高角砲改+高射装置改
            553, // ! 該当装備なし？
        ],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_class_names: ["Akizuki"]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [968]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [981, 983]
            }
        ]
    },
    {
        ids: [533, 553],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [426, 986, 987]
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [426, 986, 987],
                required_improvement: 4
            },
            {
                addition: { evasion: 1 },
                ship_ids: [426, 986, 987],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [426, 986, 987],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [426, 986, 987],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [5], // 15.5cm三連装砲
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Mogami", "Ooyodo"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ooyodo"]
            }
        ]
    },
    {
        ids: [15], // 61cm四連装(酸素)魚雷
        bonuses: [
            {
                addition: { torpedo_power: 2 },
                ship_ids: [566, 567, 568, 648, 651, 656, 670, 915, 951],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 2 },
                ship_ids: [566, 567, 568, 648, 651, 656, 670, 915, 951],
                stack_limit: 2
            },
            {
                addition: { torpedo_power: 5, evasion: 1 },
                ship_base_ids: [642],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [
            18, // 流星
            52, // 流星改
        ],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_ids: [156, 277, 278]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [594, 646, 698]
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [19], // 九六式艦戦
        bonuses: [
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_type_ids: ["CVL"]
            },
            {
                addition: { fire_power: 2, asw: 3 },
                ship_class_names: ["Yawatamaru", "Taiyou"]
            },
            {
                addition: { fire_power: 2, anti_air: 2, asw: 2, evasion: 2 },
                ship_base_ids: [89]
            },
            {
                addition: { fire_power: 1, evasion: 1, asw: 1, anti_air: 1 },
                ship_ids: [894, 899]
            }
        ]
    },
    {
        ids: [24, 57, 111],
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [26, 62, 79, 80, 81, 207, 208],
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_ids: [662],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [501, 506, 663, 668],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [502, 507],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_ids: [501, 502, 506, 507, 663, 668]
            }
        ]
    },
    {
        ids: [30, 410],
        bonuses: [
            {
                addition: { anti_air: 3, evasion: 2, los: 2 },
                ship_ids: [73, 501, 502, 506, 507],
                stack_limit: 1
            },
            {
                addition: { anti_air: 3, evasion: 2, los: 2 },
                ship_class_names: ["Akizuki"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [410],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, armor: 1, evasion: 2 },
                ship_ids: [73, 501, 502, 506, 507],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2, armor: 1, evasion: 2 },
                ship_class_names: ["Akizuki"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [968],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [35],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [149, 591, 592, 694],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [150],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_ids: [151, 593, 954],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [152],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [39, 40, 49, 131],
        bonuses: [
            {
                addition: { anti_air: 2, evasion: 1 },
                ship_ids: [662, 663]
            },
            {
                addition: { anti_air: 3, evasion: 2 },
                ship_ids: [668]
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_class_names: ["Katori"]
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_class_names: ["Katori"],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 3 },
                ship_ids: [979]
            }
        ]
    },
    {
        ids: [39],
        bonuses: [
            {
                addition: { evasion: 1 },
                ship_ids: [979],
                required_improvement: 8
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [979],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 10
            },
            {
                addition: { evasion: 1, anti_air: 1 },
                ship_ids: [986, 987]
            },
            {
                addition: { shell_accuracy: 1, anti_air: 1 },
                ship_ids: [986, 987],
                requires_synergy_equip_id: [533, 553],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [986, 987],
                required_improvement: 7
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [986, 987],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_ids: [986, 987],
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [986, 987],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [40],
        bonuses: [
            {
                addition: { anti_air: 2 },
                ship_ids: [979],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 10
            },
            {
                addition: { evasion: 1, anti_air: 1 },
                ship_ids: [986, 987]
            }
        ]
    },
    {
        ids: [49],
        bonuses: [
            {
                addition: { evasion: 2 },
                ship_ids: [979]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [979],
                required_improvement: 6
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [979],
                required_improvement: 7
            },
            {
                addition: { evasion: 1 },
                ship_ids: [979],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [979],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 10
            },
            {
                addition: { evasion: 1, anti_air: 1 },
                ship_ids: [986, 987]
            }
        ]
    },
    {
        ids: [131],
        bonuses: [
            {
                addition: { anti_air: 2 },
                ship_ids: [979],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [44, 45, 287, 288],
        bonuses: [
            {
                addition: { asw: 3, evasion: 2 },
                ship_class_names: ["Katori"]
            }
        ]
    },
    {
        ids: [46, 47, 132, 149, 438],
        bonuses: [
            {
                addition: { asw: 2, evasion: 3 },
                ship_class_names: ["Katori"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [47, 438],
        bonuses: [
            {
                addition: { fire_power: 1, asw: 3, evasion: 2 },
                ship_base_ids: [43, 425, 471, 473, 457, 122]
            },
            {
                addition: { asw: 2, evasion: 2 },
                ship_base_ids: [16, 36, 414, 167, 170, 527]
            }
        ]
    },
    {
        ids: [50], // 20.3cm(3号)連装砲
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Hurutaka", "Aoba"]
            },
            {
                addition: { fire_power: 1, torpedo_power: 1, evasion: 1 },
                ship_class_names: ["Hurutaka", "Aoba"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: -1, torpedo_power: -1, evasion: -1 },
                ship_class_names: ["Hurutaka", "Aoba"],
                requires_surface_radar: true,
                requires_synergy_equip_id: [90],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_class_names: ["Takao", "Mogami", "Myoukou", "Tone"]
            },
            {
                addition: { fire_power: 3, torpedo_power: 2, evasion: 2 },
                ship_class_names: ["Takao", "Mogami", "Myoukou", "Tone"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Mogami", "Tone"],
                requires_synergy_equip_id: [50],
                requires_synergy_equip_count: 2
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [501, 502, 506, 507]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [501, 506],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_ids: [501, 502, 506, 507],
                requires_synergy_equip_id: [30, 410],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [501, 502, 506, 507],
                requires_synergy_equip_id: [410],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [58], // 61cm五連装(酸素)魚雷
        bonuses: [
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["Shimakaze", "Akizuki"]
            },
            {
                addition: { torpedo_power: 1 },
                ship_type_ids: ["CLT"]
            }
        ]
    },
    {
        ids: [59],
        bonuses: [
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [60, 154, 219, 557, 558],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [75, 92, 102, 103, 116]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [185, 282, 318]
            },
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 2 },
                ship_ids: [883, 888]
            }
        ]
    },
    {
        ids: [61], // 二式艦上偵察機
        bonuses: [
            {
                addition: { fire_power: 3, armor: 1, shell_accuracy: 5, evasion: 2, range: 1 },
                ship_ids: [553],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, armor: 3, shell_accuracy: 5, evasion: 3, range: 1 },
                ship_ids: [554],
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 5, range: 1 },
                ship_ids: [196, 197],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, los: 3 },
                ship_base_ids: [90],
                stack_limit: 1,
                required_improvement: 1
            },
            {
                addition: { fire_power: 2, los: 2 },
                ship_base_ids: [91],
                stack_limit: 1,
                required_improvement: 1
            },
            {
                addition: { fire_power: 1, los: 1 },
                ship_ids: [508, 509, 560],
                stack_limit: 1,
                required_improvement: 1
            },
            {
                addition: { fire_power: 1, los: 1 },
                ship_ids: [197],
                stack_limit: 1,
                required_improvement: 8
            }
        ]
    },
    {
        ids: [63], // 12.7cm連装砲B型改二
        bonuses: [
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu"]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_base_ids: [45]
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [144]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [145, 627, 961]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [242, 244, 497, 498, 975]
            },
            {
                addition: { evasion: 2 },
                ship_ids: [469]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [903, 908]
            }
        ]
    },
    {
        ids: [66, 220],
        bonuses: [
            {
                addition: { anti_air: 2, evasion: 1 },
                ship_ids: [662, 663, 668]
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_ids: [501, 502, 506, 507]
            },
            {
                addition: { anti_air: 1, evasion: 2 },
                ship_ids: [501, 502, 506, 507, 662, 663, 668],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [220],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_ids: [501, 502, 506, 507, 662, 663, 668]
            },
            {
                addition: { anti_air: 3, evasion: 3 },
                ship_ids: [501, 502, 506, 507, 662, 663, 668, 894, 899],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_ids: [894, 899]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [894, 899],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [67], // 53cm艦首(酸素)魚雷
        bonuses: [
            {
                addition: { torpedo_power: -5 }
            },
            {
                addition: { torpedo_power: 5 },
                ship_type_ids: ["SS", "SSV"]
            }
        ]
    },
    {
        ids: [69], // カ号観測機
        bonuses: [
            {
                addition: { fire_power: 1, asw: 2 },
                ship_ids: [554, 646]
            },
            {
                addition: { fire_power: 1, asw: 1 },
                ship_ids: [553]
            }
        ]
    },
    {
        ids: [78], // 12.7cm単装砲
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Z1"]
            },
            {
                addition: { fire_power: 2, torpedo_power: 2, evasion: 2 },
                ship_class_names: ["Z1"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Z1"],
                required_improvement: 7
            },
            {
                addition: { armor: 1 },
                ship_class_names: ["Z1"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [79, 81],
        bonuses: [
            {
                addition: { fire_power: 3 },
                ship_ids: [553, 554]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [82, 88, 411, 412]
            }
        ]
    },
    {
        ids: [82],
        bonuses: [
            {
                addition: { asw: 1, evasion: 1 },
                ship_class_names: ["Taiyou"]
            }
        ]
    },
    {
        ids: [87], // 新型高温高圧缶
        bonuses: [
            {
                addition: { torpedo_power: 1, evasion: 2 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 6
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, torpedo_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [951]
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [951],
                required_improvement: 6
            },
            {
                addition: { evasion: 1 },
                ship_ids: [951],
                required_improvement: 7
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [951],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [951],
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [951],
                required_improvement: 10
            },
            {
                addition: { evasion: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 6
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 9
            },
            {
                addition: { evasion: 1 },
                ship_ids: [50, 181, 229, 316, 961],
                required_improvement: 10
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Yuugumo", "Akizuki", "Matsu"],
                required_improvement: 7
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["Yuugumo", "Akizuki", "Matsu"],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Yuugumo", "Akizuki", "Matsu"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [90], // 20.3cm(2号)連装砲
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_ids: [142]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [295, 416, 417]
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [264]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Hurutaka", "Takao", "Mogami", "Aoba", "Myoukou", "Tone"]
            },
            {
                addition: { anti_air: 5, evasion: 2 },
                ship_base_ids: [61],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, torpedo_power: 2, evasion: 2 },
                ship_class_names: ["Hurutaka", "Aoba"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [501, 502, 506, 507]
            }
        ]
    },
    {
        ids: [93],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_base_ids: [90],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3 },
                ship_base_ids: [91],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [94],
        bonuses: [
            {
                addition: { fire_power: 3 },
                ship_ids: [197],
                stack_limit: 1
            },
            {
                addition: { fire_power: 7 },
                ship_ids: [196],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [99],
        bonuses: [
            {
                addition: { fire_power: 4 },
                ship_base_ids: [90],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [91],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [100],
        bonuses: [
            {
                addition: { fire_power: 6 },
                ship_ids: [197],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [196],
                stack_limit: 1
            },
            {
                addition: { fire_power: 4 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [104],
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_ids: [149, 591]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [150, 152, 592, 694]
            },
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 2 },
                ship_ids: [151, 593, 954]
            }
        ]
    },
    {
        ids: [106, 450],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, armor: 1, evasion: 3 },
                ship_ids: [145, 151, 407, 419, 541, 593, 911, 916, 954, 961, 975]
            },
            {
                addition: { anti_air: 1, armor: 1, evasion: 3 },
                ship_base_ids: [35, 183, 465]
            },
            {
                addition: { anti_air: 2, armor: 1, evasion: 2 },
                ship_base_ids: [20, 49, 139, 167, 170, 425, 532]
            },
            {
                addition: { fire_power: 1, anti_air: 1, armor: 1, evasion: 1 },
                ship_ids: [663, 668],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_ids: [668],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [450], // 13号対空電探改(後期型)
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, armor: 1, evasion: 3 },
                ship_class_names: ["Matsu"]
            },
            {
                addition: { anti_air: 1, armor: 1, evasion: 2 },
                ship_type_ids: ["DE"]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, anti_air: 1, evasion: 2 },
                ship_ids: [955, 956, 960, 981, 983],
                required_improvement: 4,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [115],
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 1, los: 2 },
                ship_class_names: ["Bismarck", "Prinz"]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Bismarck", "Prinz"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [118], // 紫雲
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 2, los: 2 },
                ship_class_names: ["Ooyodo"]
            },
            {
                addition: { fire_power: 2, los: 1 },
                ship_class_names: ["Ooyodo"],
                required_improvement: 10
            },
            {
                addition: { fire_power: 3, evasion: 1, los: 2 },
                ship_ids: [507]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [507],
                required_improvement: 2
            },
            {
                addition: { evasion: 1 },
                ship_ids: [507],
                required_improvement: 5
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [507],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1, torpedo_power: 1, anti_air: 1, los: 1, evasion: 1 },
                ship_ids: [507],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [119], // 14cm連装砲
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Yuubari", "Katori"]
            },
            {
                addition: { fire_power: 2, torpedo_power: 1 },
                ship_class_names: ["Nisshin"]
            }
        ]
    },
    {
        ids: [121],
        bonuses: [
            {
                addition: { anti_air: 4, evasion: 2 },
                ship_class_names: ["Akizuki"],
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_class_names: ["Akizuki"],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [968]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [968],
                requires_air_radar: true
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_ids: [981, 983]
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_ids: [981, 983],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [122],
        bonuses: [
            {
                addition: { fire_power: 5, anti_air: 3, evasion: 2 },
                ship_ids: [656],
                required_improvement: 4
            },
            {
                addition: { fire_power: 4, evasion: 3 },
                ship_ids: [656],
                requires_surface_radar: true,
                stack_limit: 1,
                required_improvement: 4
            },
            {
                addition: { anti_air: 4, evasion: 3 },
                ship_ids: [656],
                requires_air_radar: true,
                stack_limit: 1,
                required_improvement: 4
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 6
            },
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 10
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [426, 981, 983, 986, 987],
                required_improvement: 7
            },
            {
                addition: { evasion: 1 },
                ship_ids: [426, 981, 983, 986, 987],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [426, 981, 983, 986, 987],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [426, 981, 983, 986, 987],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [129], // 熟練見張員
        bonuses: [
            {
                addition: { fire_power: 1, torpedo_power: 2, asw: 2, evasion: 2, los: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu", "Hubuki", "Asashio", "Shimakaze", "Shiratsuyu", "Mutsuki", "Kagerou", "Yuugumo", "Akizuki", "Kamikaze", "Matsu"]
            },
            {
                addition: { fire_power: 1, torpedo_power: 2, evasion: 2, los: 3 },
                ship_class_names: ["Kuma", "Sendai", "Nagara", "Tenryuu", "Yuubari", "Agano", "Ooyodo", "Katori"]
            },
            {
                addition: { fire_power: 1, evasion: 2, los: 3 },
                ship_class_names: ["Hurutaka", "Takao", "Mogami", "Aoba", "Myoukou", "Tone"]
            }
        ]
    },
    {
        ids: [139],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_ids: [662, 663, 668]
            }
        ]
    },
    {
        ids: [143],
        bonuses: [
            {
                addition: { fire_power: 3 },
                ship_base_ids: [83],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [84, 110],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [76, 111],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [144],
        bonuses: [
            {
                addition: { fire_power: 3 },
                ship_base_ids: [83],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [84, 110],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [461, 466],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [76, 111],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [462, 467],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [147], // 120mm/50 連装砲
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Maestrale"]
            }
        ]
    },
    {
        ids: [149],
        bonuses: [
            {
                addition: { asw: 1, evasion: 3 },
                ship_ids: [141, 160, 488, 622, 623, 656, 961],
                stack_limit: 1
            },
            {
                addition: { asw: 3, evasion: 5 },
                ship_ids: [624],
                stack_limit: 1
            },
            {
                addition: { asw: 2, evasion: 4 },
                ship_ids: [662],
                stack_limit: 1
            },
            {
                addition: { asw: 1, evasion: 2 },
                ship_class_names: ["Akizuki"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [165, 216],
        bonuses: [
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [171],
        bonuses: [
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, los: 1 },
                ship_class_names: ["Iowa", "Colorado", "South_Dakota", "North_Carolina", "Nevada"],
                stack_limit: 1
            },
            {
                addition: { los: 1 },
                ship_class_names: ["Iowa", "Colorado", "South_Dakota", "North_Carolina", "Nevada"],
                stack_limit: 1,
                required_improvement: 3
            },
            {
                addition: { los: 1 },
                ship_class_names: ["Iowa", "Colorado", "South_Dakota", "North_Carolina", "Nevada"],
                stack_limit: 1,
                required_improvement: 8
            }
        ]
    },
    {
        ids: [174], // 53cm連装魚雷
        bonuses: [
            {
                addition: { torpedo_power: 1, evasion: 2 },
                ship_class_names: ["Kamikaze"]
            },
            {
                addition: { torpedo_power: 6, evasion: 3 },
                ship_ids: [591, 592, 694, 954]
            },
            {
                addition: { torpedo_power: 5, evasion: 2 },
                ship_ids: [593] // 榛名改二乙
            },
            {
                addition: { fire_power: 2, torpedo_power: 4, evasion: 4 },
                ship_ids: [488, 622, 623, 624]
            }
        ]
    },
    {
        ids: [179], // 試製61cm六連装(酸素)魚雷
        bonuses: [
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["Akizuki"]
            }
        ]
    },
    {
        ids: [184], // Re.2001 OR改
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_class_names: ["Aquila"]
            }
        ]
    },
    {
        ids: [188], // Re.2001 G改
        bonuses: [
            {
                addition: { fire_power: 3, anti_air: 1, evasion: 1 },
                ship_class_names: ["Aquila"]
            }
        ]
    },
    {
        ids: [189], // Re.2005 改
        bonuses: [
            {
                addition: { anti_air: 1, evasion: 2 },
                ship_class_names: ["Graf", "Aquila"]
            }
        ]
    },
    {
        ids: [194], // Laté 298B
        bonuses: [
            {
                addition: { fire_power: 3, evasion: 2, los: 2 },
                ship_class_names: ["Commandant_Teste"]
            },
            {
                addition: { evasion: 1, los: 2 },
                ship_class_names: ["Mizuho", "Kamoi"]
            },
            {
                addition: { fire_power: 1, evasion: 2, los: 2 },
                ship_ids: [392, 969]
            }
        ]
    },
    {
        ids: [204], // 艦本新設計 増設バルジ(大型艦)
        bonuses: [
            {
                addition: { torpedo_power: 1, armor: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1
            },
            {
                addition: { armor: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 7
            },
            {
                addition: { armor: 1 },
                ship_ids: [694],
                stack_limit: 1,
                required_improvement: 7
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [694],
                stack_limit: 1,
                required_improvement: 10
            }
        ]
    },
    {
        ids: [217],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 5, evasion: 3 },
                ship_ids: [501, 506]
            },
            {
                addition: { fire_power: 1, anti_air: 4, evasion: 2 },
                ship_ids: [502, 507]
            }
        ]
    },
    {
        ids: [228],
        bonuses: [
            {
                addition: { fire_power: 3, anti_air: 3, asw: 4, evasion: 4 },
                ship_base_ids: [89]
            },
            {
                addition: { fire_power: 1, evasion: 2, asw: 2, anti_air: 1 },
                ship_ids: [894, 899]
            },
            {
                addition: { fire_power: 2, anti_air: 1, asw: 5, evasion: 1 },
                ship_class_names: ["Yawatamaru", "Taiyou"]
            },
            {
                addition: { anti_air: 1, asw: 2, evasion: 1 },
                ship_type_ids: ["CVL"]
            }
        ]
    },
    {
        ids: [229],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [622, 623, 624]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [622, 623, 624],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_ids: [622, 623, 624],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 3, asw: 2 },
                ship_ids: [656]
            },
            {
                addition: { fire_power: 2, evasion: 2 },
                ship_ids: [656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 3, evasion: 2 },
                ship_ids: [656],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [160, 487, 488],
                required_improvement: 7
            },
            {
                addition: { fire_power: 3, evasion: 2 },
                ship_ids: [160, 487, 488],
                requires_surface_radar: true,
                stack_limit: 1,
                required_improvement: 7
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [220],
                required_improvement: 7
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [23, 224, 289, 488],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_class_names: ["Mutsuki", "Kamikaze"],
                required_improvement: 7
            },
            {
                addition: { fire_power: 2, evasion: 3 },
                ship_class_names: ["Mutsuki", "Kamikaze"],
                requires_surface_radar: true,
                stack_limit: 1,
                required_improvement: 7
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_type_ids: ["DE"],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1, evasion: 4 },
                ship_type_ids: ["DE"],
                requires_surface_radar: true,
                stack_limit: 1,
                required_improvement: 7
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [23, 56, 113],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [235],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_class_names: ["Mogami", "Ooyodo"]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [321]
            },
            {
                addition: { fire_power: 3, evasion: 2 },
                ship_ids: [321],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 3, evasion: 3 },
                ship_ids: [321],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [237],
        bonuses: [
            {
                addition: { fire_power: 4, evasion: 2 },
                ship_ids: [553, 554]
            },
            {
                addition: { fire_power: 3, evasion: 1 },
                ship_ids: [82, 88]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [411, 412]
            }
        ]
    },
    {
        ids: [237, 322, 323, 490],
        bonuses: [
            {
                addition: { fire_power: 3, evasion: 1 },
                ship_ids: [662],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, anti_air: 1, evasion: 2 },
                ship_ids: [501, 506, 553, 554, 663, 668]
            },
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 2 },
                ship_ids: [502, 507]
            }
        ]
    },
    {
        ids: [
            238, // 零式水上偵察機11型乙
            239, // 零式水上偵察機11型乙(熟練)
        ],
        bonuses: [
            {
                addition: { torpedo_power: 1, evasion: 1 },
                ship_ids: [501, 502, 506, 507],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [242], // Swordfish
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_class_names: ["Ark_Royal"]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [89]
            }
        ]
    },
    {
        ids: [243],
        bonuses: [
            {
                addition: { fire_power: 3, evasion: 1 },
                ship_class_names: ["Ark_Royal"]
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [89]
            }
        ]
    },
    {
        ids: [244],
        bonuses: [
            {
                addition: { fire_power: 4, evasion: 2 },
                ship_class_names: ["Ark_Royal"]
            },
            {
                addition: { fire_power: 3 },
                ship_base_ids: [89]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ark_Royal"],
                required_improvement: 3
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Ark_Royal"],
                required_improvement: 5
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ark_Royal"],
                required_improvement: 7
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Ark_Royal"],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Ark_Royal"],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ark_Royal"],
                required_improvement: 10
            },
            {
                addition: { evasion: 1 },
                ship_base_ids: [89],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [89],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_base_ids: [89],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [89],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [266], // 12.7cm連装砲C型改二
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 2
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Asashio", "Shiratsuyu"]
            },
            {
                addition: { fire_power: 1, torpedo_power: 3, evasion: 1 },
                ship_class_names: ["Asashio", "Shiratsuyu"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Kagerou"]
            },
            {
                addition: { fire_power: 2, torpedo_power: 3, evasion: 1 },
                ship_class_names: ["Kagerou"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_base_ids: [20, 43, 167]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [961]
            }
        ]
    },
    {
        ids: [267], // 12.7cm連装砲D型改二
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_class_names: ["Shimakaze", "Yuugumo"]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Kagerou"]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [542, 543, 563, 564, 569, 578, 981, 983]
            },
            {
                addition: { fire_power: 1, torpedo_power: 3, evasion: 2 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 981, 983],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, torpedo_power: 3, evasion: 1 },
                ship_class_names: ["Yuugumo"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { torpedo_power: -1 },
                ship_ids: [955, 956],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { torpedo_power: -2 },
                ship_ids: [960],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [648, 649, 955, 956, 960, 961]
            },
            {
                addition: { fire_power: 2, torpedo_power: 3, evasion: 1 },
                ship_ids: [648],
                requires_surface_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [366], // 12.7cm連装砲D型改三
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_class_names: ["Shimakaze", "Yuugumo"]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Kagerou"]
            },
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_ids: [566, 567, 568, 656, 670, 915, 951],
                stack_limit: 2
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [542, 543, 563, 564, 569, 578, 981, 983]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [648, 649, 955, 956, 960, 961]
            },
            {
                addition: { anti_air: 3, fire_power: 1, shell_accuracy: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, torpedo_power: 4, evasion: 2, shell_accuracy: 2 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: -1 },
                ship_ids: [960],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 5, evasion: 3, shell_accuracy: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, fire_power: 2 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                stack_limit: 2
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [955],
                stack_limit: 2
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                required_improvement: 5
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [229, 542, 543, 563, 564, 569, 578, 648, 649, 955, 956, 960, 961, 981, 983],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_ids: [569, 648],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [267, 366],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 3 },
                ship_ids: [648, 961],
                requires_synergy_equip_id: [129, 412],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, evasion: -3 },
                ship_ids: [648, 961],
                requires_synergy_equip_id: [74],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [268],
        bonuses: [
            {
                addition: { evasion: 7, armor: 2 },
                ship_base_ids: [100, 101, 511],
                stack_limit: 1
            },
            {
                addition: { evasion: 7, armor: 2 },
                ship_ids: [200, 290],
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 9
            },
            {
                addition: { evasion: 1 },
                required_improvement: 10
            },
            {
                addition: { shell_accuracy: 1, evasion: 2, asw: 1 },
                ship_base_ids: [35, 63, 64, 100, 101, 114, 511, 516, 574, 1001],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1, evasion: 4, asw: 2 },
                requires_synergy_equip_id: [402],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [278], // SK レーダー
        bonuses: [
            {
                addition: { anti_air: 1, evasion: 3, los: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 2 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_class_names: ["Perth"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [279],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 3, los: 2 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 2, los: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_class_names: ["Perth"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [282],
        bonuses: [
            {
                addition: { fire_power: 2, armor: 1 },
                ship_country_ids: [Country.USSR]
            },
            {
                addition: { fire_power: 2, armor: 1 },
                ship_ids: [147]
            },
            {
                addition: { fire_power: 2, armor: 1 },
                ship_base_ids: [115]
            }
        ]
    },
    {
        ids: [283], // 533mm 三連装魚雷
        bonuses: [
            {
                addition: { fire_power: 1, torpedo_power: 6, armor: 1 },
                ship_country_ids: [Country.USSR]
            },
            {
                addition: { fire_power: 1, torpedo_power: 6, armor: 1 },
                ship_ids: [147]
            }
        ]
    },
    {
        ids: [285], // 61cm三連装(酸素)魚雷後期型
        bonuses: [
            {
                addition: { torpedo_power: 2, evasion: 1 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 2, evasion: 1 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 2
            },
            {
                addition: { fire_power: 1, torpedo_power: 1 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 2,
                required_improvement: 10
            },
            {
                addition: { torpedo_power: 3 },
                ship_ids: [147, 195, 326, 407, 419, 420, 426, 437, 627, 647, 665, 666, 903, 908, 959, 986, 987],
                stack_limit: 3,
                required_improvement: 10
            },
            {
                addition: { torpedo_power: 2 },
                ship_ids: [903],
                stack_limit: 2
            },
            {
                addition: { torpedo_power: 2 },
                ship_ids: [903],
                stack_limit: 3
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [908, 959],
                stack_limit: 2
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [908, 959],
                stack_limit: 3
            }
        ]
    },
    {
        ids: [286], // 61cm四連装(酸素)魚雷後期型
        bonuses: [
            {
                addition: { torpedo_power: 2, evasion: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 2, evasion: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                stack_limit: 2
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                stack_limit: 2,
                required_improvement: 10
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                ship_class_names: ["Kagerou"],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [144, 145, 198, 199, 463, 464, 468, 469, 470, 489, 490, 497, 498, 542, 543, 563, 564, 566, 567, 568, 569, 578, 587, 588, 648, 649, 651, 656, 667, 670, 915, 951, 955, 956, 960, 961, 975, 981, 983],
                ship_class_names: ["Kagerou"],
                stack_limit: 2,
                required_improvement: 5
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [961],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [961],
                stack_limit: 2,
                required_improvement: 5
            },
            {
                addition: { torpedo_power: 7, evasion: 2 },
                ship_base_ids: [642],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 2 },
                ship_base_ids: [642],
                stack_limit: 1,
                required_improvement: 7
            },
            {
                addition: { torpedo_power: 2 },
                ship_base_ids: [642],
                stack_limit: 1,
                required_improvement: 10
            },
            {
                addition: { torpedo_power: 2 },
                ship_ids: [662, 663, 668]
            },
            {
                addition: { torpedo_power: 3, evasion: 2 },
                ship_ids: [662, 663, 668],
                requires_surface_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [287],
        bonuses: [
            {
                addition: { asw: 1, evasion: 1 },
                ship_ids: [141, 160, 488, 624, 656]
            },
            {
                addition: { asw: 3 },
                ship_ids: [662, 961]
            }
        ]
    },
    {
        ids: [288],
        bonuses: [
            {
                addition: { asw: 2, evasion: 1 },
                ship_ids: [141, 160, 488, 656]
            },
            {
                addition: { fire_power: 1, asw: 3, evasion: 2 },
                ship_ids: [624]
            },
            {
                addition: { asw: 4, evasion: 1 },
                ship_ids: [662, 961]
            }
        ]
    },
    {
        ids: [289],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_ids: [149, 591]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [150, 152, 592, 694]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [151, 593, 954]
            },
            {
                addition: { fire_power: 2, evasion: 2 },
                ship_ids: [149, 151, 591, 593, 954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 1
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 5
            },
            {
                addition: { evasion: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 7
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 9
            },
            {
                addition: { evasion: 1 },
                ship_ids: [151, 593, 954],
                required_improvement: 10
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [591],
                required_improvement: 4
            },
            {
                addition: { evasion: 1 },
                ship_ids: [591],
                required_improvement: 6
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [591],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_ids: [591],
                required_improvement: 10
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 9
            },
            {
                addition: { evasion: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [290],
        bonuses: [
            {
                addition: { fire_power: 3, anti_air: 2, shell_accuracy: 3, evasion: 1 },
                ship_ids: [553, 554]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [554]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [82, 88]
            },
            {
                addition: { anti_air: 2, evasion: 3 },
                ship_ids: [82, 88, 553, 554],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [411, 412]
            }
        ]
    },
    {
        ids: [291],
        bonuses: [
            {
                addition: { fire_power: 6, evasion: 1 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [292],
        bonuses: [
            {
                addition: { fire_power: 8, anti_air: 1, evasion: 2 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [293], // 12cm単装砲改二
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 3 },
                ship_class_names: ["Mutsuki", "Kamikaze"]
            },
            {
                addition: { fire_power: 2, torpedo_power: 1, evasion: 3 },
                ship_class_names: ["Mutsuki", "Kamikaze"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, torpedo_power: 4 },
                ship_class_names: ["Mutsuki", "Kamikaze"],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 3 },
                ship_class_names: ["Mutsuki", "Kamikaze"],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_class_names: ["Shimushu", "Etorohu"]
            },
            {
                addition: { fire_power: 2, asw: 1, evasion: 3 },
                ship_class_names: ["Shimushu", "Etorohu"],
                requires_surface_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [294], // 12.7cm連装砲A型改二
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"]
            },
            {
                addition: { fire_power: 3, torpedo_power: 1, evasion: 2 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 3 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_synergy_equip_id: [13, 125, 285],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 2 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_synergy_equip_id: [13, 125, 285],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_synergy_equip_id: [285],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [959]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [959],
                stack_limit: 2
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [959],
                stack_limit: 3
            },
            {
                addition: { shell_accuracy: 4 },
                ship_ids: [959],
                required_improvement: 6
            },
            {
                addition: { fire_power: 6 },
                ship_ids: [959],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [959],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [959],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [959],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [295], // 12.7cm連装砲A型改三(戦時改修)+高射装置
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"]
            },
            {
                addition: { fire_power: 3, torpedo_power: 1, evasion: 2 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 6 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, asw: 1 },
                ship_ids: [666]
            },
            {
                addition: { fire_power: 1, torpedo_power: 3 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_synergy_equip_id: [13, 125, 285],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 2 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_synergy_equip_id: [13, 125, 285],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_synergy_equip_id: [285],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [959]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [959],
                stack_limit: 2
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [959],
                stack_limit: 3
            }
        ]
    },
    {
        ids: [296], // 12.7cm連装砲B型改四(戦時改修)+高射装置
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu"]
            },
            {
                addition: { fire_power: 1, torpedo_power: 2, evasion: 2 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 5 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu"],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Hatsuharu"]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Shiratsuyu"]
            },
            {
                addition: { fire_power: 1, torpedo_power: 3, evasion: 2 },
                ship_class_names: ["Shiratsuyu"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 6 },
                ship_class_names: ["Shiratsuyu"],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [145, 961]
            },
            {
                addition: { fire_power: 1, torpedo_power: 1 },
                ship_ids: [144]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [242, 244, 469, 587, 588, 667]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [497]
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_ids: [498, 975]
            },
            {
                addition: { fire_power: 2, torpedo_power: 1 },
                ship_ids: [627]
            },
            {
                addition: { fire_power: 1, torpedo_power: 3 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu"],
                requires_synergy_equip_id: [125, 285],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 3 },
                ship_class_names: ["Shiratsuyu"],
                requires_synergy_equip_id: [15, 286],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [903, 908]
            }
        ]
    },
    {
        ids: [297],
        bonuses: [
            {
                addition: { evasion: 2 },
                ship_class_names: ["Hubuki"]
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Ayanami", "Dairoku"]
            }
        ]
    },
    {
        ids: [298, 299, 300],
        bonuses: [
            {
                addition: { fire_power: 2, armor: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { evasion: -2 },
                ship_class_names: ["Queen_Elizabeth"]
            },
            {
                addition: { fire_power: 1, armor: 1, evasion: -3 },
                ship_ids: [149, 150, 151, 152]
            },
            {
                addition: { fire_power: 2, armor: 1, evasion: -2 },
                ship_ids: [591, 592, 694]
            },
            {
                addition: { fire_power: 1, armor: 1, evasion: -1 },
                ship_ids: [593, 954]
            }
        ]
    },
    {
        ids: [301],
        bonuses: [
            {
                addition: { anti_air: 2, armor: 1, evasion: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            }
        ]
    },
    {
        ids: [302],
        bonuses: [
            {
                addition: { asw: 1, evasion: 1 },
                ship_class_names: ["Taiyou"]
            }
        ]
    },
    {
        ids: [303], // Bofors 15.2cm連装砲 Model 1930
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_class_names: ["Kuma", "Sendai", "Nagara", "Agano"]
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_class_names: ["Gotland"]
            }
        ]
    },
    {
        ids: [304],
        bonuses: [
            {
                addition: { fire_power: 1, asw: 1, evasion: 1 },
                ship_class_names: ["Kuma", "Sendai", "Nagara", "Agano"]
            },
            {
                addition: { fire_power: 1, asw: 2, evasion: 2 },
                ship_class_names: ["Gotland"]
            }
        ]
    },
    {
        ids: [305, 306],
        bonuses: [
            {
                addition: { asw: 1, evasion: 1 },
                ship_class_names: ["Taiyou"]
            },
            {
                addition: { asw: 2, evasion: 1 },
                ship_base_ids: [534]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_base_ids: [432, 444]
            }
        ]
    },
    {
        ids: [307],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [308],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["DD"]
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_type_ids: ["DE"]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [651, 656]
            }
        ]
    },
    {
        ids: [
            310, // 14cm連装砲改
            518, // 14cm連装砲改二
        ],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_class_names: ["Yuubari"]
            },
            {
                addition: { fire_power: 2 },
                ship_class_names: ["Yuubari"],
                required_improvement: 10
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_class_names: ["Katori"]
            },
            {
                addition: { fire_power: 2, evasion: 2 },
                ship_class_names: ["Katori"],
                required_improvement: 10
            },
            {
                addition: { fire_power: 3, torpedo_power: 2, anti_air: 1, evasion: 1 },
                ship_class_names: ["Nisshin"]
            },
            {
                addition: { fire_power: 1, torpedo_power: 1 },
                ship_class_names: ["Nisshin"],
                required_improvement: 10
            },
            {
                addition: { fire_power: 2, asw: 1, evasion: 1 },
                ship_ids: [622, 623, 624]
            },
            {
                addition: { fire_power: 3, torpedo_power: 2, evasion: 2 },
                ship_ids: [622, 623, 624],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 1 },
                ship_ids: [622, 623, 624],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [518], // 14cm連装砲改二
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, asw: 1, evasion: 1 },
                ship_class_names: ["Yuubari", "Katori"]
            },
            {
                addition: { fire_power: 1, torpedo_power: 1, evasion: 1 },
                ship_type_ids: ["AV"]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [622, 623, 624]
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [622, 624]
            },
            {
                addition: { asw: 2 },
                ship_ids: [624]
            }
        ]
    },
    {
        ids: [313], // 5inch単装砲 Mk.30改
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 2, armor: 1, evasion: 1 },
                ship_class_names: ["John_C_Butler", "Fletcher"]
            },
            {
                addition: { fire_power: 2, anti_air: 2, armor: 1, evasion: 1 },
                ship_ids: [651, 656]
            }
        ]
    },
    {
        ids: [314], // 533mm五連装魚雷(初期型)
        bonuses: [
            {
                addition: { fire_power: 1, torpedo_power: 3 },
                ship_class_names: ["John_C_Butler", "Fletcher"]
            }
        ]
    },
    {
        ids: [315], // SG レーダー(初期型)
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 3, los: 4 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["John_C_Butler", "Fletcher"]
            },
            {
                addition: { range: 1 },
                ship_class_names: ["John_C_Butler", "Fletcher"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, evasion: 2, los: 3, range: 1 },
                ship_ids: [651, 656],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [316],
        bonuses: [
            {
                addition: { fire_power: 4, anti_air: 1, evasion: 1 },
                ship_class_names: ["Aquila"]
            }
        ]
    },
    {
        ids: [317],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_class_names: ["Kongou"],
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Kongou"],
                required_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_class_names: ["Ise"],
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Ise"],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_ids: [149, 591, 592],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [150],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [151],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_ids: [593],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [954],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_ids: [152, 694],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_ids: [541],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [573],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [318],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_ids: [411, 412]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [82, 88]
            },
            {
                addition: { fire_power: 2, anti_air: 2, shell_accuracy: 3, evasion: 2 },
                ship_ids: [553]
            },
            {
                addition: { armor: 1, evasion: 2 },
                ship_ids: [553],
                requires_synergy_equip_id: [290],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, anti_air: 2, shell_accuracy: 3, evasion: 2 },
                ship_ids: [554]
            },
            {
                addition: { fire_power: 1, armor: 1, shell_accuracy: 1, evasion: 2 },
                ship_ids: [554],
                requires_synergy_equip_id: [290],
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, shell_accuracy: 1, evasion: 3 },
                ship_ids: [82, 88, 553, 554],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: -2, shell_accuracy: -1, evasion: -3 },
                ship_ids: [82, 88, 553, 554],
                requires_air_radar: true,
                requires_synergy_equip_id: [290],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, anti_air: 2, shell_accuracy: 2, evasion: 1 },
                ship_ids: [541, 573]
            },
            {
                addition: { fire_power: 2, armor: 1, shell_accuracy: 1, evasion: 2 },
                ship_ids: [541, 573],
                requires_synergy_equip_id: [290],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [319],
        bonuses: [
            {
                addition: { fire_power: 7, anti_air: 3, evasion: 2 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [320],
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_ids: [553]
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [196, 197]
            },
            {
                addition: { fire_power: 4 },
                ship_ids: [508, 509, 554]
            }
        ]
    },
    {
        ids: [322],
        bonuses: [
            {
                addition: { fire_power: 5, anti_air: 2, asw: 1, evasion: 2 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [323],
        bonuses: [
            {
                addition: { fire_power: 6, anti_air: 3, asw: 2, evasion: 3 },
                ship_ids: [553, 554]
            }
        ]
    },
    {
        ids: [324, 325],
        bonuses: [
            {
                addition: { fire_power: 2, asw: 3, evasion: 1 },
                ship_ids: [554, 646]
            },
            {
                addition: { fire_power: 1, asw: 2, evasion: 1 },
                ship_ids: [553]
            }
        ]
    },
    {
        ids: [326],
        bonuses: [
            {
                addition: { fire_power: 3, asw: 5, evasion: 3 },
                ship_ids: [646]
            },
            {
                addition: { fire_power: 3, asw: 4, evasion: 2 },
                ship_ids: [554]
            },
            {
                addition: { fire_power: 1, asw: 3, evasion: 1 },
                ship_ids: [553]
            }
        ]
    },
    {
        ids: [327],
        bonuses: [
            {
                addition: { fire_power: 5, asw: 6, evasion: 4 },
                ship_ids: [646]
            },
            {
                addition: { fire_power: 4, asw: 5, evasion: 2 },
                ship_ids: [554]
            },
            {
                addition: { fire_power: 2, asw: 4, evasion: 1 },
                ship_ids: [553]
            }
        ]
    },
    {
        ids: [328], // 35.6cm連装砲改
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_base_ids: [78, 79, 85, 86]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [149, 150, 151, 152, 209, 210, 211, 212]
            },
            {
                addition: { fire_power: 2, torpedo_power: 1 },
                ship_ids: [591]
            },
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_ids: [592, 694, 954]
            },
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_ids: [593]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [26, 27, 77, 87]
            }
        ]
    },
    {
        ids: [329], // 35.6cm連装砲改二
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_base_ids: [78, 79, 85, 86]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [209, 210, 211, 212]
            },
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_ids: [149, 150, 151, 152]
            },
            {
                addition: { fire_power: 3, torpedo_power: 2, anti_air: 1 },
                ship_ids: [591, 592, 954]
            },
            {
                addition: { fire_power: 2, torpedo_power: 1, anti_air: 3 },
                ship_ids: [593]
            },
            {
                addition: { fire_power: 4, torpedo_power: 1, anti_air: 1 },
                ship_ids: [694]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [26, 27, 77, 87]
            }
        ]
    },
    {
        ids: [330], // 16inch Mk.I連装砲
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Colorado"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Nagato", "Nelson"]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [541, 573, 576]
            }
        ]
    },
    {
        ids: [331], // 16inch Mk.V連装砲
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Colorado"]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [918, 1496]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Nagato", "Nelson"]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [541, 573, 576]
            }
        ]
    },
    {
        ids: [332],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Colorado"]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [918, 1496]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Nagato", "Nelson"]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [541, 573, 576]
            }
        ]
    },
    {
        ids: [335],
        bonuses: [
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_ids: [277, 278]
            },
            {
                addition: { anti_air: 2, evasion: 1 },
                ship_ids: [594, 599, 610, 646, 698]
            }
        ]
    },
    {
        ids: [336],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [277, 278]
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_ids: [594, 599, 610, 646, 698]
            }
        ]
    },
    {
        ids: [337],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [277, 278]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [594, 599, 610, 646, 698]
            }
        ]
    },
    {
        ids: [338],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_ids: [277, 278]
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [594, 646, 698]
            },
            {
                addition: { fire_power: 4, anti_air: 3, evasion: 4 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [339],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_ids: [277, 278]
            },
            {
                addition: { fire_power: 1, anti_air: 3, evasion: 4 },
                ship_ids: [594, 646, 698]
            },
            {
                addition: { fire_power: 6, anti_air: 4, evasion: 5 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [340],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [589, 590]
            }
        ]
    },
    {
        ids: [341],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_base_ids: [589, 590]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [574]
            }
        ]
    },
    {
        ids: [342],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_ids: [277, 278, 461, 462, 466, 467]
            },
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_ids: [594, 646, 698]
            },
            {
                addition: { fire_power: 3, anti_air: 2, evasion: 2 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [343],
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_ids: [277, 278]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [461, 462, 466, 467]
            },
            {
                addition: { fire_power: 3, anti_air: 2, evasion: 1 },
                ship_ids: [594, 646, 698]
            },
            {
                addition: { fire_power: 5, anti_air: 3, evasion: 3 },
                ship_ids: [599, 610]
            }
        ]
    },
    {
        ids: [344],
        bonuses: [
            {
                addition: { fire_power: 3 },
                ship_ids: [599, 610]
            },
            {
                addition: { fire_power: 2, asw: 2 },
                ship_ids: [555, 560]
            },
            {
                addition: { fire_power: 4, asw: 1 },
                ship_ids: [318]
            },
            {
                addition: { fire_power: 2, asw: 1 },
                ship_ids: [282]
            },
            {
                addition: { fire_power: 4, asw: 2 },
                ship_ids: [888]
            },
            {
                addition: { fire_power: 5, asw: 2 },
                ship_ids: [883]
            }
        ]
    },
    {
        ids: [345],
        bonuses: [
            {
                addition: { fire_power: 3, evasion: 1 },
                ship_ids: [599, 610]
            },
            {
                addition: { fire_power: 3, asw: 2, evasion: 2 },
                ship_ids: [555, 560]
            },
            {
                addition: { fire_power: 5, asw: 1, evasion: 2 },
                ship_ids: [318]
            },
            {
                addition: { fire_power: 3, asw: 1, evasion: 1 },
                ship_ids: [282]
            },
            {
                addition: { fire_power: 4, asw: 2, evasion: 2 },
                ship_ids: [888]
            },
            {
                addition: { fire_power: 5, asw: 2, evasion: 3 },
                ship_ids: [883]
            }
        ]
    },
    {
        ids: [356, 357],
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_class_names: ["Northampton"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Mogami"]
            }
        ]
    },
    {
        ids: [358],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_class_names: ["Northampton"]
            }
        ]
    },
    {
        ids: [359],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_base_ids: [613]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [115]
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [622, 623, 624]
            }
        ]
    },
    {
        ids: [360, 361],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_base_ids: [604]
            },
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_base_ids: [574]
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_class_names: ["Agano"]
            }
        ]
    },
    {
        ids: [362, 363],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_class_names: ["Atlanta"]
            },
            {
                addition: { fire_power: -3, anti_air: -3, evasion: -8 },
                ship_class_names: ["Tenryuu", "Yuubari"]
            },
            {
                addition: { fire_power: -3, anti_air: -2, evasion: -6 },
                ship_class_names: ["Kuma", "Sendai", "Nagara"]
            },
            {
                addition: { fire_power: -2, anti_air: -1, evasion: -4 },
                ship_class_names: ["Katori", "Gotland"]
            },
            {
                addition: { anti_air: -1, evasion: -2 },
                ship_class_names: ["Agano", "Ooyodo", "De_Ruyter"]
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [364], // 甲標的 丁型改(蛟龍改)
        bonuses: [
            {
                addition: { fire_power: 1, torpedo_power: 1, evasion: 5 },
                ship_ids: [118, 119, 506, 507, 586, 623, 657, 668]
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [119]
            },
            {
                addition: { torpedo_power: 2 },
                ship_ids: [507]
            },
            {
                addition: { fire_power: 1, torpedo_power: 3 },
                ship_ids: [623]
            },
            {
                addition: { fire_power: -1, evasion: -7 }
            }
        ]
    },
    {
        ids: [365],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ise", "Kongou", "Nagato", "Husou", "Yamato"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [136, 148, 541, 546, 573, 593, 911, 916],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [591, 592, 694, 954],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [367],
        bonuses: [
            {
                addition: { fire_power: 2, asw: 1, evasion: 1, los: 1 },
                ship_base_ids: [574]
            },
            {
                addition: { fire_power: 1, asw: 1, evasion: 1, los: 1 },
                ship_class_names: ["Commandant_Teste"]
            },
            {
                addition: { fire_power: 1, evasion: 1, los: 1 },
                ship_class_names: ["Mizuho", "Kamoi"]
            },
            {
                addition: { fire_power: 2, evasion: 2, los: 2 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            }
        ]
    },
    {
        ids: [368], // Swordfish Mk.III改(水上機型)
        bonuses: [
            {
                addition: { fire_power: 4, asw: 3, evasion: 2, los: 3 },
                ship_base_ids: [574]
            },
            {
                addition: { fire_power: 2, torpedo_power: 2, evasion: 1, los: 1 },
                ship_ids: [630],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, asw: 3, evasion: 1, los: 2 },
                ship_class_names: ["Commandant_Teste"]
            },
            {
                addition: { fire_power: 1, asw: 2, evasion: 1, los: 2 },
                ship_class_names: ["Mizuho", "Kamoi"]
            },
            {
                addition: { fire_power: 2, asw: 2, evasion: 2, los: 2 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            }
        ]
    },
    {
        ids: [369], // Swordfish Mk.III改(水上機型/熟練)
        bonuses: [
            {
                addition: { fire_power: 5, asw: 4, evasion: 4, los: 3 },
                ship_base_ids: [574]
            },
            {
                addition: { fire_power: 3, torpedo_power: 3, evasion: 2, los: 2 },
                ship_ids: [630],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, asw: 3, evasion: 2, los: 3 },
                ship_class_names: ["Commandant_Teste"]
            },
            {
                addition: { fire_power: 2, asw: 2, evasion: 1, los: 2 },
                ship_class_names: ["Mizuho", "Kamoi"]
            },
            {
                addition: { fire_power: 2, asw: 2, evasion: 2, los: 2 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            }
        ]
    },
    {
        ids: [370],
        bonuses: [
            {
                addition: { fire_power: 1, asw: 3, evasion: 1, los: 2 },
                ship_base_ids: [574]
            },
            {
                addition: { fire_power: 1, asw: 3, evasion: 1, los: 1 },
                ship_class_names: ["Commandant_Teste"]
            },
            {
                addition: { fire_power: 1, asw: 2, evasion: 1, los: 1 },
                ship_class_names: ["Mizuho", "Kamoi"]
            },
            {
                addition: { fire_power: 2, asw: 3, evasion: 2, los: 2 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 4, evasion: 1, los: 1 },
                ship_base_ids: [439],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, evasion: 2, los: 1 },
                ship_base_ids: [927],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [371],
        bonuses: [
            {
                addition: { fire_power: 4, asw: 2, evasion: 3, los: 6 },
                ship_base_ids: [574]
            },
            {
                addition: { fire_power: 2, evasion: 2, los: 3 },
                ship_ids: [630],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, asw: 1, evasion: 2, los: 4 },
                ship_class_names: ["Commandant_Teste"]
            },
            {
                addition: { fire_power: 2, evasion: 1, los: 3 },
                ship_class_names: ["Richelieu"]
            },
            {
                addition: { fire_power: 3, asw: 1, evasion: 2, los: 3 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 3, evasion: 2, los: 2 },
                ship_class_names: ["Nelson"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [372], // 天山一二型甲 // !
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_base_ids: [75, 92, 110, 111, 153]
            },
            {
                addition: { aerial_torpedo_power: 1 },
                ship_base_ids: [110, 111, 153],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [108, 109, 291, 292, 296, 297, 508, 509]
            },
            {
                addition: { asw: 1 },
                ship_ids: [74, 116, 117, 185, 282, 318, 555, 560]
            },
            {
                addition: { aerial_torpedo_power: 1 },
                ship_ids: [318, 555, 560],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, asw: 1 },
                ship_ids: [883, 888]
            },
            {
                addition: { aerial_torpedo_power: 2 },
                ship_ids: [883, 888],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [373], // 天山一二型甲改(空六号電探改装備機) // !
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_base_ids: [110]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [75, 92, 111, 153]
            },
            {
                addition: { aerial_torpedo_power: 2, evasion: 2 },
                ship_base_ids: [110, 153],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 2, evasion: 3 },
                ship_base_ids: [111],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 1, evasion: 1 },
                ship_base_ids: [75, 92],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [108, 109, 291, 292, 296, 297, 508, 509]
            },
            {
                addition: { asw: 1 },
                ship_ids: [74, 116]
            },
            {
                addition: { fire_power: 1, asw: 1 },
                ship_ids: [117, 185, 282]
            },
            {
                addition: { fire_power: 1, asw: 2 },
                ship_ids: [318, 555, 560, 883]
            },
            {
                addition: { fire_power: 2, asw: 2 },
                ship_ids: [888]
            },
            {
                addition: { aerial_torpedo_power: 1 },
                ship_ids: [117, 185, 282, 291, 292],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 1, evasion: 1 },
                ship_ids: [296, 297, 318, 555, 560],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 2, evasion: 2 },
                ship_ids: [508, 509, 888],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 3, evasion: 4 },
                ship_ids: [883],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [374], // 天山一二型甲改(熟練/空六号電探改装備機) // !
        bonuses: [
            {
                addition: { fire_power: 3 },
                ship_base_ids: [110]
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [111, 153]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [75, 92]
            },
            {
                addition: { aerial_torpedo_power: 3, evasion: 3 },
                ship_base_ids: [110],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 3, evasion: 4 },
                ship_base_ids: [111],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 3, evasion: 2 },
                ship_base_ids: [153],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 2, evasion: 2 },
                ship_base_ids: [75, 92],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [108, 109]
            },
            {
                addition: { fire_power: 1, asw: 1 },
                ship_ids: [74, 116, 291, 292, 296, 297]
            },
            {
                addition: { fire_power: 1, asw: 2 },
                ship_ids: [117, 185, 282, 508, 509]
            },
            {
                addition: { fire_power: 1, asw: 3 },
                ship_ids: [318, 555, 560]
            },
            {
                addition: { fire_power: 2, asw: 3 },
                ship_ids: [883]
            },
            {
                addition: { fire_power: 3, asw: 3 },
                ship_ids: [888]
            },
            {
                addition: { aerial_torpedo_power: 1 },
                ship_ids: [108, 109, 291, 292],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 1, evasion: 1 },
                ship_ids: [117, 185, 282, 296, 297],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 1, evasion: 2 },
                ship_ids: [318, 555, 560],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 2, evasion: 3 },
                ship_ids: [508, 509, 888],
                stack_limit: 1
            },
            {
                addition: { aerial_torpedo_power: 3, evasion: 5 },
                ship_ids: [883],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [375], // XF5U
        bonuses: [
            {
                addition: { fire_power: 3, anti_air: 3, asw: 3, evasion: 3 },
                ship_class_names: ["Lexington", "Casablanca", "Essex", "Yorktown", "Independence", "Ranger"]
            },
            {
                addition: { fire_power: 1, anti_air: 1, asw: 1, evasion: 1 },
                ship_base_ids: [84]
            }
        ]
    },
    {
        ids: [376], // 533mm五連装魚雷(後期型)
        bonuses: [
            {
                addition: { fire_power: 2, torpedo_power: 4 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1, torpedo_power: 2 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1, torpedo_power: 1 },
                ship_class_names: ["Perth"]
            }
        ]
    },
    {
        ids: [377],
        bonuses: [
            {
                addition: { asw: 2, evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                addition: { asw: 1, evasion: 2 },
                ship_ids: [629, 651, 656],
                stack_limit: 1
            },
            {
                addition: { asw: 1, evasion: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Perth", "Town", "Illustrious"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [378],
        bonuses: [
            {
                addition: { asw: 3, evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                addition: { asw: 1, evasion: 1 },
                ship_ids: [629, 651, 656],
                stack_limit: 1
            },
            {
                addition: { asw: 2, evasion: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                stack_limit: 1
            },
            {
                addition: { asw: 1, evasion: 1 },
                ship_class_names: ["Perth"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [379],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_type_ids: ["DE"]
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_type_ids: ["AV", "CT"]
            },
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"]
            },
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_class_names: ["Matsu"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [22, 23, 56, 113]
            },
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_base_ids: [24, 25]
            },
            {
                addition: { asw: 1 },
                ship_base_ids: [22, 23, 56, 113, 115]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [51, 52, 115]
            },
            {
                addition: { anti_air: 4 },
                ship_ids: [488]
            },
            {
                addition: { anti_air: 3 },
                ship_ids: [141, 160, 220, 487]
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [22, 23, 56, 113, 219, 224, 289]
            },
            {
                addition: { fire_power: 3, anti_air: 3 },
                ship_ids: [651, 656]
            },
            {
                addition: { asw: 2, evasion: 3 },
                ship_ids: [656]
            },
            {
                addition: { asw: 1 },
                ship_ids: [141, 160, 487, 488]
            },
            {
                addition: { asw: 2 },
                ship_ids: [477, 478, 624]
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [477, 478, 622, 624]
            },
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_ids: [146, 547, 652, 657],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 2 },
                ship_type_ids: ["CL", "CLT", "AV", "CT"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 4 },
                ship_type_ids: ["DE"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, evasion: 3 },
                ship_class_names: ["Tenryuu", "Mutsuki", "Yuubari", "Kamikaze"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 4, evasion: 3 },
                ship_class_names: ["Matsu"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, evasion: 2 },
                ship_ids: [488, 651, 656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [118, 119, 141, 146, 160, 487, 547, 652, 657],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 3, evasion: 2 },
                ship_ids: [656],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [380], // 12.7cm連装高角砲改二
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_type_ids: ["AV", "CT"]
            },
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_class_names: ["Matsu"]
            },
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_class_names: ["Matsu"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [22, 23, 56, 113]
            },
            {
                addition: { fire_power: 3, anti_air: 2 },
                ship_base_ids: [24, 25]
            },
            {
                addition: { asw: 1 },
                ship_base_ids: [22, 23, 56, 113, 115]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [51, 52, 115]
            },
            {
                addition: { anti_air: 4 },
                ship_ids: [488]
            },
            {
                addition: { anti_air: 3 },
                ship_ids: [141, 160, 220, 487]
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [22, 23, 56, 113, 219, 224, 289]
            },
            {
                addition: { fire_power: 3, anti_air: 3 },
                ship_ids: [651, 656]
            },
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_ids: [407, 665]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_ids: [407, 665],
                stack_limit: 1
            },
            {
                addition: { asw: 1 },
                ship_ids: [141, 160, 487, 488]
            },
            {
                addition: { asw: 2 },
                ship_ids: [477, 478, 624]
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [477, 478, 622, 624]
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [652, 657]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [146, 547],
                stack_limit: 1
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [146, 547, 652, 657],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_type_ids: ["CL", "CLT", "AV", "CT"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 4, evasion: 3 },
                ship_class_names: ["Matsu"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 2 },
                ship_ids: [118, 119, 141, 160, 487, 488, 651, 656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 3 },
                ship_ids: [146, 547, 652, 657],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_ids: [407, 665],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_ids: [407, 665],
                requires_synergy_equip_type_ids: [21],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [381],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["South_Dakota"]
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 6
            }
        ]
    },
    {
        ids: [382, 509],
        bonuses: [
            {
                addition: { anti_air: 2, asw: 1, evasion: 2 },
                ship_type_ids: ["DE"]
            },
            {
                addition: { fire_power: 2, evasion: 3 },
                ship_type_ids: ["DE"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 3 },
                ship_type_ids: ["DE"],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 1 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"]
            },
            {
                addition: { fire_power: 1, evasion: 2 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                ship_base_ids: [23, 56, 113]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [220, 224, 289]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [160, 487, 488]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [160, 487, 488],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_ids: [160, 487, 488],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 3, evasion: 2 },
                ship_ids: [656]
            },
            {
                addition: { fire_power: 2, evasion: 2 },
                ship_ids: [656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 3, evasion: 2 },
                ship_ids: [656],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [979]
            }
        ]
    },
    {
        ids: [509],
        bonuses: [
            {
                addition: { anti_air: 1 },
                required_improvement: 2
            },
            {
                addition: { evasion: 2 },
                required_improvement: 4
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 6
            },
            {
                addition: { anti_air: 1 },
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 10
            },
            {
                addition: { anti_air: 1 },
                ship_type_ids: ["DE"],
                required_improvement: 1
            },
            {
                addition: { evasion: 2, anti_air: -1 },
                ship_type_ids: ["DE"],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1, evasion: -2 },
                ship_type_ids: ["DE"],
                required_improvement: 4
            },
            {
                addition: { anti_air: 1, fire_power: -1 },
                ship_type_ids: ["DE"],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1, anti_air: -1 },
                ship_type_ids: ["DE"],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1, shell_accuracy: -1 },
                ship_type_ids: ["DE"],
                required_improvement: 10
            },
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"],
                required_improvement: 1
            },
            {
                addition: { evasion: 2, anti_air: -1 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1, evasion: -2 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"],
                required_improvement: 4
            },
            {
                addition: { anti_air: 1, fire_power: -1 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1, anti_air: -1 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1, shell_accuracy: -1 },
                ship_class_names: ["Mutsuki", "Kamikaze", "Matsu"],
                required_improvement: 10
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 1
            },
            {
                addition: { evasion: 2, anti_air: -1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1, evasion: -2 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 4
            },
            {
                addition: { anti_air: 1, fire_power: -1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1, anti_air: -1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1, shell_accuracy: -1 },
                ship_ids: [145, 488, 656, 961],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_type_ids: ["CL", "CLT", "CT"],
                required_improvement: 2,
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 1 },
                ship_type_ids: ["CL", "CLT", "CT"],
                required_improvement: 2,
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_ids: [145],
                required_improvement: 2,
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 4, evasion: 2 },
                ship_ids: [145],
                required_improvement: 2,
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 3 },
                ship_ids: [961, 979],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 5, evasion: 3 },
                ship_ids: [961, 979],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [979]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [979],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 5
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [979],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [979],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [979],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [383], // 後期型53cm艦首魚雷(8門)
        bonuses: [
            {
                addition: { torpedo_power: 2 },
                ship_class_names: ["I_400"]
            },
            {
                addition: { torpedo_power: 1 },
                ship_base_ids: [127]
            },
            {
                addition: { torpedo_power: 3 },
                ship_ids: [636]
            },
            {
                addition: { torpedo_power: 4 },
                ship_ids: [607]
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["I_400"],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["I_400"],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1 },
                required_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_base_ids: [127, 636],
                required_improvement: 5,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [384], // 後期型潜水艦搭載電探&逆探
        bonuses: [
            {
                addition: { evasion: 3 },
                ship_class_names: ["I_400"]
            },
            {
                addition: { evasion: 2 },
                ship_base_ids: [127]
            },
            {
                addition: { evasion: 3 },
                ship_ids: [636]
            },
            {
                addition: { evasion: 4 },
                ship_ids: [607]
            },
            {
                addition: { torpedo_power: 3, evasion: 2 },
                requires_synergy_equip_id: [213, 214, 383],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [385], // 16inch三連装砲 Mk.6 mod.2
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 6
            },
            {
                addition: { armor: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, armor: 1 },
                ship_class_names: ["South_Dakota", "North_Carolina"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Colorado"]
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["FBB"]
            }
        ]
    },
    {
        ids: [386, 387],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [389], // TBM-3W+3S
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 2 },
                ship_ids: [594, 599]
            },
            {
                addition: { fire_power: 3, evasion: 2 },
                ship_ids: [610, 698]
            },
            {
                addition: { fire_power: 4, asw: 4, evasion: 3 },
                ship_ids: [646] // 加賀改二護
            },
            {
                addition: { fire_power: 3, asw: 6 },
                ship_ids: [646],
                requires_synergy_equip_type_ids: [25],
                stack_limit: 1
            },
            {
                addition: { fire_power: 5, asw: 4 },
                ship_ids: [646],
                requires_synergy_equip_id: [326, 327],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, asw: 3, evasion: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [390],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 3
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 6
            },
            {
                addition: { armor: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, armor: 1 },
                ship_class_names: ["South_Dakota", "North_Carolina"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Colorado"]
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["FBB"]
            }
        ]
    },
    {
        ids: [391],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_base_ids: [75, 92, 110, 111]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [116, 117, 185, 282, 318, 883, 888]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [117, 318, 883, 888],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [555, 560]
            }
        ]
    },
    {
        ids: [392],
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_base_ids: [110, 111]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_base_ids: [75, 92]
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_ids: [116, 185, 282]
            },
            {
                addition: { fire_power: 2, evasion: 2 },
                ship_ids: [117, 318, 883, 888]
            },
            {
                addition: { fire_power: 3, evasion: 2 },
                ship_ids: [555, 560]
            }
        ]
    },
    {
        ids: [393],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_class_names: ["Maestrale"]
            }
        ]
    },
    {
        ids: [394],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 2 },
                ship_class_names: ["Maestrale"]
            },
            {
                addition: { evasion: 1 },
                ship_base_ids: [614]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Maestrale"],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [614],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Maestrale"],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Maestrale"],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Maestrale"],
                required_improvement: 10
            },
            {
                addition: { evasion: 1 },
                ship_base_ids: [614],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [397],
        bonuses: [
            {
                addition: { fire_power: 5, anti_air: 2, evasion: 1 },
                ship_ids: [651]
            },
            {
                addition: { fire_power: 4, evasion: 1 },
                ship_ids: [651],
                required_improvement: 4
            },
            {
                addition: { fire_power: 3, anti_air: 1, evasion: 1 },
                ship_ids: [656]
            },
            {
                addition: { fire_power: 3, evasion: 3 },
                ship_ids: [651, 656],
                requires_surface_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [398],
        bonuses: [
            {
                addition: { fire_power: 4, anti_air: 4, evasion: 2 },
                ship_ids: [651]
            },
            {
                addition: { fire_power: 3, evasion: 2 },
                ship_ids: [651],
                required_improvement: 4
            },
            {
                addition: { fire_power: 3, anti_air: 2, evasion: 2 },
                ship_ids: [656]
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_ids: [656],
                required_improvement: 4
            },
            {
                addition: { fire_power: 3, evasion: 3 },
                ship_ids: [651, 656],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 3, evasion: 3 },
                ship_ids: [651, 656],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [399],
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 2 },
                ship_class_names: ["Town"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Town"],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Town"],
                required_improvement: 5
            }
        ]
    },
    {
        ids: [400], // 533mm 三連装魚雷(53-39型)
        bonuses: [
            {
                addition: { fire_power: 1, torpedo_power: 8, armor: 1, evasion: 2 },
                ship_ids: [147]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [147],
                requires_synergy_equip_id: [282],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 8, armor: 1, evasion: 2 },
                ship_country_ids: [Country.USSR]
            },
            {
                addition: { fire_power: 2 },
                ship_country_ids: [Country.USSR],
                requires_synergy_equip_id: [282],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [407], // 15.2cm連装砲改二
        bonuses: [
            {
                addition: { fire_power: 4, anti_air: 2, evasion: 1 },
                ship_ids: [662, 663, 668]
            },
            {
                addition: { fire_power: 2, torpedo_power: 2, evasion: 2 },
                ship_ids: [662, 663, 668],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 3 },
                ship_ids: [662, 663, 668],
                requires_air_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [408],
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 2, los: 2 },
                ship_base_ids: [621]
            },
            {
                addition: { fire_power: 1, asw: 1, evasion: 1, los: 1 },
                ship_base_ids: [161]
            },
            {
                addition: { fire_power: 1, evasion: -5, los: 1 },
                ship_type_ids: ["DD"]
            }
        ]
    },
    {
        ids: [409],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_base_ids: [621]
            },
            {
                addition: { fire_power: 1, anti_air: 1, asw: 1, evasion: 2 },
                ship_base_ids: [161]
            }
        ]
    },
    {
        ids: [411],
        bonuses: [
            {
                addition: { evasion: -9 },
                ship_type_ids: ["DD"]
            },
            {
                addition: { evasion: -7 },
                ship_type_ids: ["CL", "CLT"]
            },
            {
                addition: { evasion: -6 },
                ship_type_ids: ["CT"]
            },
            {
                addition: { evasion: -5 },
                ship_type_ids: ["CA", "CAV"]
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [593],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, anti_air: 4 },
                ship_ids: [151, 411, 412, 593, 954],
                stack_limit: 1
            },
            {
                addition: { fire_power: 4, anti_air: 2 },
                ship_ids: [694],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_ids: [541, 553, 554, 573],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [151, 411, 412, 541, 553, 554, 573, 593, 954],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [151, 411, 412, 541, 553, 554, 573, 593, 954],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [694],
                required_improvement: 5,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_ids: [694],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [412], // 水雷戦隊 熟練見張員
        bonuses: [
            {
                addition: { fire_power: 2, torpedo_power: 4, asw: 2 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu", "Hubuki", "Asashio", "Shimakaze", "Shiratsuyu", "Mutsuki", "Kagerou", "Yuugumo", "Akizuki", "Kamikaze", "Matsu"],
                stack_limit: 1
            },
            {
                addition: { evasion: 3, los: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu", "Hubuki", "Asashio", "Shimakaze", "Shiratsuyu", "Mutsuki", "Kagerou", "Yuugumo", "Akizuki", "Kamikaze", "Matsu"]
            },
            {
                addition: { fire_power: 3, torpedo_power: 3 },
                ship_class_names: ["Kuma", "Sendai", "Nagara", "Tenryuu", "Yuubari", "Agano", "Ooyodo", "Katori"],
                stack_limit: 1
            },
            {
                addition: { evasion: 2, los: 3 },
                ship_class_names: ["Kuma", "Sendai", "Nagara", "Tenryuu", "Yuubari", "Agano", "Ooyodo", "Katori"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Hurutaka", "Takao", "Mogami", "Aoba", "Myoukou", "Tone"],
                stack_limit: 1
            },
            {
                addition: { evasion: 1, los: 1 },
                ship_class_names: ["Hurutaka", "Takao", "Mogami", "Aoba", "Myoukou", "Tone"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu", "Hubuki", "Asashio", "Shimakaze", "Shiratsuyu", "Mutsuki", "Kagerou", "Yuugumo", "Akizuki", "Kamikaze", "Matsu", "Kuma", "Sendai", "Nagara", "Tenryuu", "Yuubari", "Agano", "Ooyodo", "Katori"],
                stack_limit: 1,
                required_improvement: 4
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu", "Hubuki", "Asashio", "Shimakaze", "Shiratsuyu", "Mutsuki", "Kagerou", "Yuugumo", "Akizuki", "Kamikaze", "Matsu", "Kuma", "Sendai", "Nagara", "Tenryuu", "Yuubari", "Agano", "Ooyodo", "Katori"],
                stack_limit: 1,
                required_improvement: 8
            }
        ]
    },
    {
        ids: [413], // 精鋭水雷戦隊 司令部
        bonuses: [
            {
                addition: { fire_power: 2, torpedo_power: 2, evasion: 4 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu", "Hubuki", "Asashio", "Shimakaze", "Shiratsuyu", "Mutsuki", "Kagerou", "Yuugumo", "Akizuki", "Kamikaze", "Matsu"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 4, torpedo_power: 2, evasion: 2 },
                ship_class_names: ["Kuma", "Sendai", "Nagara", "Tenryuu", "Yuubari", "Agano", "Ooyodo", "Katori"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, torpedo_power: 3, evasion: 3 },
                ship_class_names: ["Yuugumo", "Akizuki"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 2, evasion: 2 },
                ship_class_names: ["Kuma", "Sendai", "Nagara", "Agano", "Ooyodo"],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1, anti_air: 2, evasion: 1 },
                ship_class_names: ["Tenryuu", "Yuubari"],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_base_ids: [23, 41, 50, 56, 138, 139, 410, 484],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 1 },
                ship_base_ids: [54, 55, 135, 422],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [543],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [159],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [414, 539],
        bonuses: [
            {
                addition: { los: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, los: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["CL", "CA"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [414],
        bonuses: [
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                addition: { los: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["CL", "CA"],
                stack_limit: 1,
                required_improvement: 3
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["CL", "CA"],
                stack_limit: 1,
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["CL", "CA"],
                stack_limit: 1,
                required_improvement: 10
            }
        ]
    },
    {
        ids: [539], // SOC Seagull 後期型(熟練)
        bonuses: [
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Brooklyn"],
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 3
            },
            {
                addition: { los: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 7
            },
            {
                addition: { anti_air: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["CL", "CA"],
                stack_limit: 1,
                required_improvement: 6
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["CL", "CA"],
                stack_limit: 1,
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["CL", "CA"],
                stack_limit: 1,
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["CL", "CA"],
                stack_limit: 1,
                required_improvement: 10
            }
        ]
    },
    {
        ids: [415],
        bonuses: [
            {
                addition: { asw: 1, los: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.USA],
                stack_limit: 1,
                required_improvement: 5
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Northampton", "Atlanta", "St_Louis", "Brooklyn", "New_Orleans"],
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Northampton", "Atlanta", "St_Louis", "Brooklyn", "New_Orleans"],
                stack_limit: 1,
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Northampton", "Atlanta", "St_Louis", "Brooklyn", "New_Orleans"],
                stack_limit: 1,
                required_improvement: 8
            }
        ]
    },
    {
        ids: [195],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [419],
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            }
        ]
    },
    {
        ids: [420],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 3,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 7,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 8,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 9,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 10,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 3,
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Essex"]
            },
            {
                addition: { fire_power: -1 },
                ship_class_names: ["Ark_Royal"]
            },
            {
                addition: { fire_power: -2, evasion: -1, armor: -2 },
                ship_type_ids: ["CVL"]
            }
        ]
    },
    {
        ids: [421],
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 5,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 6,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 7,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 8,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 9,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 10,
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 2 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 5,
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Essex"]
            },
            {
                addition: { fire_power: -1 },
                ship_class_names: ["Ark_Royal"]
            },
            {
                addition: { fire_power: -2, evasion: -1, armor: -2 },
                ship_type_ids: ["CVL"]
            }
        ]
    },
    {
        ids: [277],
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_class_names: ["Casablanca"]
            }
        ]
    },
    {
        ids: [422],
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_class_names: ["Essex"]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [707]
            }
        ]
    },
    {
        ids: [423], // Fulmar(戦闘偵察/熟練)
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2, los: 2 },
                ship_class_names: ["Ark_Royal", "Illustrious"]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2, los: 2 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1, los: 1 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [424], //Barracuda Mk.II // !
        bonuses: [
            {
                addition: { fire_power: 2, aerial_torpedo_power: 3 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [425], // Barracuda Mk.III // !
        bonuses: [
            {
                addition: { fire_power: 2, asw: 2, aerial_torpedo_power: 1, los: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { asw: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 4
            },
            {
                addition: { asw: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 7
            },
            {
                addition: { aerial_torpedo_power: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 9
            },
            {
                addition: { asw: 1 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 7
            },
            {
                addition: { asw: 1 },
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [430], // 65mm/64 単装速射砲改
        bonuses: [
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_class_names: ["Conte_di_Cavour"]
            },
            {
                addition: { anti_air: 2, evasion: 1 },
                ship_class_names: ["Vittorio_Veneto", "Maestrale", "Zara", "Aquila", "Guglielmo_Marconi", "Abruzzi", "Conte_di_Cavour", "Marcello"]
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Vittorio_Veneto", "Maestrale", "Zara", "Aquila", "Guglielmo_Marconi", "Abruzzi", "Conte_di_Cavour", "Marcello"],
                required_improvement: 2
            },
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Vittorio_Veneto", "Maestrale", "Zara", "Aquila", "Guglielmo_Marconi", "Abruzzi", "Conte_di_Cavour", "Marcello"],
                required_improvement: 4
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Vittorio_Veneto", "Maestrale", "Zara", "Aquila", "Guglielmo_Marconi", "Abruzzi", "Conte_di_Cavour", "Marcello"],
                required_improvement: 7
            },
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Vittorio_Veneto", "Maestrale", "Zara", "Aquila", "Guglielmo_Marconi", "Abruzzi", "Conte_di_Cavour", "Marcello"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [426],
        bonuses: [
            {
                addition: { fire_power: 3, evasion: 1 },
                ship_class_names: ["Conte_di_Cavour"]
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_class_names: ["Гангут"]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Conte_di_Cavour"],
                requires_synergy_equip_id: [426, 427],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Гангут"],
                requires_synergy_equip_id: [426, 427],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [428],
        bonuses: [
            {
                addition: { fire_power: 3, evasion: 1 },
                ship_class_names: ["Conte_di_Cavour"]
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_class_names: ["Гангут"]
            },
            {
                addition: { fire_power: 1, evasion: 2 },
                ship_class_names: ["Vittorio_Veneto"]
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_class_names: ["Vittorio_Veneto", "Conte_di_Cavour"],
                requires_synergy_equip_id: [428, 429],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Гангут"],
                requires_synergy_equip_id: [428, 429],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [427, 429],
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_class_names: ["Conte_di_Cavour"]
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Гангут"]
            }
        ]
    },
    {
        ids: [434, 435],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_class_names: ["Illustrious"]
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_class_names: ["Queen_Elizabeth", "Ark_Royal", "J", "Nelson", "Town", "Illustrious"]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_country_ids: [Country.USA]
            }
        ]
    },
    {
        ids: [437],
        bonuses: [
            {
                addition: { fire_power: 3, anti_air: 3, evasion: 4 },
                ship_ids: [285]
            },
            {
                addition: { fire_power: 4, anti_air: 4, evasion: 4 },
                ship_ids: [894, 899]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 3 },
                ship_ids: [196, 197]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [508, 509, 646]
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_ids: [888, 883, 553, 554]
            }
        ]
    },
    {
        ids: [271],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_ids: [508, 509, 888, 883],
                required_improvement: 4
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [508, 509, 888, 883],
                required_improvement: 6
            },
            {
                addition: { evasion: 2 },
                ship_ids: [508, 509, 888, 883],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [508, 509, 888, 883],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [438],
        bonuses: [
            {
                addition: { asw: 1, evasion: 1 },
                ship_class_names: ["Kamikaze", "Mutsuki", "Hubuki", "Ayanami", "Dairoku", "Hatsuharu", "Shiratsuyu", "Asashio", "Kagerou", "Yuugumo", "Shimakaze", "Akizuki", "Matsu"],
                stack_limit: 1
            },
            {
                addition: { asw: 1, evasion: 1 },
                ship_ids: [141, 160, 488],
                stack_limit: 1
            },
            {
                addition: { asw: 1 },
                ship_ids: [145, 363, 476, 578, 588, 667, 961],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [145, 363, 476, 578, 588, 667, 961],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { asw: 1 },
                ship_ids: [145, 363, 476, 578, 588, 667, 961],
                required_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [145, 363, 476, 578, 588, 667, 961],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { asw: 1 },
                ship_base_ids: [16, 36, 47, 122, 167, 170, 414, 458, 459],
                stack_limit: 1
            },
            {
                addition: { asw: 1, evasion: 1 },
                ship_base_ids: [43, 457, 471, 473, 585, 611],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [136],
        bonuses: [
            {
                addition: { armor: 2, evasion: 1 },
                ship_class_names: ["Vittorio_Veneto", "Maestrale", "Zara", "Aquila", "Guglielmo_Marconi", "Abruzzi", "Conte_di_Cavour", "Marcello"],
                stack_limit: 1
            },
            {
                addition: { armor: 1, evasion: 1 },
                ship_ids: [879],
                stack_limit: 1
            },
            {
                addition: { armor: 1 },
                ship_class_names: ["Vittorio_Veneto", "Maestrale", "Zara", "Aquila", "Guglielmo_Marconi", "Abruzzi", "Conte_di_Cavour", "Marcello"],
                required_improvement: 3
            },
            {
                addition: { armor: 1 },
                ship_class_names: ["Vittorio_Veneto", "Maestrale", "Zara", "Aquila", "Guglielmo_Marconi", "Abruzzi", "Conte_di_Cavour", "Marcello"],
                required_improvement: 6
            },
            {
                addition: { armor: 1 },
                ship_class_names: ["Vittorio_Veneto", "Maestrale", "Zara", "Aquila", "Guglielmo_Marconi", "Abruzzi", "Conte_di_Cavour", "Marcello"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [439],
        bonuses: [
            {
                addition: { asw: 1, evasion: 1 },
                ship_type_ids: ["DE", "DD", "CL", "CT"],
                stack_limit: 1
            },
            {
                addition: { asw: 1 },
                ship_type_ids: ["DE"],
                stack_limit: 1
            },
            {
                addition: { asw: 1 },
                ship_class_names: ["Matsu"],
                stack_limit: 1
            },
            {
                addition: { asw: 2 },
                ship_country_ids: [Country.USA, Country.UK],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [
            440, // 21inch艦首魚雷発射管6門(初期型)
            441, // 21inch艦首魚雷発射管6門(後期型)
        ],
        bonuses: [
            {
                addition: { torpedo_power: 2 },
                ship_class_names: ["Gato"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [
            442, // 潜水艦後部魚雷発射管4門(初期型)
            443, // 潜水艦後部魚雷発射管4門(後期型)
        ],
        bonuses: [
            {
                addition: { torpedo_power: 2 },
                ship_class_names: ["Gato"],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1, evasion: 2 },
                ship_class_names: ["Salmon"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [447],
        bonuses: [
            {
                addition: { fire_power: 1 },
                required_improvement: 2
            },
            {
                addition: { anti_air: 1 },
                required_improvement: 4
            },
            {
                addition: { asw: 1 },
                required_improvement: 6
            },
            {
                addition: { evasion: 1 },
                required_improvement: 8
            },
            {
                addition: { asw: 1 },
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, asw: 1, evasion: 2 },
                ship_class_names: ["Taiyou"]
            },
            {
                addition: { fire_power: 1, asw: 1, evasion: 1 },
                ship_base_ids: [522]
            },
            {
                addition: { fire_power: 1, asw: 2, evasion: 1 },
                ship_base_ids: [89, 184]
            },
            {
                addition: { fire_power: 1, evasion: 1, asw: 1, anti_air: 1 },
                ship_ids: [894, 899]
            }
        ]
    },
    {
        ids: [84],
        bonuses: [
            {
                addition: { anti_air: 1, evasion: 1 },
                required_improvement: 4
            },
            {
                addition: { anti_air: 1 },
                requires_air_radar: true,
                stack_limit: 1,
                required_improvement: 4
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.Germany, Country.Italia],
                required_improvement: 4
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                required_improvement: 7
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                required_improvement: 10
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Germany, Country.Italia],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [70],
        bonuses: [
            {
                addition: { fire_power: 1, asw: 1 },
                ship_base_ids: [900]
            }
        ]
    },
    {
        ids: [346],
        bonuses: [
            {
                addition: { evasion: 1, asw: 1 },
                ship_base_ids: [900],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [347],
        bonuses: [
            {
                addition: { evasion: 2, asw: 2 },
                ship_base_ids: [900],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [451],
        bonuses: [
            {
                addition: { fire_power: 1, asw: 2 },
                ship_base_ids: [161]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [166],
                required_improvement: 1
            },
            {
                addition: { asw: 1 },
                ship_ids: [166],
                required_improvement: 3
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [166],
                required_improvement: 5
            },
            {
                addition: { asw: 1 },
                ship_ids: [166],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [166],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, asw: 3 },
                ship_base_ids: [900, 943]
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [900, 943],
                required_improvement: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 2
            },
            {
                addition: { asw: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 6
            },
            {
                addition: { asw: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [900, 943],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [455], // 試製 長12.7cm連装砲A型改四
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"]
            },
            {
                addition: { fire_power: 3, torpedo_power: 1, evasion: 2 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 4 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Hubuki"]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [486]
            },
            {
                addition: { fire_power: 1, torpedo_power: 1, asw: 1, evasion: 1 },
                ship_ids: [647]
            },
            {
                addition: { fire_power: 1, asw: 1 },
                ship_ids: [666]
            },
            {
                addition: { fire_power: 1, torpedo_power: 3 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_synergy_equip_id: [13, 125, 285],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, torpedo_power: 2 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_synergy_equip_id: [13, 125, 285],
                requires_synergy_equip_count: 2,
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hubuki"],
                requires_synergy_equip_id: [285],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [959]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [959],
                stack_limit: 2
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [959],
                stack_limit: 3
            }
        ]
    },
    {
        ids: [456], // SG レーダー(後期型)
        bonuses: [
            {
                addition: { fire_power: 3, evasion: 4, los: 4 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { shell_accuracy: 3 },
                ship_country_ids: [Country.USA],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, evasion: 2, los: 2 },
                ship_country_ids: [Country.UK, Country.Australia]
            },
            {
                addition: { shell_accuracy: 2 },
                ship_country_ids: [Country.UK, Country.Australia],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["John_C_Butler", "Fletcher"]
            },
            {
                addition: { range: 1 },
                ship_class_names: ["John_C_Butler", "Fletcher"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, evasion: 2, los: 3, range: 1, shell_accuracy: 2 },
                ship_ids: [651, 656],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [
            457, // 後期型艦首魚雷(4門)
            461, // 熟練聴音員+後期型艦首魚雷(4門)
        ],
        bonuses: [
            {
                addition: { torpedo_power: 3, evasion: 3 },
                ship_class_names: ["Sentaka"],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 2, evasion: 2 },
                ship_class_names: ["I_13", "I_47"],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1, evasion: 4 },
                ship_class_names: ["I_400"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [461], // 熟練聴音員+後期型艦首魚雷(4門)
        bonuses: [
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["Sentaka"],
                required_improvement: 2
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["I_13", "I_47", "Sentaka"],
                required_improvement: 3
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["I_400", "I_13", "I_47", "Sentaka"],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Sentaka"],
                required_improvement: 5
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["I_400", "I_13", "I_47", "Sentaka"],
                required_improvement: 6
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["I_400", "I_13", "I_47", "Sentaka"],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["I_400", "I_13", "I_47", "Sentaka"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [458], // 後期型電探&逆探+シュノーケル装備
        bonuses: [
            {
                addition: { torpedo_power: 3, evasion: 6 },
                ship_class_names: ["Sentaka"],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 3, evasion: 4 },
                ship_class_names: ["I_13", "I_47"],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 3, evasion: 3 },
                ship_class_names: ["I_400"],
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["I_400", "I_13", "I_47", "Sentaka"],
                required_improvement: 4
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["I_400", "I_13", "I_47", "Sentaka"],
                required_improvement: 6
            },
            {
                addition: { torpedo_power: 1 },
                ship_class_names: ["I_400", "I_13", "I_47", "Sentaka"],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 3
            },
            {
                addition: { torpedo_power: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 5
            },
            {
                addition: { shell_accuracy: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 10
            },
            {
                addition: { torpedo_power: 7, shell_accuracy: 5 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 2,
                requires_synergy_equip_id: [461],
                requires_synergy_equip_improvement: 4,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [465],
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 8, shell_accuracy: 2 },
                ship_ids: [916]
            },
            {
                addition: { evasion: 2, shell_accuracy: 1 },
                ship_ids: [916],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 2, shell_accuracy: 1 },
                ship_ids: [546, 911]
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                ship_ids: [546, 911],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, shell_accuracy: 2 },
                ship_class_names: ["Yamato"],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [464],
        bonuses: [
            {
                addition: { anti_air: 3, evasion: 2 },
                ship_class_names: ["Yamato"]
            },
            {
                addition: { anti_air: 2, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Yamato"],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            },
            {
                addition: { anti_air: -2, evasion: -2 },
                ship_class_names: ["Kongou", "Гангут", "Conte_di_Cavour"]
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_ids: [546, 593, 911, 916, 954]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2, shell_accuracy: 3 },
                ship_ids: [546, 593, 911, 916, 954],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [463],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Yamato"]
            },
            {
                addition: { anti_air: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Yamato"],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [546, 911, 916]
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [546, 911, 916],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [12],
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Yamato"]
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Yamato"],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [234],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Yamato"]
            },
            {
                addition: { anti_air: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Yamato"],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [128, 281],
        bonuses: [
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [546, 911, 916]
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                ship_ids: [546, 911, 916],
                requires_synergy_equip_id: [460],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 2 },
                ship_class_names: ["Yamato"],
                requires_synergy_equip_id: [142, 460],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [466],
        bonuses: [
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [112, 156, 277, 278, 279, 280, 288]
            },
            {
                addition: { fire_power: 2, evasion: 2, shell_accuracy: 1 },
                ship_ids: [461, 462, 466, 467]
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [196, 197, 594, 599, 610, 646, 698]
            }
        ]
    },
    {
        ids: [467],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 2 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1, shell_accuracy: 2 },
                ship_country_ids: [Country.USA],
                requires_synergy_equip_id: [279, 307, 315, 456],
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_country_ids: [Country.USA],
                requires_synergy_equip_id: [278, 279],
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 1 },
                ship_class_names: ["Iowa", "Colorado", "South_Dakota", "North_Carolina", "Nevada"]
            }
        ]
    },
    {
        ids: [247],
        bonuses: [
            {
                addition: { fire_power: 2, shell_accuracy: 2 },
                ship_country_ids: [Country.France]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 4
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            },
            {
                addition: { fire_power: 2, evasion: 2, shell_accuracy: 2 },
                ship_class_names: ["Richelieu"],
                requires_synergy_equip_id: [245, 246, 468]
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 9
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            }
        ]
    },
    {
        ids: [245, 246],
        bonuses: [
            {
                addition: { fire_power: 2, shell_accuracy: 1 },
                ship_class_names: ["Richelieu"]
            }
        ]
    },
    {
        ids: [468],
        bonuses: [
            {
                addition: { fire_power: 3, shell_accuracy: 1 },
                ship_class_names: ["Richelieu"]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                required_improvement: 4
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Richelieu"],
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [
            470, // 12.7cm連装砲C型改三
            529, // 12.7cm連装砲C型改三H
        ],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Asashio", "Shiratsuyu"]
            },
            {
                addition: { fire_power: 1, evasion: 1, torpedo_power: 3, shell_accuracy: 1 },
                ship_class_names: ["Asashio", "Shiratsuyu"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_class_names: ["Kagerou"]
            },
            {
                addition: { fire_power: 2, evasion: 1, torpedo_power: 3, shell_accuracy: 3 },
                ship_class_names: ["Kagerou"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { evasion: 2 },
                ship_base_ids: [20, 43, 167]
            },
            {
                addition: { fire_power: 3, shell_accuracy: 3, evasion: 2 },
                ship_ids: [961]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 2 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                stack_limit: 2
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                required_improvement: 5
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [145, 566, 567, 568, 651, 656, 670, 915, 951, 961],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [529],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [144, 145, 246, 405, 497]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [144, 145, 246, 405, 497],
                stack_limit: 2
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [144, 145, 246, 405, 497, 323, 498, 961],
                stack_limit: 3
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [144, 145, 246, 405, 497],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [144, 145, 246, 405, 497],
                required_improvement: 10
            },
            {
                addition: { fire_power: 2, anti_air: 2, shell_accuracy: 1, evasion: 1 },
                ship_ids: [323, 498, 961]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [323, 498, 961],
                stack_limit: 2
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [323, 498, 961],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [323, 498, 961],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [323, 498, 961],
                required_improvement: 10
            },
            {
                addition: { fire_power: 3, anti_air: 3, shell_accuracy: 2, evasion: 2 },
                ship_ids: [975]
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [975],
                stack_limit: 2
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [975],
                stack_limit: 3
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [975],
                required_improvement: 4
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [975],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [975],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [975],
                required_improvement: 10
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2 },
                requires_air_radar: true,
                stack_limit: 2
            },
            {
                addition: { anti_air: 2 },
                requires_air_radar: true,
                stack_limit: 3
            }
        ]
    },
    {
        ids: [471],
        bonuses: [
            {
                addition: { fire_power: 2, evasion: 2, shell_accuracy: 2 },
                ship_country_ids: [Country.France]
            },
            {
                addition: { fire_power: 2, shell_accuracy: 1 },
                ship_class_names: ["Richelieu"]
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 6
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            },
            {
                addition: { shell_accuracy: 2 },
                ship_class_names: ["Richelieu"],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                required_improvement: 7,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Richelieu"],
                required_improvement: 9,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [970],
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            }
        ]
    },
    {
        ids: [538],
        bonuses: [
            {
                addition: { fire_power: 3, evasion: 2, shell_accuracy: 2 },
                ship_country_ids: [Country.France]
            },
            {
                addition: { fire_power: 2 },
                ship_class_names: ["Richelieu"]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [969]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, anti_air: 2, evasion: 2 },
                ship_class_names: ["Commandant_Teste"]
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 3
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 4
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 5
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            },
            {
                addition: { shell_accuracy: 2 },
                ship_class_names: ["Richelieu"],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                required_improvement: 7,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Richelieu"],
                required_improvement: 8,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Richelieu"],
                required_improvement: 9,
                requires_synergy_equip_id: [468],
                requires_synergy_equip_improvement: 10
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [970],
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 7,
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 9,
                requires_synergy_equip_id: [536, 537],
                requires_synergy_equip_improvement: 1
            }
        ]
    },
    {
        ids: [472],
        bonuses: [
            {
                addition: { asw: 2 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { asw: 1 },
                ship_country_ids: [Country.UK]
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["DE"]
            },
            {
                addition: { asw: 1, evasion: 1, shell_accuracy: 1 },
                ship_ids: [920],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [227],
        bonuses: [
            {
                addition: { asw: 1 },
                required_improvement: 8
            },
            {
                addition: { asw: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [132],
        bonuses: [
            {
                addition: { evasion: 1 },
                required_improvement: 3,
                stack_limit: 1
            },
            {
                addition: { asw: 1 },
                required_improvement: 5,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                required_improvement: 7,
                stack_limit: 1
            },
            {
                addition: { asw: 1 },
                required_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 9,
                stack_limit: 1
            },
            {
                addition: { asw: 1 },
                required_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [546, 911, 916],
                stack_limit: 1
            },
            {
                addition: { evasion: 2 },
                ship_ids: [156, 461, 462, 466, 467],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [473],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_country_ids: [Country.UK]
            }
        ]
    },
    {
        ids: [474],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.USA]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.UK]
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_country_ids: [Country.France]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [707, 930]
            }
        ]
    },
    {
        ids: [478], // 熟練甲板要員+航空整備員
        bonuses: [
            {
                addition: { fire_power: 1 },
                required_improvement: 1,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 2,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                required_improvement: 3,
                stack_limit: 1
            },
            {
                addition: { aerial_bomb_power: 1 },
                required_improvement: 4,
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1 },
                required_improvement: 5,
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                required_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 7,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                required_improvement: 9,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [483],
        bonuses: [
            {
                addition: { fire_power: 2, anti_air: 3, shell_accuracy: 1 },
                ship_class_names: ["Kongou"],
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Kongou"],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Kongou"],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 2, shell_accuracy: 1 },
                ship_class_names: ["Ise"],
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Ise"],
                required_improvement: 5,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Ise"],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Ise"],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Yamato"],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Yamato"],
                required_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_ids: [149],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, anti_air: 3, evasion: 1 },
                ship_ids: [591],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [150],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [592],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_ids: [151],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 5, evasion: 3 },
                ship_ids: [593],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 4, evasion: 2 },
                ship_ids: [954],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2 },
                ship_ids: [152],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, anti_air: 2, evasion: 1 },
                ship_ids: [694],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2 },
                ship_ids: [546, 911, 916],
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [546, 911, 916],
                required_improvement: 5,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 1 },
                ship_ids: [553, 554],
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [553, 554],
                required_improvement: 1,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [553, 554],
                required_improvement: 3,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2 },
                ship_ids: [541, 411, 412],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [573],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                ship_type_ids: ["FBB", "BB", "BBV"],
                required_improvement: 2,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["FBB", "BB", "BBV"],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["FBB", "BB", "BBV"],
                required_improvement: 7,
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                ship_type_ids: ["FBB", "BB", "BBV"],
                required_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["FBB", "BB", "BBV"],
                required_improvement: 9,
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                ship_type_ids: ["CA", "CAV"],
                required_improvement: 2,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["CA", "CAV"],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["CA", "CAV"],
                required_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_type_ids: ["CA", "CAV"],
                required_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["CA", "CAV"],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [485],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_class_names: ["Mogami"]
            },
            {
                addition: { anti_air: 2, evasion: 1, shell_accuracy: 1 },
                ship_ids: [501, 506]
            },
            {
                addition: { anti_air: 1, evasion: 1, shell_accuracy: 1 },
                ship_ids: [502, 507]
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 3
            },
            {
                addition: { anti_air: 1 },
                required_improvement: 5
            },
            {
                addition: { evasion: 1 },
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [275],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 3, evasion: 2 },
                ship_ids: [894, 899]
            },
            {
                addition: { anti_air: 3, evasion: 3 },
                ship_ids: [894, 899],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_ids: [894, 899],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1, anti_air: 1, shell_accuracy: 1 },
                ship_ids: [894, 899],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [486],
        bonuses: [
            {
                addition: { fire_power: 4, anti_air: 4, evasion: 3, shell_accuracy: 2 },
                ship_ids: [894, 899]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2, shell_accuracy: 1 },
                ship_ids: [883, 888]
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                required_improvement: 6
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                required_improvement: 8
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [487],
        bonuses: [
            {
                addition: { fire_power: 5, anti_air: 3, evasion: 2, shell_accuracy: 4 },
                ship_ids: [894, 899]
            },
            {
                addition: { fire_power: 3, anti_air: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [883, 888]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                required_improvement: 6
            },
            {
                addition: { anti_air: 1, shell_accuracy: 1 },
                required_improvement: 8
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [488], // 二式爆雷改二
        bonuses: [
            {
                addition: { asw: 1, evasion: 1 },
                ship_type_ids: ["DD"],
                ship_country_ids: [Country.Japan]
            },
            {
                addition: { asw: 1, evasion: 1 },
                ship_class_names: ["Shimushu", "Etorohu", "Hiburi", "Tei", "Ukuru"]
            },
            {
                addition: { asw: 5, evasion: 4, shell_accuracy: 2 },
                ship_ids: [145, 961]
            },
            {
                addition: { asw: 2, evasion: 1, shell_accuracy: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656]
            },
            {
                addition: { asw: 1 },
                ship_ids: [43, 235, 407, 411, 412, 419, 537, 538, 663, 668]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [145, 961],
                required_improvement: 3
            },
            {
                addition: { asw: 1 },
                ship_ids: [145, 961],
                required_improvement: 5
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [145, 961],
                required_improvement: 7
            },
            {
                addition: { evasion: 1 },
                ship_ids: [145, 961],
                required_improvement: 8
            },
            {
                addition: { asw: 1 },
                ship_ids: [145, 961],
                required_improvement: 9
            },
            {
                addition: { asw: 1 },
                ship_ids: [145, 961],
                required_improvement: 10
            },
            {
                addition: { asw: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538, 663, 668],
                required_improvement: 5
            },
            {
                addition: { evasion: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538, 663, 668],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538, 663, 668],
                required_improvement: 9
            },
            {
                addition: { asw: 1 },
                ship_ids: [228, 243, 557, 558, 651, 656, 43, 235, 407, 411, 412, 419, 537, 538, 663, 668],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [489, 491],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 1, asw: 1, shell_accuracy: 1 },
                ship_base_ids: [161, 900, 943]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 2, asw: 1, shell_accuracy: 1 },
                ship_ids: [717, 948]
            },
            {
                addition: { evasion: 1 },
                required_improvement: 3
            },
            {
                addition: { asw: 1 },
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [500, 501],
        bonuses: [
            {
                addition: { evasion: 4 },
                ship_ids: [959]
            },
            {
                addition: { evasion: 3 },
                ship_base_ids: [14, 54, 61, 471, 473, 486, 561, 562]
            },
            {
                addition: { evasion: 2 },
                ship_base_ids: [9, 37, 41, 49, 65, 67, 479, 484]
            }
        ]
    },
    {
        ids: [502],
        bonuses: [
            {
                addition: { fire_power: 5, anti_air: 4, evasion: 3 },
                ship_ids: [593]
            },
            {
                addition: { fire_power: 3, anti_air: 3, evasion: 3 },
                ship_ids: [954]
            },
            {
                addition: { fire_power: 2, anti_air: 2, evasion: 1 },
                ship_ids: [151]
            },
            {
                addition: { fire_power: 2, anti_air: 1, evasion: 1 },
                ship_ids: [591]
            },
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_ids: [149]
            },
            {
                addition: { fire_power: 1, anti_air: 1 },
                ship_ids: [592, 694]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [150, 152]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [593, 954],
                required_improvement: 1
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [593, 954],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [593, 954],
                required_improvement: 5
            },
            {
                addition: { evasion: 1 },
                ship_ids: [593, 954],
                required_improvement: 7
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [593, 954],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [593, 954],
                required_improvement: 9
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [593, 954],
                required_improvement: 10
            },
            {
                addition: { evasion: 1 },
                ship_ids: [151],
                required_improvement: 2
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [151, 591],
                required_improvement: 4
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [151, 591],
                required_improvement: 6
            },
            {
                addition: { evasion: 1 },
                ship_ids: [151, 591],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [151, 591],
                required_improvement: 10
            },
            {
                addition: { evasion: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 5
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [149, 150, 152, 592, 694],
                required_improvement: 10
            },
            {
                addition: { fire_power: 3, evasion: 4 },
                ship_ids: [593],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, evasion: 2 },
                ship_ids: [149, 151, 591, 954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [410],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [410],
                requires_synergy_equip_improvement: 7,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [410],
                requires_synergy_equip_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 2,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 4,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [151, 593, 954],
                requires_synergy_equip_id: [411],
                requires_synergy_equip_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [503], // 35.6cm連装砲改四
        bonuses: [
            {
                addition: { fire_power: 4, anti_air: 4, shell_accuracy: 2 },
                ship_ids: [593]
            },
            {
                addition: { fire_power: 4, anti_air: 3, shell_accuracy: 2 },
                ship_ids: [954]
            },
            {
                addition: { fire_power: 2, anti_air: 2, shell_accuracy: 1 },
                ship_ids: [151]
            },
            {
                addition: { fire_power: 3, anti_air: 1, shell_accuracy: 1 },
                ship_ids: [591, 592]
            },
            {
                addition: { fire_power: 2, anti_air: 1 },
                ship_ids: [149]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [150, 152]
            },
            {
                addition: { fire_power: 4, anti_air: 1, shell_accuracy: 1 },
                ship_ids: [694]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [593, 694, 954],
                required_improvement: 1
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [593, 954],
                required_improvement: 2
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [593, 954],
                required_improvement: 4
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [593, 694, 954],
                required_improvement: 6
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [593, 694, 954],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [593, 694, 954],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [151, 591, 592, 694],
                required_improvement: 2
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [151, 591, 592],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [151, 591, 592],
                required_improvement: 6
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [151, 591, 592],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [151, 591, 592],
                required_improvement: 10
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [149, 150, 152, 694],
                required_improvement: 4
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [149, 150, 152],
                required_improvement: 7
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [149, 150, 152],
                required_improvement: 10
            },
            {
                addition: { fire_power: 3, shell_accuracy: 3, evasion: 2 },
                ship_ids: [954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, shell_accuracy: 2, evasion: 1 },
                ship_ids: [151, 591, 592, 593, 694],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 4 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, shell_accuracy: 2, evasion: 2 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [591],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [954],
                requires_high_precision_radar: true,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [505],
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 2 },
                ship_type_ids: ["DD"]
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_type_ids: ["DE"]
            },
            {
                addition: { anti_air: 1, evasion: 2 },
                ship_type_ids: ["CL", "CLT", "CT"]
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_type_ids: ["CA", "CAV", "AV"]
            },
            {
                addition: { fire_power: 2, anti_air: 3, evasion: 4 },
                ship_ids: [961],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [145, 497, 656, 668, 951, 975],
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_ids: [144, 228, 242, 243, 498, 651],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 2 },
                ship_ids: [244, 245, 323],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 1, evasion: 1 },
                ship_ids: [147, 235, 407, 419, 464, 470, 557, 558, 578, 955, 960],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_ids: [981, 983],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 3 },
                ship_ids: [961],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_ids: [145, 419, 497, 656, 951, 975],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { anti_air: 1, evasion: 2 },
                ship_ids: [981, 983],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [656, 951, 961, 975],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { evasion: 1, anti_air: 1 },
                ship_ids: [986, 987]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [986, 987]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [986, 987],
                required_improvement: 8
            }
        ]
    },
    {
        ids: [506],
        bonuses: [
            {
                addition: { fire_power: 2, shell_accuracy: 3, anti_air: 2, evasion: 4 },
                ship_ids: [961],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 2, anti_air: 1, evasion: 3 },
                ship_ids: [145, 497, 557, 558, 656, 951, 975],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, anti_air: 1, evasion: 2 },
                ship_ids: [147, 235, 407, 419, 464, 470, 537, 538, 578, 955, 960],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [507, 508],
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Nevada"]
            },
            {
                addition: { fire_power: 2, evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["FBB", "BB", "BBV"]
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["FBB", "BB", "BBV"],
                requires_synergy_equip_id: [279, 307, 315, 456],
                stack_limit: 1
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Ise", "Kongou", "Husou"],
                stack_limit: 1
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 3
            },
            {
                addition: { armor: 1 },
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 9
            }
        ]
    },
    {
        ids: [508],
        bonuses: [
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_class_names: ["Nevada"],
                requires_synergy_equip_id: [507],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 2, shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                ship_type_ids: ["FBB", "BB", "BBV"],
                requires_synergy_equip_id: [507],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Ise", "Kongou", "Husou"],
                requires_synergy_equip_id: [507],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                requires_synergy_equip_id: [507],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [510],
        bonuses: [
            {
                addition: { fire_power: 2, asw: 3, evasion: 2, los: 2 },
                ship_country_ids: [Country.UK]
            },
            {
                addition: { los: 3, shell_accuracy: 2 },
                ship_class_names: ["Nelson"]
            },
            {
                addition: { fire_power: 4, evasion: 2 },
                ship_class_names: ["Nelson"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [
            511, // 21inch艦首魚雷発射管4門(初期型)
            512, // 21inch艦首魚雷発射管4門(後期型)
        ],
        bonuses: [
            {
                addition: { torpedo_power: 3, evasion: 4 },
                ship_class_names: ["Salmon"],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1, evasion: 2 },
                ship_class_names: ["Gato"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [517],
        bonuses: [
            {
                addition: { shell_accuracy: 1, evasion: 1, los: 1 },
                ship_class_names: ["Ayanami", "Dairoku", "Hatsuharu", "Hubuki", "Asashio", "Shimakaze", "Shiratsuyu", "Mutsuki", "Kagerou", "Yuugumo", "Akizuki", "Kamikaze", "Matsu", "Shimushu", "Etorohu", "Hiburi", "Tei", "Ukuru"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_class_names: ["Yuugumo"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, shell_accuracy: 1, evasion: 3, los: 2 },
                ship_ids: [960],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, evasion: 2, los: 1 },
                ship_ids: [147, 235, 407, 419, 464, 470, 578, 656, 955, 961, 975],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [981, 983],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                requires_synergy_equip_id: [267, 366],
                requires_synergy_equip_improvement: 3,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_class_names: ["Yuugumo"],
                requires_synergy_equip_id: [267, 366],
                requires_synergy_equip_improvement: 3,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, anti_air: 4, evasion: 3 },
                requires_synergy_equip_id: [450],
                requires_synergy_equip_improvement: 4,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 7,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                required_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 9,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [85],
        bonuses: [
            {
                addition: { anti_air: 1, evasion: 1 },
                required_improvement: 6
            },
            {
                addition: { anti_air: 2 },
                required_improvement: 6,
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 8
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.Germany, Country.Italia],
                required_improvement: 8
            },
            {
                addition: { evasion: 1, shell_accuracy: 1 },
                required_improvement: 10
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Germany, Country.Italia],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [519], // SJレーダー+潜水艦司令塔装備
        bonuses: [
            {
                addition: { shell_accuracy: 2, evasion: 2 },
                ship_class_names: ["Salmon"],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1, shell_accuracy: 2, evasion: 2 },
                ship_class_names: ["Gato"],
                stack_limit: 1
            }
        ]
    },
    {
        ids: [520], // 試製20.3cm(4号)連装砲
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Hurutaka", "Aoba"]
            },
            {
                addition: { fire_power: 2, evasion: 1 },
                ship_class_names: ["Takao", "Myoukou"]
            },
            {
                addition: { fire_power: 3, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Mogami", "Tone"]
            },
            {
                addition: { fire_power: 2 },
                ship_class_names: ["Mogami", "Tone"],
                stack_limit: 2
            },
            {
                addition: { fire_power: 2 },
                ship_class_names: ["Mogami", "Tone"],
                stack_limit: 3
            },
            {
                addition: { fire_power: 2, torpedo_power: 2, evasion: 1, shell_accuracy: 1 },
                ship_class_names: ["Hurutaka", "Aoba"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 3, torpedo_power: 2, evasion: 2, shell_accuracy: 1 },
                ship_class_names: ["Takao", "Mogami", "Myoukou", "Tone"],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 4, evasion: 4, shell_accuracy: 1 },
                ship_class_names: ["Hurutaka", "Takao", "Mogami", "Aoba", "Myoukou", "Tone"],
                requires_synergy_equip_id: [10, 66, 71, 130, 220, 275, 464],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [265, 269, 319],
                stack_limit: 2
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [265, 269, 319],
                stack_limit: 3
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507]
            },
            {
                addition: { fire_power: 1, evasion: 1, shell_accuracy: 2 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, anti_air: 3, evasion: 2, shell_accuracy: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                requires_synergy_equip_id: [30, 410],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, anti_air: 3, evasion: 2, shell_accuracy: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                requires_synergy_equip_id: [410],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [265, 269, 319, 502]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 2, anti_air: 1 },
                ship_ids: [507]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [501, 502, 503, 504, 506, 507],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [521], // 紫雲(熟練)
        bonuses: [
            {
                addition: { fire_power: 1, evasion: 2, los: 2 },
                ship_class_names: ["Ooyodo"]
            },
            {
                addition: { fire_power: 3, evasion: 1, los: 2 },
                ship_ids: [507]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, los: 2, evasion: 2 },
                ship_ids: [183]
            },
            {
                addition: { fire_power: 2, shell_accuracy: 2, los: 3, evasion: 3 },
                ship_ids: [321]
            },
            {
                addition: { fire_power: 3, anti_air: 1, shell_accuracy: 3, los: 2, evasion: 2 },
                ship_ids: [507]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Ooyodo"],
                required_improvement: 1
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Ooyodo"],
                required_improvement: 2
            },
            {
                addition: { los: 1, torpedo_power: 1 },
                ship_class_names: ["Ooyodo"],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ooyodo"],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Ooyodo"],
                required_improvement: 6
            },
            {
                addition: { los: 1 },
                ship_class_names: ["Ooyodo"],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Ooyodo"],
                required_improvement: 10
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [507],
                required_improvement: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [507],
                required_improvement: 2
            },
            {
                addition: { los: 1, torpedo_power: 1 },
                ship_ids: [507],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [507],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [507],
                required_improvement: 6
            },
            {
                addition: { los: 1 },
                ship_ids: [507],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [507],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [
            522, // 零式小型水上機
            523, // 零式小型水上機(熟練)
        ],
        bonuses: [
            {
                addition: { torpedo_power: 1, evasion: 5, shell_accuracy: 1, los: 3 },
                ship_type_ids: ["SSV"]
            },
            {
                addition: { torpedo_power: 1 },
                ship_type_ids: ["SSV"],
                required_improvement: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_type_ids: ["SSV"],
                required_improvement: 2
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["SSV"],
                required_improvement: 3
            },
            {
                addition: { los: 1 },
                ship_type_ids: ["SSV"],
                required_improvement: 5
            },
            {
                addition: { shell_accuracy: 1 },
                ship_type_ids: ["SSV"],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["SSV"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [523], // 零式小型水上機(熟練)
        bonuses: [
            {
                addition: { torpedo_power: 2, aerial_bomb_power: 2, evasion: 1, shell_accuracy: 1, los: 1 },
                ship_type_ids: ["SSV"]
            }
        ]
    },
    {
        ids: [524], // 12cm単装高角砲+25mm機銃増備
        bonuses: [
            {
                addition: { fire_power: 1, anti_air: 2, evasion: 2, shell_accuracy: 1 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"]
            },
            {
                addition: { anti_air: 2, evasion: 2 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"],
                requires_air_radar: true,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"],
                required_improvement: 1
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"],
                required_improvement: 2
            },
            {
                addition: { anti_air: 1 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"],
                required_improvement: 4
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"],
                required_improvement: 7
            },
            {
                addition: { anti_air: 1 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["LHA", "AR", "AS", "CT", "AO"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [
            525, // 特四式内火艇
            526, // 特四式内火艇改
        ],
        bonuses: [
            {
                addition: { fire_power: 1, torpedo_power: 2, evasion: -1 },
                ship_type_ids: ["SS", "SSV"]
            },
            {
                addition: { fire_power: 2, torpedo_power: 1, shell_accuracy: 2 },
                ship_base_ids: [971, 972],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 3
            },
            {
                addition: { shell_accuracy: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 6
            },
            {
                addition: { torpedo_power: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [526], // 特四式内火艇改
        bonuses: [
            {
                addition: { fire_power: 1, torpedo_power: 1, shell_accuracy: 1 },
                ship_type_ids: ["SS", "SSV"]
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 2
            },
            {
                addition: { torpedo_power: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 4
            },
            {
                addition: { fire_power: 1 },
                ship_type_ids: ["SS", "SSV"],
                required_improvement: 8
            }
        ]
    },
    {
        ids: [527],
        bonuses: [
            {
                addition: { anti_air: 2, shell_accuracy: 1, evasion: 1, los: 2 },
                ship_country_ids: [Country.UK],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_class_names: ["Nelson"],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Queen_Elizabeth"],
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 2,
                stack_limit: 1
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 4,
                stack_limit: 1
            },
            {
                addition: { anti_air: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 7,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 10,
                stack_limit: 1
            }
        ]
    },
    {
        ids: [528],
        bonuses: [
            {
                addition: { fire_power: 1, shell_accuracy: 2, evasion: 1 },
                ship_country_ids: [Country.UK]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_class_names: ["Town"]
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 2
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 4
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.UK],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [76, 114],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Germany]
            }
        ]
    },
    {
        ids: [114],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8
            },
            {
                addition: { armor: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [123],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 5
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [124],
        bonuses: [
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.Germany],
                requires_synergy_equip_id: [76, 114, 123]
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8,
                requires_synergy_equip_id: [123]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10,
                requires_synergy_equip_id: [123]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.Italia],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1 },
                ship_country_ids: [Country.Italia],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Italia],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [252],
        bonuses: [
            {
                addition: { evasion: 1 },
                ship_class_names: ["Ark_Royal", "Illustrious"],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Ark_Royal", "Illustrious"],
                required_improvement: 6
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ark_Royal", "Illustrious"],
                required_improvement: 7
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Ark_Royal", "Illustrious"],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Ark_Royal", "Illustrious"],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Ark_Royal", "Illustrious"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [530], // 35.6cm連装砲改三丙
        bonuses: [
            {
                addition: { fire_power: 2 },
                ship_ids: [149, 150, 151, 152, 593]
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [591, 954]
            },
            {
                addition: { fire_power: 4 },
                ship_ids: [592, 694]
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [149, 150, 151, 152]
            },
            {
                addition: { anti_air: 2 },
                ship_ids: [591, 592, 694, 954]
            },
            {
                addition: { anti_air: 3 },
                ship_ids: [593]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 2 },
                ship_ids: [592, 694]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [592, 694],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [592, 694],
                required_improvement: 4
            },
            {
                addition: { armor: 1 },
                ship_ids: [592, 694],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [592, 694],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [592, 694],
                required_improvement: 8
            },
            {
                addition: { armor: 1 },
                ship_ids: [592, 694],
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [592, 694],
                required_improvement: 10
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [150, 152, 591, 954]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 2
            },
            {
                addition: { armor: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 6
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [150, 152, 591, 954],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [149, 151, 593],
                required_improvement: 4
            },
            {
                addition: { armor: 1 },
                ship_ids: [149, 151, 593],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [149, 151, 593],
                required_improvement: 10
            },
            {
                addition: { fire_power: 3, shell_accuracy: 3, evasion: 3 },
                ship_ids: [592, 694],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 2 },
                ship_ids: [592, 694],
                stack_limit: 2
            },
            {
                addition: { shell_accuracy: 2 },
                ship_ids: [592, 694],
                stack_limit: 3
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [694],
                stack_limit: 3
            },
            {
                addition: { shell_accuracy: 2 },
                ship_ids: [592, 694],
                stack_limit: 4
            },
            {
                addition: { fire_power: 2, shell_accuracy: 2, evasion: 2 },
                ship_ids: [149, 150, 151, 152, 591, 593, 954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 4 },
                ship_ids: [694],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [152, 591, 592],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [150, 954],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [149, 151, 593],
                requires_surface_radar: true,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [149, 150, 151, 152, 591, 592, 593, 694, 954],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 6 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                stack_limit: 1
            },
            {
                addition: { torpedo_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 6,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 8,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_synergy_equip_id: [174],
                requires_synergy_equip_improvement: 10,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2, torpedo_power: 2, shell_accuracy: 2, evasion: 3 },
                ship_ids: [591, 592, 593, 694, 954],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [591, 592],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [593, 954],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                addition: { fire_power: 3 },
                ship_ids: [694],
                requires_high_precision_radar: true,
                stack_limit: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [591, 592, 593, 694, 954],
                stack_limit: 2
            }
        ]
    },
    {
        ids: [130],
        bonuses: [
            {
                addition: { anti_air: 1 },
                ship_ids: [428],
                required_improvement: 1
            },
            {
                addition: { evasion: 1 },
                ship_ids: [428],
                required_improvement: 3
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [428],
                required_improvement: 5
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [428],
                required_improvement: 7
            },
            {
                addition: { evasion: 1 },
                ship_ids: [428],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [428],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [428],
                required_improvement: 10
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [141],
                required_improvement: 2
            },
            {
                addition: { evasion: 1 },
                ship_ids: [141],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [141],
                required_improvement: 6
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [141],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_ids: [141],
                required_improvement: 10
            },
            {
                addition: { anti_air: 1 },
                ship_type_ids: ["DE"],
                required_improvement: 3
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["DE"],
                required_improvement: 6
            },
            {
                addition: { anti_air: 1 },
                ship_type_ids: ["DE"],
                required_improvement: 9
            },
            {
                addition: { evasion: 1 },
                ship_type_ids: ["DE"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [531],
        bonuses: [
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 4
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 5
            },
            {
                addition: { evasion: 1 },
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 10
            }
        ]
    },
    {
        ids: [533],
        bonuses: [
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 6
            },
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 10
            },
            {
                addition: { evasion: 1 },
                ship_ids: [968],
                required_improvement: 1
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [968],
                required_improvement: 3
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [968],
                required_improvement: 5
            },
            {
                addition: { evasion: 1 },
                ship_ids: [968],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [968],
                required_improvement: 9
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [981, 983],
                required_improvement: 4
            },
            {
                addition: { evasion: 1 },
                ship_ids: [981, 983],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [981, 983],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [981, 983],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [534, 535],
        bonuses: [
            {
                addition: { fire_power: 2, shell_accuracy: 1 },
                ship_country_ids: [Country.France]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Mogador"]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [967],
                requires_synergy_equip_id: [535]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 6
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [535],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 9
            }
        ]
    },
    {
        ids: [536, 537],
        bonuses: [
            {
                addition: { fire_power: 2, shell_accuracy: 1 },
                ship_country_ids: [Country.France]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["La_Galissonnière"]
            },
            {
                addition: { fire_power: 1, evasion: 2, shell_accuracy: 1 },
                ship_ids: [970],
                requires_synergy_equip_id: [537]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 6
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [537],
        bonuses: [
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 5
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.France],
                required_improvement: 8
            }
        ]
    },
    {
        ids: [540],
        bonuses: [
            {
                addition: { evasion: 1, los: 1 },
                ship_ids: [546, 662, 663, 668, 911, 916]
            },
            {
                addition: { shell_accuracy: 1, evasion: 1, los: 1 },
                ship_ids: [73, 121, 188, 189, 503, 504, 506]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, evasion: 1, los: 1 },
                ship_ids: [200, 487, 488, 501, 502, 507]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, anti_air: 2, evasion: 2, los: 2 },
                ship_base_ids: [102, 103, 445, 581]
            },
            {
                addition: { fire_power: 2, shell_accuracy: 1, anti_air: 2, evasion: 2, los: 2 },
                ship_base_ids: [162, 451]
            }
        ]
    },
    {
        ids: [541, 542],
        bonuses: [
            {
                addition: { fire_power: 3, shell_accuracy: 2, anti_air: 1, evasion: 2, los: 1 },
                ship_base_ids: [966]
            },
            {
                addition: { fire_power: 2, shell_accuracy: 1, anti_air: 1, evasion: 1, los: 1 },
                ship_base_ids: [433]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [603, 931]
            }
        ]
    },
    {
        ids: [541],
        bonuses: [
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [542],
        bonuses: [
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [543, 544],
        bonuses: [
            {
                addition: { fire_power: 4, shell_accuracy: 2, anti_air: 1, evasion: 2, los: 2 },
                ship_base_ids: [966]
            },
            {
                addition: { fire_power: 2, shell_accuracy: 1, anti_air: 1, evasion: 1, los: 1 },
                ship_base_ids: [433]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [603, 931]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_base_ids: [544, 925]
            }
        ]
    },
    {
        ids: [543],
        bonuses: [
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            },
            {
                addition: { los: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [544],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 8
            },
            {
                addition: { anti_air: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.USA],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [545],
        bonuses: [
            {
                addition: { fire_power: 4 },
                ship_base_ids: [110],
                stack_limit: 1
            },
            {
                addition: { fire_power: 3 },
                ship_base_ids: [111],
                stack_limit: 1
            },
            {
                addition: { fire_power: 2 },
                ship_base_ids: [83],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [84, 153],
                stack_limit: 1
            },
            {
                addition: { fire_power: 1, shell_accuracy: 2, evasion: 1, los: 2 },
                ship_ids: [461, 466]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, los: 1 },
                ship_ids: [462, 467, 646]
            },
            {
                addition: { shell_accuracy: 1, los: 1 },
                ship_ids: [156, 599, 610]
            }
        ]
    },
    {
        ids: [549],
        bonuses: [
            {
                addition: { fire_power: 2, shell_accuracy: 1, evasion: 1, asw: 4 },
                ship_base_ids: [161, 900, 943]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, asw: 1 },
                ship_class_names: ["Houshou", "Taiyou"]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 3
            },
            {
                addition: { shell_accuracy: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 4
            },
            {
                addition: { asw: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 5
            },
            {
                addition: { evasion: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 6
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 8
            },
            {
                addition: { asw: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [161, 900, 943],
                required_improvement: 10
            },
            {
                addition: { asw: 1 },
                ship_class_names: ["Houshou", "Taiyou"],
                required_improvement: 4
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Houshou", "Taiyou"],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Houshou", "Taiyou"],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Houshou", "Taiyou"],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [550],
        bonuses: [
            {
                addition: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [89, 116],
                required_improvement: 7
            },
            {
                addition: { evasion: 1 },
                ship_base_ids: [89, 116],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                ship_base_ids: [89, 116],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [89, 116],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            }
        ]
    },
    {
        ids: [551],
        bonuses: [
            {
                addition: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                addition: { fire_power: 2, shell_accuracy: 1, evasion: 2 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [552],
        bonuses: [
            {
                addition: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            },
            {
                addition: { fire_power: 2, shell_accuracy: 3, evasion: 3 },
                ship_ids: [883, 899]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [883, 899],
                required_improvement: 3
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [883, 899],
                required_improvement: 6
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [883, 899],
                required_improvement: 7
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [883, 899],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_ids: [883, 899],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [883, 899],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, shell_accuracy: 2, evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888]
            },
            {
                addition: { evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [557],
        bonuses: [
            {
                addition: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            },
            {
                addition: { fire_power: 2, shell_accuracy: 3, evasion: 3 },
                ship_ids: [883, 899]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [883, 899],
                required_improvement: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [883, 899],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1, shell_accuracy: 2, evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888]
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 2
            }
        ]
    },
    {
        ids: [558],
        bonuses: [
            {
                addition: { shell_accuracy: 1, evasion: 1 },
                ship_base_ids: [89, 116]
            },
            {
                addition: { fire_power: 1, evasion: 1 },
                ship_ids: [116, 117, 285, 318, 555, 560, 883, 888, 894, 899]
            },
            {
                addition: { fire_power: 2, shell_accuracy: 3, evasion: 3 },
                ship_ids: [883, 899]
            },
            {
                addition: { fire_power: 2 },
                ship_ids: [883, 899],
                required_improvement: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [883, 899],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1, shell_accuracy: 2, evasion: 1 },
                ship_ids: [555, 560, 599, 610, 888]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 1
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [555, 560, 599, 610, 888],
                required_improvement: 2
            }
        ]
    },
    {
        ids: [258],
        bonuses: [
            {
                addition: { shell_accuracy: 1, evasion: 1 },
                required_improvement: 2
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, evasion: 1 },
                ship_ids: [156, 599, 610, 883, 899],
                required_improvement: 2
            }
        ]
    },
    {
        ids: [553],
        bonuses: [
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 6
            },
            {
                addition: { anti_air: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_class_names: ["Akizuki"],
                required_improvement: 10
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [981, 983],
                required_improvement: 2
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [981, 983],
                required_improvement: 4
            },
            {
                addition: { shell_accuracy: 1 },
                ship_ids: [981, 983],
                required_improvement: 6
            },
            {
                addition: { anti_air: 1 },
                ship_ids: [981, 983],
                required_improvement: 8
            },
            {
                addition: { evasion: 1 },
                ship_ids: [981, 983],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [554],
        bonuses: [
            {
                addition: { fire_power: 1 },
                required_improvement: 2
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 4
            },
            {
                addition: { asw: 1 },
                required_improvement: 6
            },
            {
                addition: { fire_power: 1 },
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 10
            },
            {
                addition: { fire_power: 1, evasion: 1, asw: 1 },
                ship_type_ids: ["CVL"]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_ids: [117, 285, 318, 555, 560, 883, 888, 894]
            },
            {
                addition: { fire_power: 1 },
                ship_ids: [894]
            },
            {
                addition: { shell_accuracy: 1, evasion: 1, asw: 1 },
                ship_class_names: ["Houshou", "Taiyou"]
            },
            {
                addition: { fire_power: 3, shell_accuracy: 2, evasion: 1, asw: 3 },
                requires_synergy_equip_id: [402]
            }
        ]
    },
    {
        ids: [555],
        bonuses: [
            {
                addition: { fire_power: 1 },
                required_improvement: 3
            },
            {
                addition: { shell_accuracy: 1 },
                required_improvement: 7
            },
            {
                addition: { evasion: 1 },
                required_improvement: 10
            },
            {
                addition: { fire_power: 2, shell_accuracy: 1, asw: 1 },
                ship_base_ids: [1001]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, anti_air: 3, evasion: 2 },
                ship_base_ids: [1001],
                requires_synergy_equip_id: [556]
            },
            {
                addition: { fire_power: 1, evasion: 2, asw: 1 },
                ship_base_ids: [1001],
                requires_synergy_equip_id: [402]
            }
        ]
    },
    {
        ids: [556],
        bonuses: [
            {
                addition: { fire_power: 1, shell_accuracy: 1, evasion: 1, anti_air: 3 },
                ship_base_ids: [511, 1001]
            }
        ]
    },
    {
        ids: [64],
        bonuses: [
            {
                addition: { fire_power: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                addition: { shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                addition: { anti_air: 1, fire_power: 1, shell_accuracy: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            },
            {
                addition: { fire_power: 1 },
                ship_base_ids: [83, 534],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1 },
                ship_base_ids: [83, 534],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [559],
        bonuses: [
            {
                addition: { fire_power: 8, shell_accuracy: 6, anti_air: 1, evasion: 2 },
                ship_country_ids: [Country.Germany]
            },
            {
                addition: { fire_power: 3, shell_accuracy: 2, evasion: 1 },
                ship_base_ids: [83, 534]
            }
        ]
    },
    {
        ids: [158],
        bonuses: [
            {
                addition: { anti_air: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 7
            },
            {
                addition: { evasion: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 8
            },
            {
                addition: { shell_accuracy: 1, anti_air: 1, evasion: 1 },
                ship_country_ids: [Country.Germany],
                required_improvement: 9
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, anti_air: 1, evasion: 2 },
                ship_country_ids: [Country.Germany],
                required_improvement: 10
            },
            {
                addition: { anti_air: 1, evasion: 1 },
                ship_base_ids: [83, 534],
                required_improvement: 9
            },
            {
                addition: { shell_accuracy: 1, anti_air: 1, evasion: 1 },
                ship_base_ids: [83, 534],
                required_improvement: 10
            }
        ]
    },
    {
        ids: [560],
        bonuses: [
            {
                addition: { fire_power: 3, shell_accuracy: 3, anti_air: 4, evasion: 5 },
                ship_country_ids: [Country.Germany]
            },
            {
                addition: { fire_power: 1, shell_accuracy: 1, anti_air: 2, evasion: 3 },
                ship_base_ids: [83, 534]
            }
        ]
    }
];