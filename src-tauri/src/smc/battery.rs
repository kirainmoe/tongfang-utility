use std::process::Command;

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct BatteryInfo {
  installed: bool,
  charging: bool,
  full_charged: bool,
  design_capacity: f64,
  max_capacity: f64,
  current_capacity: f64,
}

impl Default for BatteryInfo {
  fn default() -> BatteryInfo {
    BatteryInfo {
      installed: false,
      charging: false,
      full_charged: false,
      design_capacity: 0.0,
      max_capacity: 0.0,
      current_capacity: 0.0,
    }
  }
}

pub fn read_battery_data() -> String {
  let output = Command::new("ioreg")
    .arg("-rn")
    .arg("AppleSmartBattery")
    .output()
    .expect("failed to execute process");

  let stdout = output.stdout;
  
  String::from_utf8_lossy(&stdout).into_owned()
}

#[tauri::command]
pub fn get_battery_info() -> BatteryInfo {
  let raw = read_battery_data();
  let lines: Vec<&str> = raw.split("\n").collect();

  let mut battery_info: BatteryInfo = BatteryInfo::default();

  for line in lines.iter() {
    let cur_str = String::from(*line).trim().to_owned();

    let val: Vec<&str> = (&cur_str).split('=').collect();

    if !(&cur_str).contains("=") || (&cur_str).contains("BatteryData") {
      continue;
    }

    let val = val[1].trim();
    
    if (&cur_str).contains("BatteryInstalled") {
      battery_info.installed = match val {
        "Yes" => true,
        _ => false
      };
    }

    if (&cur_str).contains("IsCharging") {
      battery_info.charging = match val {
        "Yes" => true,
        _ => false
      };
    }

    if (&cur_str).contains("FullyCharged") {
      battery_info.full_charged = match val {
        "Yes" => true,
        _ => false
      };
    }

    if (&cur_str).contains("DesignCapacity") {
      battery_info.design_capacity = val.parse::<f64>().unwrap()
    }

    if (&cur_str).contains("MaxCapacity") {
      battery_info.max_capacity = val.parse::<f64>().unwrap()
    }

    if (&cur_str).contains("CurrentCapacity") {
      battery_info.current_capacity = val.parse::<f64>().unwrap()
    }
  }

  battery_info
}