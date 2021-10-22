extern crate cc;

fn main() {
  println!("cargo:rustc-link-lib=framework=IOKit");

  cc::Build::new()
    .file("src/smc/smc.c")
    .compile("libsmc.a");

  cc::Build::new()
    .file("src/macserial/UserPseudoRandom.c")
    .file("src/macserial/macserial.c")
    .compile("libmacserial.a");

  tauri_build::build()
}
