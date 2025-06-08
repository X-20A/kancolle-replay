import { DeepReadonly } from "@/types";

export const enum LandBasedPlaneType {
    LAND_BASED_BOMBER = 47,
    INTERCEPTOR = 48,
    LAND_BASED_SCOUT = 49,
    LAND_BASED_BOMBER_L = 53,
}

/**
 * 装備種別ごとの諸元
 */
export type LandBasedPlaneTypeData = {
    label: string,
    icon: number,
    is_torpedo_bomber?: true,
    can_contact?: true,
    is_dive_bomber?: true,
}

export type EquipTypeDatas = DeepReadonly<Record<LandBasedPlaneType, LandBasedPlaneTypeData>>;

export const LAND_BASED_PLANE_TYPE_DATAS: EquipTypeDatas = {
    [LandBasedPlaneType.LAND_BASED_BOMBER]: {
        label: 'Misc',
        icon: 37,
        is_dive_bomber: true,
        is_torpedo_bomber: true,
    },
    [LandBasedPlaneType.INTERCEPTOR]: {
        label: 'Misc',
        icon: 38,
    },
    [LandBasedPlaneType.LAND_BASED_SCOUT]: {
        label: 'Misc',
        icon: 9,
        can_contact: true,
    },
    [LandBasedPlaneType.LAND_BASED_BOMBER_L]: {
        label: 'Misc',
        icon: 49,
        is_dive_bomber: true,
        is_torpedo_bomber: true,
    },
}