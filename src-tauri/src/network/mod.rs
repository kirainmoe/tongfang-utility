use std::fs::File;
use std::io::Cursor;
use std::io::Write;

use futures_util::StreamExt;

use tauri::AppHandle;
use tauri::Manager;

#[derive(Clone, serde::Serialize)]
pub struct DownloadProgressPayload {
  downloaded_size: u64,
  total_size: u64,
}

#[tauri::command]
pub async fn download_remote_file(
  app: AppHandle,
  url: &str,
  save_path: &str,
) -> Result<(), String> {
  println!("[log] GET {}", url);
  
  let client = reqwest::Client::builder()
    .no_gzip()
    .build()
    .unwrap();

  let res = client
    .get(url)
    .send()
    .await
    .or(Err(format!("Failed to GET from '{}'", &url)))?;
  
  
  let content_length = res.content_length();
  let total_size = match content_length {
    Some(size) => size,
    None => 1,
  };

  let mut file = File::create(save_path).or(Err(format!("Cannot create file: {}", save_path)))?;
  let mut downloaded: u64 = 0;
  let mut stream = res.bytes_stream();

  while let Some(item) = stream.next().await {
    let chunk = item.or(Err(format!("Error while downloading file")))?;
    file
      .write(&chunk)
      .or(Err(format!("Error while writing to file")))?;
    let new = downloaded + (chunk.len() as u64);
    downloaded = new;

    app
      .emit_all(
        "download-progress-update",
        DownloadProgressPayload {
          downloaded_size: downloaded,
          total_size,
        },
      )
      .or(Err("error while emiting download progress"))?;
  }

  Ok(())
}

#[tauri::command]
pub async fn download_without_progress(url: &str, save_path: &str) -> Result<(), String> {
  let resp = reqwest::get(url).await;

  match resp {
    Ok(resp) => {
      let mut file = File::create(save_path).or(Err(format!("failed to create file")))?;

      let mut content = Cursor::new(resp.bytes().await.or(Err(format!("read contnt failed!")))?);

      std::io::copy(&mut content, &mut file).or(Err(format!("read contnt failed!")))?;
      Ok(())
    }
    Err(err) => {
      println!("{:?}", err);
      Err(format!("Failedd to GET {}", url))
    }
  }
}
