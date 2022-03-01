use color_thief::ColorFormat;
use image::buffer::ConvertBuffer;
use image::imageops::{ColorMap, FilterType};
use image::{EncodableLayout, Pixel, Rgb, RgbImage};
use itertools::Itertools;
use std::fs::{read, File};
use std::io::Write;

fn to_rgb8(input: Vec<u8>) -> Result<RgbImage, &'static str> {
  let image = image::load_from_memory(&input).unwrap();
  Ok(image.to_rgb8())
}

fn resize_to(
  src: &RgbImage,
  width: u32,
  height: u32,
  filter_type: u8,
) -> Result<RgbImage, &'static str> {
  let filter_type = match filter_type {
      0 => FilterType::Nearest,
      1 => FilterType::Triangle,
      2 => FilterType::CatmullRom,
      3 => FilterType::Gaussian,
      4 => FilterType::Lanczos3,
      _ => return Err("unknown filter type"),
  };

  let image = image::imageops::resize(src, width, height, filter_type);
  Ok(image)
}

fn encode_to_buf(src: &RgbImage) -> Result<Vec<u8>, &'static str> {
  let mapper = ColorMapper::new(src.as_bytes())?;

  let image = image::imageops::index_colors(&src.convert(), &mapper);

  let (width, height) = image.dimensions();

  let mut buf = Vec::with_capacity(image.len());

  let mut encoder = png::Encoder::new(&mut buf, width, height);
  encoder.set_color(png::ColorType::Indexed);
  encoder.set_depth(png::BitDepth::Eight);
  encoder.set_compression(png::Compression::Best);
  encoder.set_filter(png::FilterType::NoFilter);
  encoder.set_palette(mapper.color_to_rgb());

  let mut writer = encoder.write_header().unwrap();
  writer.write_image_data(&image).unwrap();

  drop(writer);

  Ok(buf)
}

#[tauri::command]
pub fn resize_png(
  input: Vec<u8>,
  width: u32,
  height: u32,
  filter_type: u8,
) -> Result<Vec<u8>, &'static str> {
  let image = to_rgb8(input)?;
  let image = resize_to(&image, width, height, filter_type)?;
  let buf = encode_to_buf(&image)?;
  Ok(buf)
}


pub struct ColorMapper {
  palette: Vec<Rgb<u8>>,
}

impl ColorMapper {
  pub fn new(pixels: &[u8]) -> Result<Self, &'static str> {
      let palette = color_thief::get_palette(pixels, ColorFormat::Rgb, 10, 255)
        .unwrap();
      let palette = palette
          .into_iter()
          .map(|it| Rgb::from_channels(it.r, it.g, it.b, 0))
          .collect_vec();

      Ok(ColorMapper { palette })
  }

  pub fn color_to_rgb(&self) -> Vec<u8> {
      self.palette
          .iter()
          .map(|it| it.0.iter())
          .flatten()
          .cloned()
          .collect_vec()
  }
}

impl ColorMap for ColorMapper {
  type Color = Rgb<u8>;

  fn index_of(&self, color: &Self::Color) -> usize {
      self.palette
          .iter()
          .map(|it| {
              (it.0[0] as i32 - color.0[0] as i32).abs().pow(2)
                  + (it.0[1] as i32 - color.0[1] as i32).abs().pow(2)
                  + (it.0[2] as i32 - color.0[2] as i32).abs().pow(2)
          })
          .position_min()
          .unwrap()
  }

  fn map_color(&self, _color: &mut Self::Color) {}
}

fn big_endian_to_native(target: u32) -> [u8; 4] {
  target.to_be_bytes()
}

#[tauri::command]
pub fn create_icns(input: &str, output: &str) -> Result<(), String> {
  let image = read(input)
    .or(Err(format!("RUST_READ_FILE_FROM_INPUT_FAILED")))?;

  let image1x = resize_png(image.clone(), 1920, 1080, 4)?;
  let image2x = resize_png(image.clone(), 3840, 2160, 4)?;

  let size1x = image1x.len() as u32;
  let size2x = image2x.len() as u32;

  let mut buffer = File::create(output)
    .or(Err(format!("RUST_CREATE_OUTPUT_FILE_FAILED")))?;

  let size = big_endian_to_native(size1x + size2x + 24);
  buffer.write(b"icns").or(Err("RUST_CREATE_OUTPUT_FILE_FAILED"))?;
  buffer.write(&size).or(Err("RUST_CREATE_OUTPUT_FILE_FAILED"))?;
  
  let size = big_endian_to_native(size1x + 8);
  buffer.write(b"ic07").or(Err("RUST_CREATE_OUTPUT_FILE_FAILED"))?;
  buffer.write(&size).or(Err("RUST_CREATE_OUTPUT_FILE_FAILED"))?;
  buffer.write(&image1x).or(Err("RUST_CREATE_OUTPUT_FILE_FAILED"))?;

  let size = big_endian_to_native(size2x + 8);
  buffer.write(b"ic13").or(Err("RUST_CREATE_OUTPUT_FILE_FAILED"))?;
  buffer.write(&size).or(Err("RUST_CREATE_OUTPUT_FILE_FAILED"))?;
  buffer.write(&image2x).or(Err("RUST_CREATE_OUTPUT_FILE_FAILED"))?;

  Ok(())
}