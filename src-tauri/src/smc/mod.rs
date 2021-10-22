pub mod battery;

extern "C" {
  fn temperature() -> f64;
}

#[tauri::command]
pub fn get_temperature() -> f64 {
  unsafe {
    temperature()
  }
}

