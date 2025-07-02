import { brandShipId } from "@/types/brands/ship";
import { pre_make_player_ship_from_name } from "../generator";
import { derive_equipped_abyssal_ship } from "@/models/ship/equipped/abyssal";

/** 鵜来改 */
export const make_Ukuru_kai = pre_make_player_ship_from_name('鵜来改');

/** 睦月 */
export const make_Mutsuki = pre_make_player_ship_from_name('睦月');
/** Fletcher */
export const make_Fletcher = pre_make_player_ship_from_name('Fletcher');
/** 親潮 */
export const make_Oyashio = pre_make_player_ship_from_name('親潮');
/** 清霜改 */
export const make_Kiyoshimo_kai = pre_make_player_ship_from_name('清霜改');
/** 白露改二 */
export const make_Shiratsuyu_kai_2 = pre_make_player_ship_from_name('白露改二');
/** 秋月 */
export const make_Akizuki = pre_make_player_ship_from_name('秋月');

/** 加古改二 */
export const make_Kako_kai_ni = pre_make_player_ship_from_name('加古改二');
/** 摩耶改二 */
export const make_Maya_kai_ni = pre_make_player_ship_from_name('摩耶改二');

/** 加賀改二護 */
export const make_Kaga_kai_ni_go = pre_make_player_ship_from_name('加賀改二護');
/** Ranger */
export const make_Ranger = pre_make_player_ship_from_name('Ranger');

/** 伊勢改二 */
export const make_Ise_kai_2 = pre_make_player_ship_from_name('伊勢改二');

/** 輸送ワ級II(揚陸中) */
export const LANDING_WA = derive_equipped_abyssal_ship(brandShipId(2269));