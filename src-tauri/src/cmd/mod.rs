use std::process::Command;

#[tauri::command]
pub fn macos_sudo_exec(command: &str) -> String {
  let cmd = &format!("osascript -e 'do shell script \"{}\" with administrator privileges'", command)[..];

  let output = Command::new("bash")
    .args(["-c", cmd])
    .output()
    .expect("failed to execute process");

    let stdout = output.stdout;
  String::from_utf8_lossy(&stdout).into_owned()
}
