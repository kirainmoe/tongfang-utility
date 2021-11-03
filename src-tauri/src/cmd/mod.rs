use std::process::Command;

#[tauri::command]
pub fn macos_sudo_exec(command: &str) -> Result<String, String> {
  let cmd = &format!("osascript -e 'do shell script \"{}\" with administrator privileges'", command)[..];

  println!("{}", cmd);

  let output = Command::new("bash")
    .args(["-c", cmd])
    .output()
    .or(Err("FAILED_TO_EXECUTE_COMMAND_PARSED_FAILED"))?;

  let stdout = output.stdout;
  let stderr = output.stderr;
  
  if String::from_utf8_lossy(&stderr).into_owned().contains("-128") {
    return Err(format!("FAILED_TO_EXECUTE_COMMAND_PERMISSION_NOT_GRANTED"));
  }

  Ok(String::from_utf8_lossy(&stdout).into_owned())
}
