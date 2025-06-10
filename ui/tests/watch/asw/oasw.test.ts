import { evaluateCanOASW } from "@/logics/asw/OASW/evaluate";
import { brandEquipId } from "@/types/brands/equip";
import { brandShipId } from "@/types/brands/ship";
import { make_equip_from_id, make_ship_from_id_equips } from "tests/setup";
import { describe, expect, it } from "vitest"

describe('対潜系テスト', () => {
    it('先制対潜判定チェック', () => {
        /** 三式水中探信儀 */
        const SANSHIKI_SONAR = make_equip_from_id(brandEquipId(47));

        const MUTSUKI = make_ship_from_id_equips(brandShipId(1), [SANSHIKI_SONAR]);

        expect(false).toBe(evaluateCanOASW(MUTSUKI));
        
    });
});