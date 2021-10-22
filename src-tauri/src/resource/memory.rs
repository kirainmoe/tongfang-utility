use crate::resource::exec::exec;

#[tauri::command]
pub fn get_memory_utilization() -> (f64, f64) {
  let total_mem = exec("echo \"$(sysctl -n hw.memsize)\" / 1024 ^ 2 | bc");
  let wired_mem = exec("vm_stat | grep wired | awk '{ print $4 }' | sed 's/\\.//'");
  let active_mem = exec("vm_stat | grep ' active' | awk '{ print $3 }' | sed 's/\\.//'");
  let compressed_mem = exec("vm_stat | grep occupied | awk '{ print $5 }' | sed 's/\\.//'");

  let used_mem = (wired_mem + active_mem + compressed_mem) * 4.0 / 1024.0;

  (total_mem, used_mem)
}