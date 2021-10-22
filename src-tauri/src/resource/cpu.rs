use crate::resource::exec::exec;

#[tauri::command]
pub fn get_cpu_utilization() -> f64 {
  let total_utilization = exec("ps -A -o %cpu | awk '{s+=$1} END {print s}'");
  let threads = exec("sysctl -n machdep.cpu.thread_count");

  total_utilization / threads
}