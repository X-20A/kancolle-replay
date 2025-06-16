import { analyze_fleet_detection } from "@/logics/detection";
import { derive_fleet } from "@/models/fleet/Fleet";
import { SAIUN } from "tests/setups/assets/equip";
import { make_Fletcher, make_Ranger } from "tests/setups/assets/ship";
import { describe, expect, it } from "vitest";

describe('索敵系テスト', () => {
    it('detection_power と recon_power チェック', () => {
        const FLETCHER = make_Fletcher([]);
        const Ranger = make_Ranger([]);
        const SaiunRanger = make_Ranger([SAIUN])

        const fleet_1 = analyze_fleet_detection(derive_fleet([FLETCHER]));
        const fleet_2 = analyze_fleet_detection(derive_fleet([Ranger]));
        const fleet_3 = analyze_fleet_detection(derive_fleet([FLETCHER, Ranger]));
        const fleet_4 = analyze_fleet_detection(derive_fleet([FLETCHER, SaiunRanger]));

        expect(0).toBe(fleet_1.recon_power);
        expect(-3.5).toBe(fleet_1.detection_power);
        
        expect(30).toBe(fleet_2.recon_power);
        expect(31).toBe(fleet_2.detection_power);

        expect(30).toBe(fleet_3.recon_power);
        expect(27.1).toBe(fleet_3.detection_power);

        expect(61).toBe(fleet_4.recon_power);
        expect(35.9).toBe(fleet_4.detection_power);
    });
});