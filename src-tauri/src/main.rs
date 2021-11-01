#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;
mod hid;
mod fileutil;
mod imageutil;
mod macserial;
mod network;
mod smc;
mod resource;
mod ziputil;

use cmd::macos_sudo_exec;
use hid::{set_mono_color, set_breathing, set_wave, set_rainbow, set_flashing, set_gradient, disable_keyboard_light};
use fileutil::{file_exists, copy_dir};
use imageutil::{resize_png, create_icns};
use network::download_remote_file;
use smc::get_temperature;
use smc::battery::get_battery_info;
use resource::cpu::get_cpu_utilization;
use resource::memory::get_memory_utilization;
use resource::disk::get_disk_utilization;
use macserial::{get_model_name, get_smbios, generate_sn_mlb};
use ziputil::{list_zip_contents, read_zip_file_content, extract_to};
use tauri::{Menu, MenuItem};

fn main() {
  let menu = Menu::new().add_native_item(MenuItem::Quit);

  tauri::Builder::default()
    .menu(menu)
    .invoke_handler(tauri::generate_handler![
      file_exists,
      get_temperature,
      get_battery_info,
      get_cpu_utilization,
      get_memory_utilization,
      get_disk_utilization,
      get_model_name,
      get_smbios,
      generate_sn_mlb,
      resize_png,
      list_zip_contents,
      read_zip_file_content,
      download_remote_file,
      extract_to,
      copy_dir,
      create_icns,
      macos_sudo_exec,
      set_mono_color,
      set_breathing,
      set_wave,
      set_rainbow,
      set_flashing,
      set_gradient,
      disable_keyboard_light,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
