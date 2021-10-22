extern crate serde;
use serde::{Serialize, Deserialize};

// #[repr(C)]
// pub struct SerialInfo {
//   apple_model: &'static str,
//   country: [u8; 4],
//   year: [u8; 3],
//   week: [u8; 3],
//   line: [u8; 4],
//   model: [u8; 5],
//   legacy_country_idx: i32,
//   modern_country_idx: i32,
//   model_index: i32,
//   decoded_year: i32,
//   decoded_week: i32,
//   decoded_copy: i32,
//   decoded_line: i32,
//   valid: bool
// }

// #[repr(C)]
// pub enum AppleModel {
//   MacBook1_1, // Intel Core Duo T2400 @ 1.83 GHz
//   MacBook10_1, // Intel Core m3-7Y32 @ 1.10 GHz
//   MacBook2_1, // Intel Core 2 Duo T5600 @ 1.83 GHz
//   MacBook3_1, // Intel Core 2 Duo T7500 @ 2.20 GHz
//   MacBook4_1, // Intel Core 2 Duo T8300 @ 2.40 GHz
//   MacBook5_1, // Intel Core 2 Duo P8600 @ 2.40 GHz
//   MacBook5_2, // Intel Core 2 Duo P7450 @ 2.13 GHz
//   MacBook6_1, // Intel Core 2 Duo P7550 @ 2.26 GHz
//   MacBook7_1, // Intel Core 2 Duo P8600 @ 2.40 GHz
//   MacBook8_1, // Intel Core M 5Y51 @ 1.10 GHz
//   MacBook9_1, // Intel Core m3-6Y30 @ 1.10 GHz
//   MacBookAir1_1, // Intel Core 2 Duo P7500 @ 1.60 GHz
//   MacBookAir2_1, // Intel Core 2 Duo SL9600 @ 2.13 GHz
//   MacBookAir3_1, // Intel Core 2 Duo SU9400 @ 1.40 GHz
//   MacBookAir3_2, // Intel Core 2 Duo SL9400 @ 1.86 GHz
//   MacBookAir4_1, // Intel Core i5-2467M @ 1.60 GHz
//   MacBookAir4_2, // Intel Core i5-2557M @ 1.70 GHz
//   MacBookAir5_1, // Intel Core i5-3317U @ 1.70 GHz
//   MacBookAir5_2, // Intel Core i5-3317U @ 1.70GHz
//   MacBookAir6_1, // Intel Core i5-4250U @ 1.30 GHz
//   MacBookAir6_2, // Intel Core i5-4250U @ 1.30 GHz
//   MacBookAir7_1, // Intel Core i5-5250U @ 1.60 GHz
//   MacBookAir7_2, // Intel Core i5-5250U @ 1.60 GHz
//   MacBookAir8_1, // Intel Core i5-8210Y @ 1.60 GHz
//   MacBookAir8_2, // Intel Core i5-8210Y @ 1.60 GHz
//   MacBookAir9_1, // Intel Core i3-1000NG4 @ 1.10 GHz
//   MacBookPro1_1, // Intel Core Duo L2400 @ 1.66 GHz
//   MacBookPro1_2, // Intel Core Duo T2600 @ 2.16 GHz
//   MacBookPro10_1, // Intel Core i7-3615QM @ 2.30 GHz
//   MacBookPro10_2, // Intel Core i5-3210M @ 2.50 GHz
//   MacBookPro11_1, // Intel Core i5-4258U @ 2.40 GHz
//   MacBookPro11_2, // Intel Core i7-4770HQ @ 2.20 GHz
//   MacBookPro11_3, // Intel Core i7-4850HQ @ 2.30 GHz
//   MacBookPro11_4, // Intel Core i7-4770HQ @ 2.20 GHz
//   MacBookPro11_5, // Intel Core i7-4870HQ @ 2.50 GHz
//   MacBookPro12_1, // Intel Core i5-5257U @ 2.70 GHz
//   MacBookPro13_1, // Intel Core i5-6360U @ 2.00 GHz
//   MacBookPro13_2, // Intel Core i7-6567U @ 3.30 GHz
//   MacBookPro13_3, // Intel Core i7-6700HQ @ 2.60 GHz
//   MacBookPro14_1, // Intel Core i5-7360U @ 2.30 GHz
//   MacBookPro14_2, // Intel Core i5-7267U @ 3.10 GHz
//   MacBookPro14_3, // Intel Core i7-7700HQ @ 2.80 GHz
//   MacBookPro15_1, // Intel Core i7-8750H @ 2.20 GHz
//   MacBookPro15_2, // Intel Core i7-8559U @ 2.70 GHz
//   MacBookPro15_3, // Intel Core i7-8850H @ 2.60 GHz
//   MacBookPro15_4, // Intel Core i5-8257U @ 1.40 GHz
//   MacBookPro16_1, // Intel Core i7-9750H @ 2.60 GHz
//   MacBookPro16_2, // Intel Core i5-1038NG7 @ 2.00 GHz
//   MacBookPro16_3, // Intel Core i5-8257U @ 1.40 GHz
//   MacBookPro16_4, // Intel Core i7-9750H @ 2.60 GHz
//   MacBookPro2_1, // Intel Core 2 Duo T7600 @ 2.33 GHz
//   MacBookPro2_2, // Intel Core 2 Duo T7400 @ 2.16 GHz
//   MacBookPro3_1, // Intel Core 2 Duo T7700 @ 2.40 GHz
//   MacBookPro4_1, // Intel Core 2 Duo T8300 @ 2.40 GHz
//   MacBookPro5_1, // Intel Core 2 Duo P8600 @ 2.40 GHz
//   MacBookPro5_2, // Intel Core 2 Duo T9600 @ 2.80 GHz
//   MacBookPro5_3, // Intel Core 2 Duo P8800 @ 2.66 GHz
//   MacBookPro5_4, // Intel Core 2 Duo P8700 @ 2.53 GHz
//   MacBookPro5_5, // Intel Core 2 Duo P7550 @ 2.26 GHz
//   MacBookPro6_1, // Intel Core i5-540M @ 2.53 GHz
//   MacBookPro6_2, // Intel Core i5-520M @ 2.40 GHz
//   MacBookPro7_1, // Intel Core 2 Duo P8600 @ 2.40 GHz
//   MacBookPro8_1, // Intel Core i5-2415M @ 2.30 GHz
//   MacBookPro8_2, // Intel Core i7-2675QM @ 2.20 GHz
//   MacBookPro8_3, // Intel Core i7-2820QM @ 2.30 GHz
//   MacBookPro9_1, // Intel Core i7-3615QM @ 2.30 GHz
//   MacBookPro9_2, // Intel Core i5-3210M @ 2.50 GHz
//   MacPro1_1, // Intel Core Xeon 5130 x2 @ 2.00 GHz
//   MacPro2_1, // Intel Xeon X5365 x2 @ 3.00 GHz
//   MacPro3_1, // Intel Xeon E5462 x2 @ 2.80 GHz
//   MacPro4_1, // Intel Xeon W3520 @ 2.66 GHz
//   MacPro5_1, // Intel Xeon W3530 @ 2.80 GHz
//   MacPro6_1, // Intel Xeon E5-1620 v2 @ 3.70 GHz
//   MacPro7_1, // Intel Xeon W-3245M CPU @ 3.20 GHz
//   Macmini1_1, // Intel Core Solo T1200 @ 1.50 GHz
//   Macmini2_1, // Intel Core 2 Duo T5600 @ 1.83 GHz
//   Macmini3_1, // Intel Core 2 Duo P7350 @ 2.00 GHz
//   Macmini4_1, // Intel Core 2 Duo P8600 @ 2.40 GHz
//   Macmini5_1, // Intel Core i5-2415M @ 2.30 GHz
//   Macmini5_2, // Intel Core i5-2520M @ 2.50 GHz
//   Macmini5_3, // Intel Core i7-2635QM @ 2.00 GHz
//   Macmini6_1, // Intel Core i5-3210M @ 2.50 GHz
//   Macmini6_2, // Intel Core i7-3615QM @ 2.30 GHz
//   Macmini7_1, // Intel Core i5-4260U @ 1.40 GHz
//   Macmini8_1, // Intel Core i7-8700B @ 3.20 GHz
//   Xserve1_1, // Intel Xeon 5130 x2 @ 2.00 GHz
//   Xserve2_1, // Intel Xeon E5462 x2 @ 2.80 GHz
//   Xserve3_1, // Intel Xeon E5520 x2 @ 2.26 GHz
//   IMac10_1, // Intel Core 2 Duo E7600 @ 3.06 GHz
//   IMac11_1, // Intel Core i5-750 @ 2.66 GHz
//   IMac11_2, // Intel Core i3-540 @ 3.06 GHz
//   IMac11_3, // Intel Core i5-760 @ 2.80 GHz
//   IMac12_1, // Intel Core i5-2400S @ 2.50 GHz
//   IMac12_2, // Intel Core i7-2600 @ 3.40 GHz
//   IMac13_1, // Intel Core i7-3770S @ 3.10 GHz
//   IMac13_2, // Intel Core i5-3470S @ 2.90 GHz
//   IMac13_3, // Intel Core i5-3470S @ 2.90 GHz
//   IMac14_1, // Intel Core i5-4570R @ 2.70 GHz
//   IMac14_2, // Intel Core i7-4771 @ 3.50 GHz
//   IMac14_3, // Intel Core i5-4570S @ 2.90 GHz
//   IMac14_4, // Intel Core i5-4260U @ 1.40 GHz
//   IMac15_1, // Intel Core i7-4790k @ 4.00 GHz
//   IMac16_1, // Intel Core i5-5250U @ 1.60 GHz
//   IMac16_2, // Intel Core i5-5675R @ 3.10 GHz
//   IMac17_1, // Intel Core i5-6500 @ 3.20 GHz
//   IMac18_1, // Intel Core i5-7360U @ 2.30 GHz
//   IMac18_2, // Intel Core i5-7400 @ 3.00 GHz
//   IMac18_3, // Intel Core i5-7600K @ 3.80 GHz
//   IMac19_1, // Intel Core i9-9900K @ 3.60 GHz
//   IMac19_2, // Intel Core i5-8500 @ 3.00 GHz
//   IMac20_1, // Intel Core i5-10500 @ 3.10 GHz
//   IMac20_2, // Intel Core i9-10910 @ 3.60 GHz
//   IMac4_1, // Intel Core Duo T2400 @ 1.83 GHz
//   IMac4_2, // Intel Core Duo T2400 @ 1.83 GHz
//   IMac5_1, // Intel Core 2 Duo T7200 @ 2.00 GHz
//   IMac5_2, // Intel Core 2 Duo T5600 @ 1.83 GHz
//   IMac6_1, // Intel Core 2 Duo T7400 @ 2.16 GHz
//   IMac7_1, // Intel Core 2 Duo T7300 @ 2.00 GHz
//   IMac8_1, // Intel Core 2 Duo E8435 @ 3.06 GHz
//   IMac9_1, // Intel Core 2 Duo E8135 @ 2.66 GHz
//   IMacPro1_1, // Intel Xeon W-2140B CPU @ 3.20 GHz
// }

#[repr(C)]
#[derive(Debug)]
pub struct SMBIOSInfo {
  pub model: [u8; 20],
  pub board_id: [u8; 32],
  pub hardware_uuid: [u8; 40],
  pub system_uuid: [u8; 40],
  pub serial_number: [u8; 15],
  pub system_model: [u8; 60],
  pub rom: [u8; 15],
  pub mlb: [u8; 20]
}

#[derive(Serialize, Deserialize)]
pub struct SMBIOSInfoPayload {
  pub model: String,
  pub board_id: String,
  pub hardware_uuid: String,
  pub system_uuid: String,
  pub serial_number: String,
  pub system_model: String,
  pub rom: String,
  pub mlb: String
}

impl Default for SMBIOSInfo {
  fn default() -> SMBIOSInfo {
    SMBIOSInfo {
      model: [0; 20],
      board_id: [0; 32],
      hardware_uuid: [0; 40],
      system_uuid: [0; 40],
      serial_number: [0; 15],
      system_model: [0; 60],
      rom: [0; 15],
      mlb: [0; 20]
    }
  }
}

#[repr(C)]
#[derive(Debug, Serialize, Deserialize)]
pub struct GenerateSMBIOSInfo {
  serial_number: [u8; 15],
  mlb: [u8; 32],
}
