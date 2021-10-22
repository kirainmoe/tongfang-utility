use std::cmp::min;
use std::fs::File;
use std::io::Write;

use futures_util::StreamExt;

use tauri::AppHandle;
use tauri::Manager;

#[derive(Clone, serde::Serialize)]
pub struct DownloadProgressPayload {
  total_size: u64,
  downloaded_size: u64,
}

#[tauri::command]
pub async fn download_remote_file(app: AppHandle, url: &str, save_path: &str) -> Result<(), String> {
  let client = reqwest::Client::new();
  let res = client
    .get(url)
    .send()
    .await
    .or(Err(format!("Failed to GET from '{}'", &url)))?;

  let total_size = res.content_length().unwrap();

  let mut file = File::create(save_path).unwrap();
  let mut downloaded: u64 = 0;
  let mut stream = res.bytes_stream();

  while let Some(item) = stream.next().await {
    let chunk = item.or(Err(format!("Error while downloading file")))?;
    file.write(&chunk)
        .or(Err(format!("Error while writing to file")))?;
    let new = min(downloaded + (chunk.len() as u64), total_size);
    downloaded = new;

    app
      .emit_all("download-progress-update", DownloadProgressPayload {
        downloaded_size: downloaded,
        total_size: total_size,
      })
      .unwrap();
  }
    
  Ok(())
}