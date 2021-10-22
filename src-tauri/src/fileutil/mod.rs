use std::fs;
use std::path::{Path, PathBuf};

#[tauri::command]
pub fn file_exists(path: &str) -> bool {
  Path::new(path).exists()
}

pub fn do_copy_dir(src: PathBuf, dst: PathBuf) -> Result<(), String> {
  fs::create_dir_all(&dst).or(Err("Failed to create directory"))?;

  for entry in fs::read_dir(&src).or(Err(format!("Read directory {:?} failed.", src)))? {
    let entry = entry.or(Err("Get entry failed"))?;
    let ty = entry.file_type().or(Err("Get type failed"))?;
    if ty.is_dir() {
      do_copy_dir(entry.path(), dst.join(entry.file_name()))?;
    } else {
      fs::copy(entry.path(), dst.join(entry.file_name())).or(Err("Copy file failed"))?;
    }
  }

  Ok(())
}

#[tauri::command]
pub fn copy_dir(src: &str, dst: &str) -> Result<(), String> {
  do_copy_dir(PathBuf::from(src), PathBuf::from(dst))?;

  Ok(())
}

