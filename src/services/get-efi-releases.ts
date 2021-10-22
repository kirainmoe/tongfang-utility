import { invoke } from "@tauri-apps/api";
import yaml from 'js-yaml';
import t from "resources/i18n";

import store from "stores";
import { EFIBuildYaml } from "types/efi-build-yaml";
import { EFIReleasePayload, EFIReleaseType } from "types/efi-release";
import pathJoin from "utils/path-join";

export default function getEfiReleases(featureGate: number = EFIReleaseType.STABLE): Promise<EFIReleasePayload[]> {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const payload: EFIReleasePayload[] = [
        {
          version: '21.9.29',
          build: 2109290,
          release_type: EFIReleaseType.BETA,
          based_oc_version: '0.7.4',
          required_utility_version: '4.0.0',
          required_utility_build: 2109180,
          release_note: '<h1>This is a pre-release.</h1>',
          build_yaml_url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos@21.9.29/build.yml',
          build_yaml_hash: '6798a8170dcff7d2c73f012915d0e924',
          download_sources: [
            {
              source_name: 'jsdelivr',
              url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos-build@master/hasee-tongfang-macos-21.9.29.js',
            },
            {
              source_name: 'github',
              url: 'https://github.com/kirainmoe/hasee-tongfang-macos/archive/refs/tags/21.9.28.zip',
            },
            {
              source_name: 'bitbucket',
              url: 'https://bitbucket.com/kirainmoe/hasee-tongfang-macos/archive/refs/tags/21.6.8.zip',
            },
          ]
        },
        {
          version: '21.9.14',
          build: 2109140,
          release_type: EFIReleaseType.BETA,
          based_oc_version: '0.7.3',
          required_utility_version: '4.0.0',
          required_utility_build: 2109180,
          release_note: '<h1>This is a pre-release.</h1>',
          build_yaml_url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos@21.9.15/build.yml',
          build_yaml_hash: '130bb65aeb7d8f799866902f438fcbf5',
          download_sources: [
            {
              source_name: 'jsdelivr',
              url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos-build@master/hasee-tongfang-macos-21.9.15.js',
            },
            {
              source_name: 'github',
              url: 'https://github.com/kirainmoe/hasee-tongfang-macos/archive/refs/tags/21.6.8.zip',
            },
            {
              source_name: 'bitbucket',
              url: 'https://bitbucket.com/kirainmoe/hasee-tongfang-macos/archive/refs/tags/21.6.8.zip',
            },
          ]
        },
        {
          version: '21.6.8',
          build: 2106080,
          release_type: EFIReleaseType.STABLE,
          based_oc_version: '0.6.9',
          required_utility_version: '4.0.0',
          required_utility_build: 2109200,
          release_note: '<h1>This is a pre-release.</h1>',
          build_yaml_url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos@latest/build.yml',
          build_yaml_hash: '8d0d8a5616ef7860079c30d9d6976ea8',
          download_sources: [
            {
              source_name: 'jsdelivr',
              url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos-build@master/hasee-tongfang-macos-21.9.15.js',
            },
            {
              source_name: 'github',
              url: 'https://github.com/kirainmoe/hasee-tongfang-macos/archive/refs/tags/21.6.8.zip',
            }
          ]
        },
        {
          version: '21.6.8',
          build: 2106070,
          release_type: EFIReleaseType.STABLE,
          based_oc_version: '0.6.9',
          required_utility_version: '4.0.0',
          required_utility_build: 2109180,
          release_note: '<h1>This is a pre-release.</h1>',
          build_yaml_url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos@latest/build.yml',
          build_yaml_hash: '8d0d8a5616ef7860079c30d9d6976ea8',
          download_sources: [
            {
              source_name: 'jsdelivr',
              url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos-build@master/hasee-tongfang-macos-21.9.15.js',
            },
            {
              source_name: 'github',
              url: 'https://github.com/kirainmoe/hasee-tongfang-macos/archive/refs/tags/21.6.8.zip',
            }
          ]
        },        {
          version: '21.6.8',
          build: 2106060,
          release_type: EFIReleaseType.STABLE,
          based_oc_version: '0.6.9',
          required_utility_version: '4.0.0',
          required_utility_build: 2109180,
          release_note: '<h1>This is a pre-release.</h1>',
          build_yaml_url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos@latest/build.yml',
          build_yaml_hash: '8d0d8a5616ef7860079c30d9d6976ea8',
          download_sources: [
            {
              source_name: 'jsdelivr',
              url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos-build@master/hasee-tongfang-macos-21.9.15.js',
            },
            {
              source_name: 'github',
              url: 'https://github.com/kirainmoe/hasee-tongfang-macos/archive/refs/tags/21.6.8.zip',
            }
          ]
        },        
        {
          version: '21.6.8',
          build: 2106050,
          release_type: EFIReleaseType.STABLE,
          based_oc_version: '0.6.9',
          required_utility_version: '4.0.0',
          required_utility_build: 2109180,
          release_note: '<h1>This is a pre-release.</h1>',
          build_yaml_url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos@latest/build.yml',
          build_yaml_hash: '8d0d8a5616ef7860079c30d9d6976ea8',
          download_sources: [
            {
              source_name: 'jsdelivr',
              url: 'https://cdn.jsdelivr.net/gh/kirainmoe/hasee-tongfang-macos-build@master/hasee-tongfang-macos-21.9.15.js',
            },
            {
              source_name: 'github',
              url: 'https://github.com/kirainmoe/hasee-tongfang-macos/archive/refs/tags/21.6.8.zip',
            }
          ]
        },
      ];

      // 检测本地 EFI
      const localZipPath = pathJoin(store.app.downloadPath, 'Tongfang_EFI', 'EFI.zip');
      const isExistLocalVersion = await invoke('file_exists', {
        path: localZipPath,
      });

      if (isExistLocalVersion) {
        try {
          const fileList: string[] = await invoke('list_zip_contents', {
            filepath: localZipPath,
          });
  
          if (fileList.length) {
            const basePath = fileList[0];
            const buildYamlFile = basePath + 'build.yml';
            if (fileList.indexOf(buildYamlFile) >= 0) {
              const buildFileContent: string = await invoke('read_zip_file_content', {
                filepath: localZipPath,
                filename: buildYamlFile,
              });
              const yamlContent = yaml.load(buildFileContent) as EFIBuildYaml;
              payload.push({
                version: yamlContent["efi-version"],
                build: yamlContent["efi-build"],
                release_type: EFIReleaseType.LOCAL,
                based_oc_version: yamlContent["opencore-version"],
                required_utility_version: 'Unknown',
                required_utility_build: yamlContent['require-utility-build'],
                release_note: t('CONFIG_THIS_IS_A_LOCAL_BUILD'),
                build_yaml_url: buildFileContent,
                build_yaml_hash: null,
                download_sources: [],
              });
            }
          }
        } catch(err) {}
      }

      resolve(payload);
    }, 1000);
  });
}
