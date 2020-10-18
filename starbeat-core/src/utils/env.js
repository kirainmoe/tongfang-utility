import str from "../resource/string";

let kextstatRes = "";

// 检查 Kext 是否加载
export const isKextLoaded = (kextName) => {
  if (!window.electron.isMac()) return false;
  if (kextstatRes !== "") {
    return kextstatRes.indexOf(kextName) >= 0;
  }
  try {
    const proc = window.require("child_process");
    const stdout = proc.execSync(`kextstat`).toString();
    kextstatRes = stdout;
  } catch (err) {
    return false;
  }
  return kextstatRes.indexOf(kextName) >= 0;
};

// 检查 NVRAM 中是否存在参数
export const hasParam = (param) => {
  if (!window.electron.isMac()) return false;
  try {
    const proc = window.require("child_process");
    const stdout = proc.execSync(`nvram -p | grep "${param}"`).toString();
    return stdout !== "";
  } catch (err) {
    return false;
  }
};

// 获取 NVRAM 中的特定值
export const getNVRAMValue = (key) => {
  if (!window.electron.isMac()) return null;
  try {
    const cp = window.require("child_process");
    const stdout = cp.execSync(`nvram ${key}`).toString();
    return stdout.trim().replace(/\s+/g, " ").replace(/%00/g, "").replace(/%/g, "").split(" ")[1];
  } catch (err) {
    return null;
  }
};

// 辅助工具包是否下载
export const isAssistDownloaded = () => {
  const fs = window.electron.fs();
  const separator = window.electron.isWin() ? "\\" : "/",
    savePath = localStorage.getItem("tfu-app-path");
  if (
    fs.existsSync(`${savePath}${separator}itlwm.kext`) &&
    fs.existsSync(`${savePath}${separator}AirportItlwm-Catalina.kext`) &&
    fs.existsSync(`${savePath}${separator}AirportItlwm-BigSur.kext`) &&
    fs.existsSync(`${savePath}${separator}IntelBluetoothFirmware.kext`) &&
    fs.existsSync(`${savePath}${separator}version.json`)
  ) {
    const file = fs.readFileSync(`${savePath}${separator}version.json`);
    return file.toString();
  }
  return false;
};

// 无障碍语音包 VoiceOver 是否下载
export const isVoiceOverDownloaded = () => {
  const fs = window.electron.fs();
  const separator = window.electron.isWin() ? "\\" : "/",
    savePath = localStorage.getItem("tfu-app-path");
  if (
    fs.existsSync(`${savePath}${separator}Audio`) &&
    fs.existsSync(`${savePath}${separator}Audio${separator}AXEFIAudio_zh_CN_AccountLocked.wav`)
  ) {
    return true;
  }
  return false;
};

// 获取当前 EFI 版本
export const getCurrentVersionFromNVRAM = () => {
  if (!window.electron.isMac()) return str("unknown");
  try {
    const proc = window.require("child_process");
    const stdout = proc.execSync(`nvram -p`).toString();
    let match = stdout.trim().match(/efi-version=([^\s]+)/);
    if (match && match.length) return match[1];

    match = stdout.trim().match(/efi-version\s*([^\s]+)%00/);
    if (match && match.length) return match[1];
    return str("unknown");
  } catch (err) {
    console.log(err);
    return str("unknown");
  }
};
