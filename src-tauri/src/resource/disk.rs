use std::process::Command;

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct DiskUtilization {
  percent: f64,
  free: f64,
  used: f64,
  total: f64,
}

impl Default for DiskUtilization {
  fn default() -> DiskUtilization {
    DiskUtilization {
      percent: 0.0,
      free: 0.0,
      used: 0.0,
      total: 0.0,
    }
  }
}

pub fn parse_f64(target: &str) -> f64 {
  target.parse::<f64>().unwrap()
}

#[tauri::command]
pub fn get_disk_utilization() -> DiskUtilization  {
  let mut disk_utilization = DiskUtilization::default();

  let output = Command::new("bash")
    .args(&["-c", "df -H / 2>/dev/null | tail -1 | awk '{print $4/$2, $4-0G, $2-$4, $2-0G}'"])
    .output()
    .expect("failed to execute process");
  let stdout = String::from_utf8_lossy(&output.stdout).to_owned();
  let items: Vec<&str> = stdout.split(' ').collect();

  disk_utilization.percent = 1.0 - parse_f64(items[0]);
  disk_utilization.free = parse_f64(items[1]);
  disk_utilization.used = parse_f64(items[2]);
  disk_utilization.total = parse_f64(items[3].trim());

  disk_utilization
}