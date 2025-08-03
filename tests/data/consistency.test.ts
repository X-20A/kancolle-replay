import { ABYSSAL_SHIP_DATAS } from "@/datas/ship/abyssal";
import { DeepReadonly } from "@/types";
import { AbyssalShipData } from "@/types/ship/abyssal";
import { describe, it } from "vitest"

describe('データ系', () => {
    it('data-test: 集積地は install_type: SupplyDepot か is_float_Supply_Depot: true いずれかをもつ', () => {
        const supply_depot_datas: DeepReadonly<AbyssalShipData>[] =
            Object.values(ABYSSAL_SHIP_DATAS).flatMap(data => {
                return data.name_jp.includes('集積地')
                    ? data
                    : [];
            });

        supply_depot_datas.forEach(data => {
            if (
                data.install_type !== undefined &&
                data.install_type !== 'SupplyDepotModel'
            ) throw new Error('install_typeが不正です');

            if (
                data.is_float_Supply_Depot !== undefined &&
                data.install_type !== undefined
            ) throw new Error(
                'install_type: SupplyDepot と is_float_Supply_Depot: trueはいずれかのみ指定可能です'
            );

            if (
                data.install_type === undefined &&
                data.is_float_Supply_Depot === undefined
            ) throw new Error(
                'install_type: SupplyDepot と is_float_Supply_Depot: true はいずれかが必要です'
            );
        });
    });
});