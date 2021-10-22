use std::process::Command;

pub fn exec(cmd: &str) -> f64 {
  let output = Command::new("bash")
    .args(&["-c", cmd])
    .output()
    .expect("failed to execute process");
  let stdout = String::from_utf8_lossy(&output.stdout).into_owned();
  let value = (&stdout.trim()[..]).parse::<f64>().unwrap();
  value
} 