use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;
use tsify::Tsify;

pub struct Equip {
	pub id: u32,
	pub name: String,
	pub base_fire_power: u32,
	pub base_torpedo_power: u32,
	pub base_anti_air_power: u32,
	pub base_armor: u32,
	pub base_evasion: u32,
	pub base_asw: u32,
	pub base_los: u32,

	pub gain_fire_power: u32,
	pub gain_torpedo_power: u32,
	pub gain_anti_air_power: u32,
	pub gain_armor: u32,
	pub gain_evasion: u32,
	pub gain_asw: u32,
	pub gain_los: u32,
}

pub struct PlayerShip {
	pub id: u32,
	pub unique_id: u32,
	pub name: String,
	pub lv: u32,
	pub current_hp: u32,
	pub max_hp: u32,
	pub status_fire_power: u32,
	pub status_torpedo_power: u32,
	pub status_anti_air_power: u32,
	pub status_armor: u32,
	pub status_evasion: u32,
	pub status_asw: u32,
	pub status_los: u32,
	pub status_luck: u32,
	pub range: u32,
	// pub equips: Vec<Equip>,
	pub max_plane_slots: Vec<u32>,
	pub current_plane_slots: Vec<u32>,
	pub ship_type: ShipType,
	pub fuel: u32,
	pub fuel_remaining_ratio: f32,
	pub ammo: u32,
	pub ammo_remaining_ratio: f32,
}

pub struct PlayerFleet {
	pub ships: Vec<PlayerShip>,
}

#[derive(Tsify)]
#[repr(u8)]
pub enum ShipType {
    DE = 1,
    DD = 2,
    CL = 3,
    CLT = 4,
    CA = 5,
    CAV = 6,
    CVL = 7,
    FBB = 8,
    BB = 9,
    BBV = 10,
    CV = 11,
    SS = 13,
    SSV = 14,
    AV = 16,
    LHA = 17,
    CVB = 18,
    AR = 19,
    AS = 20,
    CT = 21,
    AO = 22,
}