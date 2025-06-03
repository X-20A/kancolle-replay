use kssw::{
	calc_repair_cost,
	calc_repair_time,
	formation_countered,
};

use kssw::types::{PlayerShip, ShipType};

#[cfg(test)]
mod tests {
	use super::*;

	#[test]
	fn test_get_repair_cost() {
		let result = calc_repair_cost(create_mock_player_ship());

		assert_eq!(result.fuel, 518);
		assert_eq!(result.steel, 972);
	}

	#[test]
	fn test_get_repair_time() {
		let result = calc_repair_time(create_mock_player_ship());
		dbg!(result);

		assert_eq!(result, 114330.0);
	}

	#[test]
	fn test_formation_countered() {
		let result1 = formation_countered(2, 5);
		let result2 = formation_countered(4, 1);
		let result3 = formation_countered(5, 4);
		let result4 = formation_countered(1, 4);

		assert_eq!(result1, true);
		assert_eq!(result2, true);
		assert_eq!(result3, true);
		assert_eq!(result4, false);
	}

	/*
	#[test]
	fn test_detection_phase() {
		let fleet = [create_mock_player_ship()];
		let result = detection_phase([fleet]);
	}*/
}




fn create_mock_player_ship() -> PlayerShip {
    PlayerShip {
        id: 341,
		unique_id: 1,
        name: String::from("長門改二(モック)"),
        lv: 99,
        current_hp: 1,
        max_hp: 91,
        status_fire_power: 91,
        status_torpedo_power: 0,
        status_anti_air_power: 100,
        status_armor: 110,
        status_evasion: 70,
        status_asw: 0,
        status_los: 55,
        status_luck: 40,
        range: 3,
		max_plane_slots: vec![3,3,6,3],
		current_plane_slots: vec![3,3,6,3],
		ship_type: ShipType::BB,
        fuel: 180,
		fuel_remaining_ratio: 1.0,
        ammo: 225,
		ammo_remaining_ratio: 1.0,
    }
}
