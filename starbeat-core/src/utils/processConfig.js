import Plist from "./plist";

const sleep = (time = 0) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const processConfig = async (workspace, saveFile, barebones, options) => {
  const path = window.require("path"),
    fs = window.require("fs"),
    extPath = localStorage.getItem("tfu-app-path");

  try {
    // extract OpenCore.zip
    window.electron.unzip(saveFile, path.join(workspace, "OpenCore"));
    let extractPath;
    fs.readdirSync(`${workspace}/OpenCore`).forEach((path) => {
      if (path.indexOf("ayamita") >= 0 || path.indexOf("hasee-tongfang-macos") >= 0)
        extractPath = path;
      else extractPath = ``;
    });

    // remove legacy directories
    window.electron.rmdir(`${workspace}/BOOT`);
    window.electron.rmdir(`${workspace}/OC`);
    await sleep(500);

    // move new directories
    await fs.rename(`${workspace}/OpenCore/${extractPath}/BOOT`, `${workspace}/BOOT`, () => {});
    await fs.rename(`${workspace}/OpenCore/${extractPath}/OC`, `${workspace}/OC`, () => {});
    await sleep(500);
    await fs.rename(
      `${workspace}/OpenCore/${extractPath}/Docs/Credits.md`,
      `${workspace}/OC/Credits.md`,
      () => {}
    );

    // move accessibility voiceover package
    if (options.accessibility) {
      window.electron.rmdir(`${workspace}/OC/Resources/Audio`);
      await sleep(500);
      window.electron.copyDir(path.join(extPath, "Audio"), `${workspace}/OC/Resources/Audio`);
    }

    // modify configs
    const OCPath = path.join(workspace, "OC");
    const content = window.electron.readFile(path.join(OCPath, "config.plist"));
    const plist = new Plist(content);

    // remove ssdt-uiac-files
    const ACPIPath = path.join(OCPath, "ACPI");
    const deleteUIAC = (reserve) => {
      const files = fs.readdirSync(ACPIPath);
      files.forEach((file) => {
        if (file.includes("SSDT-UIAC") && file !== reserve)
          fs.unlinkSync(path.join(ACPIPath, file));
      });
      fs.renameSync(path.join(ACPIPath, reserve), path.join(ACPIPath, "SSDT-UIAC.aml"));
    };

    // model customize
    switch (barebones[options.laptop]) {
      case "GK5CN5X":
      case "GK5CN6X":
      case "GK7CN6S":
      default:
        deleteUIAC("SSDT-UIAC.aml");
        break;
      case "GK5CN6Z":
        deleteUIAC("SSDT-UIAC-GK5CN6Z.aml");
        break;
      case "GJ5CN64":
      case "GI5CN54":
        deleteUIAC(`SSDT-UIAC-${barebones[options.laptop]}.aml`);
        plist.setAllKexts(["VoodooI2C", "VoodooGPIO"], false);
        plist.setKext("VoodooPS2Controller.kext/Contents/PlugIns/VoodooInput", true);
        plist.setSSDT("SSDT-USTP", false);
        break;
      case "GK7CP6R":
      case "GK5CP6V":
      case "GK5CP5V":
      case "GK5CR0V":
        deleteUIAC("SSDT-UIAC-GK7CP6R.aml");
        options.appleGuC = true;
        plist.setACPIPatch("RTC: enable", true);
        break;
      case "GK5CP6X":
      case "GK5CP6Z":
        deleteUIAC("SSDT-UIAC-GK5CP6X.aml");
        options.appleGuC = true;
        plist.setACPIPatch("RTC: enable", true);
        break;
      
      // 7th gen
      case "GJ5KN64":
      case "GJ5KN6A":
        plist.setSSDT("SSDT-UIAC", false);
        plist.setSSDT("SSDT-PMC", false);
        plist.setSSDT("SSDT-USTP", false);
        plist.setAllKexts(["VoodooI2C", "VoodooGPIO", "USBInjectAll"], false);
        plist.setKext("VoodooPS2Controller.kext/Contents/PlugIns/VoodooInput", true);
        await window.electron.copyDir(
          `${workspace}/OpenCore/${extractPath}/Compat/Kexts/USBPorts.kext`,
          `${workspace}/OC/Kexts/USBPorts.kext`
        );
        await window.electron.copyDir(
          `${workspace}/OpenCore/${extractPath}/Compat/Kexts/SATA-200-series-unsupported.kext`,
          `${workspace}/OC/Kexts/SATA-200-series-unsupported.kext`
        );
        await window.electron.copyDir(
          `${workspace}/OpenCore/${extractPath}/Compat/Kexts/AHCI_3rdParty_SATA.kext`,
          `${workspace}/OC/Kexts/AHCI_3rdParty_SATA.kext`
        );
        fs.unlinkSync(`${workspace}/OC/ACPI/SSDT-PNLF.aml`);
        fs.renameSync(`${workspace}/OpenCore/${extractPath}/Compat/ACPI/SSDT-PNLF.aml`, `${workspace}/OC/ACPI/SSDT-PNLF.aml`);
        plist.addKextToEnd('USBPorts', 'USB mapping for 7th gen devices', false, true);
        plist.addKextToEnd('AHCI_3rdParty_SATA', '200 series motherboard SATA patching', false, true);
        plist.addKextToEnd('SATA-200-series-unsupported', '200 series motherboard SATA patching', false, true);
        plist.setValue('Booter/Quirks/DevirtualiseMmio', false);
        plist.setValue('Booter/Quirks/DiscardHibernateMap', false);
        plist.setValue('Booter/Quirks/SyncRuntimePermissions', false);
        plist.setValue('Booter/Quirks/SetupVirtualMap', true);
        plist.deleteProperties("PciRoot(0x0)/Pci(0x1f,0x3)", "device-id");
        plist.setProperties("PciRoot(0x0)/Pci(0x2,0x0)", "AAPL,ig-platform-id", new Uint8Array([0, 0, 0x16, 0x19]));
        plist.setProperties("PciRoot(0x0)/Pci(0x2,0x0)", "device-id", new Uint8Array([0x16, 0x19, 0, 0]));
        plist.setBootArg("lilucpu=8 -disablegfxfirmware");
        break;
    }

    await sleep(1000);

    // wireless card
    switch (options.wirelessCard) {
      // 白果原装无线网卡只需要 AirportBrcmFixup.kext，不需要注入蓝牙驱动；正确注入 USB 端口信息即可驱动
      // 部分白果卡非国行，需要加入 brcmfx-country=#a 开启全部频段
      case "apple":
        plist.setKext("AirportBrcmFixup", true);
        if (navigator.language === "zh-CN") plist.setBootArg("brcmfx-country=CN");
        else plist.setBootArg("brcmfx-country=#a");
        break;

      // 博通（戴尔）的卡需要 AirportBrcmFixup.kext 和蓝牙固件上传驱动
      case "broadcom":
        plist.setAllKexts(
          ["AirportBrcmFixup", "BrcmBluetoothInjector", "BrcmFirmwareData", "BrcmPatchRAM3"],
          true
        );
        // 部分 DW1560 网卡如果使用 brcmfx-country=#a 会导致网速变慢
        // plist.setBootArg("brcmfx-country=#a");
        break;

      // Intel 网卡需要 IntelBluetoothFirmware.kext 和 itlwm.kext
      // 如果开启原生接口驱动则使用 AirportItlwm.kext
      case "intel":
      default:
        window.electron.copyDir(
          path.join(extPath, "IntelBluetoothFirmware.kext"),
          `${workspace}/OC/Kexts/IntelBluetoothFirmware.kext`
        );
        window.electron.copyDir(
          path.join(extPath, "IntelBluetoothInjector.kext"),
          `${workspace}/OC/Kexts/IntelBluetoothInjector.kext`
        );
        plist.setKext("IntelBluetooth", true);

        if (!options.useAirportItlwm) {
          window.electron.copyDir(
            path.join(extPath, "itlwm.kext"),
            `${workspace}/OC/Kexts/itlwm.kext`
          );
          plist.setKext("itlwm.kext", true);
        } else {
          if (options.osVersion === "catalina") {
            window.electron.copyDir(
              path.join(extPath, "AirportItlwm-Catalina.kext"),
              `${workspace}/OC/Kexts/AirportItlwm-Catalina.kext`
            );
            plist.setKext("AirportItlwm-Catalina", true);
          } else {
            window.electron.copyDir(
              path.join(extPath, "AirportItlwm-BigSur.kext"),
              `${workspace}/OC/Kexts/AirportItlwm-BigSur.kext`
            );
            plist.setKext("AirportItlwm-BigSur", true);
          }
        }
        break;
    }

    if (options.rndis) plist.setKext("HoRNDIS", true);
    if (options.disableNVMe) {
      plist.setSSDT("SSDT-DNVME", true);
      plist.setBootArg("-nvme-disabled");
    }
    if (options.accessibility) plist.setValue("Misc/Boot/PickerMode", "Builtin");
    if (!options.bootChime && !options.accessibility) {
      plist.setValue("Misc/Boot/PickerAudioAssist", false);
      plist.setValue("UEFI/Audio/PlayChime", "");
      plist.setValue("UEFI/Audio/AudioSupport", false);
      plist.deleteValue("UEFI/Drivers/4");
    }

    // macOS Big Sur 必须将 csr-active-config 设置成 00000000，否则无法检测到 macOS 更新
    if (options.osVersion === "bigsur")
      plist.setValue(
        "NVRAM/Add/7C436110-AB2A-4BBB-A880-FE41995C9F82/csr-active-config",
        new Uint8Array([0, 0, 0, 0])
      );

    if (options.cpuBestPerformance) {
      plist.setKext("CPUFriendDataProvider.kext", false);
      plist.setKext("CPUFriendDataProvider_Performance.kext", true);
    }

    const iGPUProperties = [
      ["enable-dpcd-max-link-rate-fix", [1, 0, 0, 0]],
      ["framebuffer-con0-enable", [1, 0, 0, 0]],
      ["framebuffer-con0-pipe", [18, 0, 0, 0]],
      ["framebuffer-con1-enable", [1, 0, 0, 0]],
      ["framebuffer-con1-pipe", [18, 0, 0, 0]],
      ["framebuffer-con2-enable", [1, 0, 0, 0]],
      ["framebuffer-con2-pipe", [18, 0, 0, 0]]
    ];

    if (options.resolution === "4k" || (options.resolution === "1080p144sol2" && options.osVersion === "bigsur")) {
      iGPUProperties.forEach(item => {
        plist.setProperties(
          "PciRoot(0x0)/Pci(0x2,0x0)",
          item[0],
          new Uint8Array(item[1])
        );
      });
    }

    if (options.resolution === "4k") {
      plist.setProperties(
        "PciRoot(0x0)/Pci(0x2,0x0)",
        "enable-hdmi20",
        new Uint8Array([1, 0, 0, 0])
      );
      plist.setProperties(
        "PciRoot(0x0)/Pci(0x2,0x0)",
        "enable-max-pixel-clock-override",
        new Uint8Array([1, 0, 0, 0])
      );      
      plist.setProperties(
        "PciRoot(0x0)/Pci(0x2,0x0)",
        "dpcd-max-link-rate",
        new Uint8Array([20, 0, 0, 0])
      );
      plist.deleteProperties("PciRoot(0x0)/Pci(0x2,0x0)", "framebuffer-stolenmem");
      plist.deleteProperties("PciRoot(0x0)/Pci(0x2,0x0)", "framebuffer-fbmem");

      plist.setValue("NVRAM/Add/4D1EDE05-38C7-4A6A-9CC6-4BCCA8B38C14/UIScale", new Uint8Array([2]));
    }

    if (options.appleGuC) plist.setBootArg("igfxfw=2");
    if (options.NVMeFix) plist.setKext("NVMeFix", true);
    if (options.useCompatACPI) {
      plist.setKext("SMCBatteryManager", false);
      plist.setKext("ACPIBatteryManager", true);
    }

    plist.setValue("PlatformInfo/Generic/SystemProductName", options.model);
    plist.setValue("PlatformInfo/Generic/SystemSerialNumber", options.sn);
    plist.setValue("PlatformInfo/Generic/MLB", options.mlb);
    plist.setValue("PlatformInfo/Generic/SystemUUID", options.smuuid);

    // record model info
    plist.setValue("NVRAM/Add/7C436110-AB2A-4BBB-A880-FE41995C9F82/efi-model", `model-${options.laptop}`);

    if (navigator.language !== "zh-CN") {
      plist.setValue("NVRAM/Add/7C436110-AB2A-4BBB-A880-FE41995C9F82/prev-lang:kbd", "en-US:0");
    }

    // set background
    if (options.customBackground) {
      const isICNS = options.backgroundFile.path.endsWith(".icns"),
        backgroundPath = options.backgroundFile.path;
      if (isICNS) {
        fs.copyFileSync(backgroundPath, `${workspace}/OC/Resources/Image/Background.icns`);
      } else {
        window.electron.convertPNGtoICNS(backgroundPath, `${workspace}/OC/Resources/Image/Background.icns`, workspace);
      }
    }

    window.electron.writeFile(
      path.join(path.join(workspace, "OC"), "config.plist"),
      plist.buildPlist()
    );
    fs.unlinkSync(path.join(workspace, "OpenCore.zip"));
    window.electron.rmdir(`${workspace}/OpenCore`);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default processConfig;
