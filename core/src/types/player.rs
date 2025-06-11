use serde::{Deserialize, Serialize};
use tsify::Tsify;

/// 艦種IDと名前のマッピング
#[repr(u8)]
#[derive(Debug, EnumSetType, FromPrimitive, Serialize, Deserialize, Tsify)]
#[tsify(namespace)]
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
