import { ExclamationCircleOutlined } from '@ant-design/icons';
import { invoke } from '@tauri-apps/api';
import { listen } from '@tauri-apps/api/event';
import {
  readDir,
  readTextFile,
  removeDir,
  removeFile,
  writeFile,
} from '@tauri-apps/api/fs';
import { Modal } from 'antd';
import { ProcessStages } from 'components/config-page/processing';
import md5 from 'md5';
import plist from 'plist';
import t from 'resources/i18n';
import AppStore from 'stores/app-store';
import ConfigStore from 'stores/config-store';
import { EFIBuildAction } from 'types/efi-build-yaml';
import ensurePathExists from 'utils/ensure-path-exists';
import pathJoin from 'utils/path-join';
import { Buffer } from 'buffer';
import isNumeric from 'utils/is-numeric';
import UIStore from 'stores/ui-store';

if (!window.Buffer) {
  (window as any).Buffer = Buffer;
}

export interface ProcessEFIProps {
  app: AppStore;
  config: ConfigStore;
  ui: UIStore;
  setStage: (stage: ProcessStages) => void;
  setProgress: (progress: number) => void;
}

export interface ProgressUpdatePayload {
  total_size: number;
  downloaded_size: number;
}

const { confirm } = Modal;

export default async function processEFI({
  app,
  config,
  ui,
  setStage,
  setProgress,
}: ProcessEFIProps) {
  try {
    // 确认文件夹存在
    const efiDownloadPath = pathJoin(app.downloadPath, 'Tongfang_EFI');
    const savePath = pathJoin(efiDownloadPath, 'EFI.zip');
    const extractPath = pathJoin(efiDownloadPath, 'EFI');
    let extractRootPath = extractPath;
    await ensurePathExists(efiDownloadPath);

    // 监听下载进度
    const unlisten = await listen('download-progress-update', (event) => {
      type NewType = ProgressUpdatePayload;

      const { downloaded_size }: NewType =
        event.payload as ProgressUpdatePayload;
      setProgress(Math.floor((downloaded_size / (config.selectedEFI?.size || downloaded_size)) * 100));
    });

    // 下载 EFI 文件
    setStage(ProcessStages.DOWNLOAD);

    if (!config.isLocal) {
      try {
        await invoke('download_remote_file', {
          url: config.downloadSourceUrl,
          savePath,
        });
      } catch (err) {
        console.warn('Download failed, trying directly get...', err);

        await invoke('download_without_progress', {
          url: config.downloadSourceUrl,
          savePath,
        });
      }
    }
    setProgress(100);

    // 解压
    setStage(ProcessStages.UNZIP);
    const filelist: string[] = await invoke('list_zip_contents', {
      filepath: savePath,
    });
    await invoke('extract_to', {
      filepath: savePath,
      extractPath,
    });

    if (filelist.indexOf('build.yml') < 0) {
      extractRootPath = pathJoin(extractPath, filelist[0]);
    }

    // 定义路径
    const definedPath = {
      repoPath: extractPath,
      workspace: efiDownloadPath,
      driverPath: pathJoin(app.appPath, 'drivers'),
    };

    // 复制文件
    setStage(ProcessStages.COPY_FILES);

    await invoke('copy_dir', {
      src: pathJoin(extractRootPath, 'BOOT'),
      dst: pathJoin(efiDownloadPath, 'BOOT'),
    });
    await invoke('copy_dir', {
      src: pathJoin(extractRootPath, 'OC'),
      dst: pathJoin(efiDownloadPath, 'OC'),
    });

    // 检查文件哈希值
    const buildFileContent = await readTextFile(
      pathJoin(extractRootPath, 'build.yml')
    );
    const hashOfBuildFile = md5(buildFileContent);

    if (
      config.selectedEFI?.build_yaml_hash &&
      hashOfBuildFile !== config.selectedEFI?.build_yaml_hash
    ) {
      console.log(
        'Hash differs: ',
        config.selectedEFI?.build_yaml_hash,
        hashOfBuildFile
      );

      const shouldContinueWithRisk = await new Promise((resolve) => {
        confirm({
          title: t('CONFIG_BUILD_FILE_HASH_NOT_MATCH'),
          icon: <ExclamationCircleOutlined />,
          content: t('CONFIG_BUILD_FILE_HASH_NOT_MATCH_CONTENT'),
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });
      if (!shouldContinueWithRisk) {
        config.setStep(1);
        return;
      }
    }

    // 处理 config
    setStage(ProcessStages.PROCESS_CONFIG);

    const configPlistFile = await readTextFile(
      pathJoin(efiDownloadPath, 'OC', 'config.plist')
    );
    console.log(configPlistFile, Buffer);
    const opencoreConfig: any = plist.parse(configPlistFile);

    console.log(configPlistFile, opencoreConfig);

    const parseAction = async (item: EFIBuildAction) => {
      console.log('Test Condition: ', item.test);

      // 这里其实应该写一个 lexer + parser 来处理条件的，要不然挺危险的。
      // 不过懒得写了，第一版先 eval 吧。

      // eslint-disable-next-line
      const condition = eval(item.test);
      console.log('Test Result: ', condition);

      if (!condition) {
        return;
      }

      for (const action of item.action) {
        if (action.type === 'set-kext') {
          const patterns = [action.name].flat();
          for (const kext of opencoreConfig.Kernel.Add)
            for (const pattern of patterns)
              if (kext.BundlePath.includes(pattern))
                kext.Enabled = action.value;
        }

        if (action.type === 'set-ssdt') {
          const patterns = [action.name].flat();
          for (const acpi of opencoreConfig.ACPI.Add)
            for (const pattern of patterns)
              if (acpi.Path.includes(pattern)) acpi.Enabled = action.value;
        }

        if (action.type === 'set-config') {
          const paths = action.path.split('/');
          let ref = opencoreConfig;
          for (let i = 0; i < paths.length; i++) {
            if (isNumeric(paths[i])) {
              paths[i] = parseInt(paths[i]);
            }
            if (
              i !== paths.length - 1 &&
              typeof ref[paths[i]] === 'undefined'
            ) {
              return false;
            }
            if (i !== paths.length - 1) ref = ref[paths[i]];
            else ref[paths[i]] = action.value;
          }
        }

        if (action.type === 'delete-config') {
          const paths = action.path.split('/');
          let ref = opencoreConfig;
          for (let i = 0; i < paths.length; i++) {
            if (isNumeric(paths[i])) {
              paths[i] = parseInt(paths[i]);
            }
            if (
              i !== paths.length - 1 &&
              typeof ref[paths[i]] === 'undefined'
            ) {
              return false;
            }
            if (i !== paths.length - 1) ref = ref[paths[i]];
            else delete ref[paths[i]];
          }
        }

        if (action.type === 'copy-dir') {
          const replacer = (str: string) =>
            str
              .replace(/\$repoPath/g, definedPath.repoPath)
              .replace(/\$workspace/g, definedPath.workspace)
              .replace(/\$driverPath/g, definedPath.driverPath)
              .replace(/\$wifiDriverVersion/g, app.defaultDriverVersion.wifi)
              .replace(
                /\$bluetoothDriverVersion/g,
                app.defaultDriverVersion.bluetooth
              )
              .replace(/\$osVersion/g, config.osVersion);

          const src = replacer(action.source);
          const dst = replacer(action.destination);
          await invoke('copy_dir', { src, dst });
        }

        if (action.type === 'add-kext') {
          const item = {
            Arch: 'Any',
            BundlePath: action.name,
            Comment: action.comment || '',
            Enabled: true,
            MaxKernel: action.maxKernel || '',
            MinKernel: action.minKernel || '',
            ExecutablePath: action.executable
              ? action.executable === true
                ? `Contents/MacOS/${action.name}`
                : action.executable
              : '',
            PlistPath: action.plistPath
              ? action.plistPath === true
                ? `Contents/Info.plist`
                : action.plistPath
              : '',
          };

          opencoreConfig.Kernel.Add.push(item);
        }

        if (action.type === 'set-device-properties') {
          const addItem = (item: any) => {
            opencoreConfig.DeviceProperties.Add[action.path][item.key]! =
              (() => {
                switch (item.valueType) {
                  case 'DATA':
                    return new Uint8Array([item.value].flat());
                  case 'STRING':
                  case 'NUMBER':
                    return item.value;
                }
              })();
          };

          if (action.key !== undefined && action.value !== undefined) {
            addItem(action);
          } else if (action.pairs) {
            for (const item of action.pairs) addItem(item);
          }
        }

        if (action.type === 'remove-device-properties') {
          delete opencoreConfig.DeviceProperties.Add[action.path][action.key];
        }

        if (action.type === 'add-boot-arguments') {
          opencoreConfig.NVRAM.Add['7C436110-AB2A-4BBB-A880-FE41995C9F82'][
            'boot-args'
          ] += ` ${action.value}`;
        }

        if (action.type === 'set-nvram-var') {
          opencoreConfig.NVRAM.Add['7C436110-AB2A-4BBB-A880-FE41995C9F82'][
            action.name
          ] = action.value;
        }
      }

      if (item.children) {
        for (const subitem of item.children) await parseAction(subitem);
      }

      console.log(opencoreConfig);
    };

    const buildActions = config.yamlInfo?.['build-actions']!;
    for (const action of buildActions) {
      await parseAction(action);
    }

    // 设置 SMBIOS
    opencoreConfig.PlatformInfo.Generic.MLB = config.SMBIOSInfo.mlb;
    opencoreConfig.PlatformInfo.Generic.SystemProductName =
      config.SMBIOSInfo.model;
    opencoreConfig.PlatformInfo.Generic.SystemSerialNumber =
      config.SMBIOSInfo.sn;
    opencoreConfig.PlatformInfo.Generic.SystemUUID = config.SMBIOSInfo.smuuid;

    // 保存 SMBIOS
    localStorage.setItem('tfu-efi-smbios', JSON.stringify(config.SMBIOSInfo));

    // 设置自定义引导参数
    opencoreConfig.NVRAM.Add['7C436110-AB2A-4BBB-A880-FE41995C9F82'][
      'boot-args'
    ] += ` ${config.bootArgs}`;

    // 设置背景
    if (config.useCustomBackground) {
      setStage(ProcessStages.PARSE_IMAGE);
      // 图片缩放
      await invoke('create_icns', {
        input: config.customBackgroundPath,
        output: pathJoin(
          efiDownloadPath,
          'OC',
          'Resources',
          'Image',
          'AmiTech',
          'Solitary',
          'Background.icns'
        ),
      });
    }

    setStage(ProcessStages.CLEAN_UP);

    // 最简化 config
    if (config.simplifyConfig) {
      const isContain = (name: string, pattern: string[]) => {
        for (const temp of pattern) {
          if (temp.includes(name)) return true;
        }
        return false;
      };

      // 处理未启用的 kexts
      const kextsList = await readDir(pathJoin(efiDownloadPath, 'OC', 'Kexts'));
      opencoreConfig.Kernel.Add = opencoreConfig.Kernel.Add.filter(
        (item: any) => item.Enabled === true
      );
      const enabledKextNames = opencoreConfig.Kernel.Add.map(
        (item: any) => item.BundlePath
      );
      for (const kext of kextsList) {
        const name = kext.name as string;
        if (!isContain(name, enabledKextNames)) {
          await removeDir(kext.path, { recursive: true });
        }
      }

      // 处理未启用的 ACPI 补丁
      const acpiList = await readDir(pathJoin(efiDownloadPath, 'OC', 'ACPI'));
      opencoreConfig.ACPI.Add = opencoreConfig.ACPI.Add.filter(
        (item: any) => item.Enabled === true
      );
      const enabledACPINames = opencoreConfig.ACPI.Add.map(
        (item: any) => item.Path
      );
      for (const acpi of acpiList) {
        const name = acpi.name as string;
        if (!isContain(name, enabledACPINames)) {
          await removeFile(acpi.path);
        }
      }
    }

    // 设置 vendor, product 信息
    opencoreConfig.NVRAM.Add['7C436110-AB2A-4BBB-A880-FE41995C9F82'][
      'laptop-vendor'
    ] = ` ${config.vendor}`;
    opencoreConfig.NVRAM.Add['7C436110-AB2A-4BBB-A880-FE41995C9F82'][
      'laptop-product'
    ] = ` ${config.product}`;

    // 保存 config.plist
    const configString = plist
      .build(opencoreConfig)
      .replace(/<data\/>/g, '<data></data>');
    await writeFile({
      path: pathJoin(efiDownloadPath, 'OC', 'config.plist'),
      contents: configString,
    });

    // 删除下载临时文件
    await removeDir(extractPath, { recursive: true });
    await removeFile(savePath);

    // 完成，取消监听
    unlisten();

    // 下一步
    config.nextStep();
  } catch (err) {
    console.error(err);
    throw err;
  }
}
