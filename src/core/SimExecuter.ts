import { Rand } from "@/effects/random";
import { analyze_fleet_detection, calc_detection_success_rate, calc_shotdowned_recon_fleet } from "@/logics/detection";
import { Fleet } from "@/models/fleet/Fleet";

type DetectionPhaseResult = {
    is_detection_success: boolean,
    post_loss_our_fleet: Fleet,
}

export const calc_detection_phase = (
    our_fleet: Fleet,
    enemy_fleet: Fleet,
    rand: Rand,
): DetectionPhaseResult => {
    const detect_status = analyze_fleet_detection(our_fleet);
    const success_rate = calc_detection_success_rate(detect_status.detection_power);

    const is_detection_success = rand.next() > success_rate;

    const post_loss_our_fleet = calc_shotdowned_recon_fleet(
        our_fleet,
        enemy_fleet,
        detect_status.recon_power,
        rand,
    );

    return {
        is_detection_success,
        post_loss_our_fleet,
    }
}

export function sim_execute(
    our_fleet: Fleet,
    enemy_fleet: Fleet,
    rand: Rand,
) {
    const detection_result = calc_detection_phase(
        our_fleet,
        enemy_fleet,
        rand,
    );

    const post_detection_our_fleet = detection_result.post_loss_our_fleet;
}