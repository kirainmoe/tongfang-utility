pub mod platform_data;
pub mod types;

use platform_data::PLATFORM_DATA;
use types::{SMBIOSInfo, SMBIOSInfoPayload, GenerateSMBIOSInfo};

extern "C" {
  fn get_current_model() -> i32;
  fn generate_serial_number_and_mlb(index: i32) -> &'static GenerateSMBIOSInfo;
  pub fn get_system_info(info: &mut SMBIOSInfo);
}

#[tauri::command]
pub fn get_model_name() -> &'static str {
  unsafe {
    let model_index = get_current_model();
    let model_item = &PLATFORM_DATA[model_index as usize];
    &model_item.0
  }
}

#[tauri::command]
pub fn generate_sn_mlb(model_index: i32) -> &'static GenerateSMBIOSInfo {
  unsafe {
    let smbios_info = generate_serial_number_and_mlb(model_index);
    smbios_info
  }
}

#[tauri::command]
pub fn get_smbios() -> SMBIOSInfoPayload {
  unsafe {
    let mut info = SMBIOSInfo::default();
    get_system_info(&mut info);

    let payload = SMBIOSInfoPayload {
      model: String::from_utf8_lossy(&info.model).into_owned(),
      board_id: String::from_utf8_lossy(&info.board_id).into_owned(),
      hardware_uuid: String::from_utf8_lossy(&info.hardware_uuid).into_owned(),
      system_uuid: String::from_utf8_lossy(&info.system_uuid).into_owned(),
      serial_number: String::from_utf8_lossy(&info.serial_number).into_owned(),
      system_model: String::from_utf8_lossy(&info.system_model).into_owned(),
      rom: String::from_utf8_lossy(&info.rom).into_owned(),
      mlb: String::from_utf8_lossy(&info.mlb).into_owned()
    };

    payload
  }
}
