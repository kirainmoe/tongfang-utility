use std::fs;
use std::io::Read;

#[tauri::command]
pub fn list_zip_contents(filepath: &str) -> Result<Vec<String>, String> {
  let file = fs::File::open(&filepath).or(Err(format!("Open file {} failed", &filepath)))?;
  let mut archive = zip::ZipArchive::new(file).or(Err(format!(
    "Open file {} as ZIP archive failed",
    &filepath
  )))?;
  let mut result: Vec<String> = vec![];
  for i in 0..archive.len() {
    let file = archive
      .by_index(i)
      .or(Err("Read filelist from archive failed."))?;
    let filename = file.name();
    result.push(filename.to_owned());
  }
  Ok(result)
}

#[tauri::command]
pub fn read_zip_file_content(filepath: &str, filename: &str) -> Result<String, String> {
  let file = fs::File::open(&filepath).or(Err(format!("Open file {} failed", &filepath)))?;
  let mut archive = zip::ZipArchive::new(&file).or(Err(format!(
    "Open file {} as ZIP archive failed",
    &filepath
  )))?;

  let mut file_content: String = String::default();
  archive
    .by_name(filename)
    .unwrap()
    .read_to_string(&mut file_content)
    .or(Err(format!("Read file {} from archive failed.", &filename)))?;
  Ok(file_content)
}

#[tauri::command]
pub fn extract_to(filepath: &str, extract_path: &str) {
  let file = fs::File::open(&filepath).unwrap();
  let mut archive = zip::ZipArchive::new(file).unwrap();
  archive.extract(&extract_path).unwrap();
}
