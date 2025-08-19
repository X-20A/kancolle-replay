import { Brand } from "@/types/brands";

/**
 * 設計について
 * 空母以外は
 * 基本攻撃力 → 対地攻撃力
 * と処理するが空母では対地が基本攻撃力処理に割り込んでくる。
 * よって、
 * 基本攻撃力と対地攻撃力を統合した式で計算するか、
 * 基本攻撃力処理を対地目標如何で分けるか、
 * が必要になる。
 * 日・ENwikiは後者であり、Sortie Simは前者である。
 * 本simでは後者を採用する。
 */

export type ShellingPower = Brand<number, 'ShellingPower'>

export function calc_shelling_power(

): ShellingPower {
    
}