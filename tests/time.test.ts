import { sim_execute, UserSettings } from "@/core/flows/SimExecuter";
import { Rand } from "@/effects/random";
import { PlayerPlaneEquip } from "@/models/equip/basic";
import { derive_fleet } from "@/models/fleet/Fleet";
import { derive_LBAS } from "@/models/LBAS";
import { Node } from "@/models/Node";
import { brandEnemyFleet, brandOwnFleet } from "@/types/brands/fleet";
import { GFCS_RADAR, REPPUU, SAIUN, XF5U } from "tests/setups/assets/equip";
import { make_Fletcher, make_Ranger } from "tests/setups/assets/ship";
import { describe, it } from "vitest";

describe('処理時間テスト', () => {
    it('sim_execute', () => {
        const FLETCHER = make_Fletcher([GFCS_RADAR]);
        const SAIUN_RANGER = make_Ranger([SAIUN, REPPUU, XF5U]);

        const own_fleet = derive_fleet([FLETCHER, SAIUN_RANGER], []);
        const enemy_fleet = derive_fleet([FLETCHER, SAIUN_RANGER], []);

        const node: Node = {
            type: {
                is_boss: false,
                is_night_battle_only: false,
                is_air_raid_only: false,
                is_aerial_combat: false,
                is_airstrike_supported: false,
                is_ambush: false,
                is_ss_only: false,
            },
            index: 0,
            is_detection_success: false,
            engagement_type: 'Advantage_T',
            triggered_smoke_screen_type: 'Misfire',
        }

        const setting: UserSettings = {
            smoke_screen_trigger_node_index: [0],
        }

        const lbas = derive_LBAS([REPPUU as PlayerPlaneEquip]);

        const count = 100000;
        const start = performance.now();
        for (let i = 0;i < count;i++) {
            sim_execute(
                node,
                setting,
                brandOwnFleet(own_fleet),
                brandEnemyFleet(enemy_fleet),
                [lbas],
                new Rand(),
            );
        }
        console.log(`sim_execute ${count}: ${performance.now() - start}`);
    });
});