import { PLAYER_SHIP_CLASS, PlayerShipClass, PlayerShipClassId } from "@/types/ship/ship_class";
import { Country } from "../equip/bonus"

type CountryOriginalDatas = Record<Country, PlayerShipClassId[]>;

const COUNTRY_ORIGINAL_DATAS: CountryOriginalDatas = {
	[Country.Japan]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,43,44,45,46,49,50,51,52,53,54,56,59,60,62,66,71,72,74,75,76,77,85,86,90,94,97,100,101,103,104,109,111,115,117,119,120,123,126,127],
	[Country.Germany]: [47,48,55,57,63],
	[Country.Italia]: [58,61,64,68,80,92,113,124],
    [Country.USA]: [65,69,83,84,87,91,93,95,99,102,105,106,107,110,114,116,118,121,122,125],
    [Country.UK]: [67,78,82,88,108,112],
    [Country.France]: [70,79,128,129],
    [Country.USSR]: [73,81],
    [Country.Sweden]: [89],
    [Country.Australia]: [96],
    [Country.Netherlands]: [98]
};

export type CountryDatas = Record<PlayerShipClass, Country>

// 逆引きMapを作ってアクセスしやすくする
/**
 * 
 */
export const COUNTRY_DATAS: CountryDatas = (() => {
    const map: Partial<CountryDatas> = {};

    // PlayerShipClassIdからPlayerShipClassへの逆マッピングを作成
    const idToClassMap: Record<PlayerShipClassId, PlayerShipClass> = {} as Record<PlayerShipClassId, PlayerShipClass>;
    for (const [shipClass, id] of Object.entries(PLAYER_SHIP_CLASS)) {
        idToClassMap[id as PlayerShipClassId] = shipClass as PlayerShipClass;
    }

    // 安全にCountry型に変換する
    for (const countryStr of Object.keys(COUNTRY_ORIGINAL_DATAS)) {
        const country = Number(countryStr) as Country;
        if (country in COUNTRY_ORIGINAL_DATAS) {
            for (const shipClassId of COUNTRY_ORIGINAL_DATAS[country]) {
                const shipClass = idToClassMap[shipClassId];
                if (shipClass) {
                    map[shipClass] = country;
                }
            }
        }
    }

    return map as CountryDatas;
})();