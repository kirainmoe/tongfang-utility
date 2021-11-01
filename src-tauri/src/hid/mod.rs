use hidapi::HidDevice;

use std::ops::Index;

// 默认键盘灯颜色序列
static DEFAULT_COLOR_SERIES: [[u8; 3]; 7] = [
  [0xff, 0x00, 0x00],
  [0xff, 0x5a, 0x00],
  [0xff, 0xb4, 0x00],
  [0x00, 0xb4, 0x00],
  [0x00, 0x00, 0xff],
  [0x00, 0xb4, 0xff],
  [0xff, 0x00, 0xff],
];

// 默认彩虹颜色序列
static DEFAULT_RAINBOW_COLOR_SERIES: [[u8; 3]; 4] = [
  [0xff, 0x00, 0x00],
  [0x00, 0xb4, 0x00],
  [0x00, 0x00, 0xff],
  [0xff, 0x00, 0xff],
];

/// 连接 ITE Device 8291 (0x048D, 0xCE00)
fn connect_ite_device() -> Result<HidDevice, String> {
  let api = hidapi::HidApi::new()
    .or(Err(format!("Cannot create HID instance!")))?;

  let (vendor_id, product_id): (u16, u16) = (0x048D, 0xCE00);
  let mut has_product = false;

  for device in api.device_list() {
    if device.vendor_id() == vendor_id && device.product_id() == product_id {
      has_product = true;
      break;
    }
  }

  if !has_product {
    return Err(format!("Cannot find target device."));
  }

  let device = api.open(vendor_id, product_id)
    .or(Err(format!("Cannot open HID device {:04x}:{:04x}. Is someone occupied it?", vendor_id, product_id)))?;

  Ok(device)
}


/// 在 feature_report 数据包前补 0 以兼容 Windows
fn zero_fill(vec: Vec<u8>) -> Vec<u8> {
  let zero: Vec<u8> = vec![0x00];
  [zero, vec].concat()
}

/// 发送颜色序列声明包
fn send_generic_packet(device: &HidDevice) -> Result<(), String> {
  for i in 1..8 {
    let [r, g, b] = DEFAULT_COLOR_SERIES.index(i-1);
    let packet = zero_fill(vec![0x14, 0x0, (i as u8), *r, *g, *b, 0x00, 0x00]);
    device.send_feature_report(&packet)
      .or(Err(format!("Failed to send generic packet!")))?;
  }

  Ok(())
}

/// 设置为固定颜色
/// 
/// block = 0 时表示将四个分区全部设置为 (r, g, b)
#[tauri::command]
pub fn set_mono_color(r: u8, g: u8, b: u8, block: u8, brightness: u8, save: u8) -> Result<(), String> {
  let device = connect_ite_device()?;

  let end_packet = zero_fill(
    vec![
      0x08, 0x02,   /* fixed 2 bytes header (changing mode) */
      0x01,         /* mono color */
      0x05,         /* speed */
      brightness,   /* brightness */
      0x08,         /* ??? */
      0x00,         /* direction, 0 <---, 1 ---> */
      save          /* save changes */
    ]
  );

  let mut start_packet = vec![
    0x14, 0x00,   /* fixed 2 bytes header (setting color) */
    0x01,         /* button group index */
    r, g, b,      /* RGB value */
    0x00, 0x00    /* fixed 2 bytes footer */
  ];
  
  if block > 0 {
    start_packet[2] = block;
    device.send_feature_report(
      &zero_fill(start_packet.clone())
    )
      .or(Err(format!("Failed to send feature report!")))?;
  } else {
    for i in 1..4 {
      start_packet[2] = i;
      device.send_feature_report(
        &zero_fill(start_packet.clone())
      )
        .or(Err(format!("Failed to send feature report!")))?;
    }
  }

  device.send_feature_report(&end_packet)
    .or(Err(format!("Failed to send feature report!")))?;

  Ok(())
}


/// 呼吸模式
#[tauri::command]
pub fn set_breathing(speed: u8, brightness: u8, save: u8) -> Result<(), String> {
  let device = connect_ite_device()?;

  send_generic_packet(&device)?;

  let packet = zero_fill(
    vec![0x08, 0x02, 0x02, speed, brightness, 0x08, 0x00, save]
  );

  device.send_feature_report(&packet)
    .or(
      Err(format!("Failed to set keyboard as breathing!"))
    )?;

  Ok(())
}

/// 波浪模式
#[tauri::command]
pub fn set_wave(speed: u8, brightness: u8, direction: u8, save: u8) -> Result<(), String> {
  let device = connect_ite_device()?;

  send_generic_packet(&device)?;

  let packet = zero_fill(
    vec![0x08, 0x02, 0x03, speed, brightness, 0x08, direction, save]
  );

  device.send_feature_report(&packet)
    .or(
      Err(format!("Failed to set keyboard as wave!"))
    )?;

  Ok(())
}

/// 彩虹模式
#[tauri::command]
pub fn set_rainbow(brightness: u8, save: u8) -> Result<(), String> {
  let device = connect_ite_device()?;

  send_generic_packet(&device)?;

  let packet = zero_fill(
    vec![0x08, 0x02, 0x05, 0x05, brightness, 0x08, 0x00, save]
  );

  for i in 1..4 {
    let [r, g, b] = DEFAULT_RAINBOW_COLOR_SERIES.index(i - 1 as usize);
    let packet = zero_fill(vec![
      0x14, 0x00,
      i as u8,
      *r, *g, *b,
      0x00, 0x00,
    ]);
    device.send_feature_report(&packet)
      .or(
        Err(format!("Failed to set keyboard as rainbow!"))
      )?;
  }

  device.send_feature_report(&packet)
    .or(
      Err(format!("Failed to set keyboard as rainbow!"))
    )?;

  Ok(())
}

/// 闪烁模式
#[tauri::command]
pub fn set_flashing(speed: u8, brightness: u8, direction: u8, save: u8) -> Result<(), String> {
  let device = connect_ite_device()?;

  let packet = zero_fill(
    vec![0x08, 0x02, 0x12, speed, brightness, 0x08, direction, save]
  );

  send_generic_packet(&device)?;
  device.send_feature_report(&packet)
    .or(
      Err(format!("Failed to set keyboard as flashing!"))
    )?;

  Ok(())
}

/// 渐变模式
#[tauri::command]
pub fn set_gradient(speed: u8, brightness: u8, save: u8) -> Result<(), String> {
  let device = connect_ite_device()?;

  let packet = zero_fill(
    vec![0x08, 0x02, 0x13, speed, brightness, 0x08, 0x00, save]
  );

  send_generic_packet(&device)?;
  device.send_feature_report(&packet)
    .or(
      Err(format!("Failed to set keyboard as gradient!"))
    )?;

  Ok(())
}


/// 关闭键盘灯
#[tauri::command]
pub fn disable_keyboard_light() -> Result<(), String> {
  let device = connect_ite_device()?;
  let packet = zero_fill(vec![0x08, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
  device.send_feature_report(&packet)
    .or(
      Err(format!("Failed to set keyboard as gradient!"))
    )?;

  Ok(())
}