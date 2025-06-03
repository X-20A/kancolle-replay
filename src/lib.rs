use types::PlayerFleet;
use wasm_bindgen::prelude::*;
// use rand::Rng;

pub mod types;

use types::PlayerShip;
use types::ShipType::*;

pub struct RepairCost {
    pub fuel: u32,
    pub steel: u32,
}
/// 入渠コストを計算して返す
/// 
/// ### 引数
/// - `ship`: 艦船オブジェクト
///
/// ### 返り値
/// - RepairCost
pub fn calc_repair_cost(ship: PlayerShip) -> RepairCost {
    let fuel = ship.fuel;
    let base = (ship.max_hp - ship.current_hp) * fuel;
    RepairCost {
        fuel: (base as f64 * 0.032).floor() as u32,
        steel: (base as f64 * 0.06).floor() as u32,
	}
}

/// 入渠時間を計算して返す
/// ### 引数
/// - `ship`: 艦船オブジェクト
/// ### 返り値
/// - 秒
pub fn calc_repair_time(ship: PlayerShip) -> f64 {
    if ship.current_hp >= ship.max_hp {
        return 0.0;
    }

    let base: f64;
    
    if ship.lv <= 11 {
        base = 10.0 * ship.lv as f64;
    } else {
        base = 5.0 * ship.lv as f64 + 10.0 * (f64::sqrt((ship.lv - 11) as f64).floor()) + 50.0;
    }

    let r#mod: f64;
    match ship.ship_type {
    	BB | BBV | CV | CVB | AR => r#mod = 2.0,
        CA | CAV | FBB | CVL | AS => r#mod = 1.5,
        SS | DE => r#mod = 0.5,
        _ => r#mod = 1.0,
    }

    (ship.max_hp - ship.current_hp) as f64 * base * r#mod + 30.0
}

/// 陣形が以下の組み合わせであったときにtrue、それ以外はfalseを返す    
/// 1: 単縦陣, 2: 複縦陣, 3: 輪形陣, 4: 梯形陣, 5: 単横陣    
/// 2 - 5    
/// 4 - 1    
/// 5 - 4    
/// 参考: https://x.gd/o1EpH 昼砲撃戦の命中率 > 陣形
/// ### 引数
/// - `our_formation`: 攻撃側の陣形ID
/// - `their_formation`: 回避側の陣形ID
/// ### 返り値
/// - 真偽値
pub fn formation_countered(our_formation_id: u32, their_formation_id: u32) -> bool {
    if our_formation_id == 2 && their_formation_id == 5 {
        return true;
    }
    if our_formation_id == 4 && their_formation_id == 1 {
        return true;
    }
    if our_formation_id == 5 && their_formation_id == 4 {
        return true;
    }
    false
}

struct DetectionPhaseResult {
	is_success: bool,
	post_reduction_fleets: Vec<PlayerFleet>,
}
pub fn detection_phase(fleets: Vec<PlayerFleet>) -> DetectionPhaseResult {
	let ships_length: usize = fleets
			.iter()
			.map(|fleet| fleet.ships.len())
			.sum();
	let number_of_ships_modifier = calc_ship_length_modifier(ships_length);	
	let detection_power = tota
	let success_rate = (detection_power + 1).floor() / 20;
}

fn clac_los_per_ship(fleet: PlayerFleet, target_ship: PlayerShip) -> u32 {
	let equip_seek = target_ship.equips
		.iter()
		.map(|equip| equip.base_los)
		.sum();
	let ship_position = fleet.ships
		.iter()
		.position(|ship| ship.unique_id == target_ship.unique_id)
		.expect("target_shipがfleet内に存在しません");
	(target_ship.status_los + equip_seek)
}

fn calc_ship_length_modifier(ships_length: usize) -> u32 {
    if ships_length <= 2 {
        return 0;
    }
    // supposition: 遊撃部隊や連合艦隊でも1づつ加算されると仮定
    (ships_length - 2) as u32
}

fn calc_ship_detection_power(ship: PlayerShip) -> u32 {

}

#[wasm_bindgen] // Functions that can be called from js
pub fn update_settings() -> String {
	"run update_settings".to_string()
}

#[wasm_bindgen] // Functions that can be called from js
pub fn sim() -> String {
	"run sim".to_string()
}

