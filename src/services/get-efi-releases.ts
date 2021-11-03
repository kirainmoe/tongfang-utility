import { invoke } from "@tauri-apps/api";
import axios from "axios";
import yaml from 'js-yaml';
import t from "resources/i18n";

import store from "stores";
import { EFIBuildYaml } from "types/efi-build-yaml";
import { EFIReleasePayload, EFIReleaseType } from "types/efi-release";
import pathJoin from "utils/path-join";

export default function getEfiReleases(featureGate: number = EFIReleaseType.STABLE): Promise<EFIReleasePayload[]> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      let payload: EFIReleasePayload[] = [];

      try {
        await (
          axios.get(store.app.getMirroredUrl(`api/efi/release?feature_gate=${featureGate}`))
            .then(res => {
              if (res.data.code === 0) {
                payload = payload.concat(res.data.payload);
              }
            })
        );
      } catch(err) {
        console.error(err);
      }

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
                require_utility_version: 'Unknown',
                require_utility_build: yamlContent['require-utility-build'],
                release_note: t('CONFIG_THIS_IS_A_LOCAL_BUILD'),
                build_yaml_url: buildFileContent,
                build_yaml_hash: null,
                download_sources: [],
                size: 1,
              });
            }
          }
        } catch(err) {
          console.error(err);
        }
      }

      resolve(payload);
    }, 0);
  });
}
