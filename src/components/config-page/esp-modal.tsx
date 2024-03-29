import { invoke } from "@tauri-apps/api";
import { copyFile, removeDir, renameFile } from "@tauri-apps/api/fs";
import { Message, Modal } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import t from "resources/i18n";
import { DiskIcon } from "resources/icons";
import ensurePathExists from "utils/ensure-path-exists";
import { EfiSystemPartition, listEfiSystemPartitions, mountEfiSystemPartition } from "utils/esp-utils";
import { fileExists } from "utils/file-exists";
import pathJoin from "utils/path-join";
import { ESPItem } from "./style";
import { execute } from "utils/execute";

export interface ESPModalProps {
  downloadPath: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const { confirm } = Modal;

function ESPModal({ downloadPath, visible, setVisible }: ESPModalProps) {
  const [partitions, setPartitions] = useState<EfiSystemPartition[]>([]);

  const confirmReplacement = async (name: string, identifier: string) => {
    try {
      const shouldReplace = await new Promise((resolve) => {
        confirm({
          content: t('DONE_REPLACE_ESP_CONFIRM')
            .replace(':name', name)
            .replace(':identifier', identifier),
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
          okText: t('OK'),
          cancelText: t('CANCEL'),
        });
      });
      if (!shouldReplace) {
        return;
      }
      const mountPoint = '/tmp/tongfang-efi';
      const mountResult = await mountEfiSystemPartition(
        identifier,
        mountPoint
      );
      if (!mountResult) {
        return;
      }
      console.log('[log] mount ESP success.');

      const efiPath = pathJoin(mountPoint, 'EFI');
      const bootPath = pathJoin(efiPath, 'BOOT');
      const ocPath = pathJoin(efiPath, 'OC');
      const backupPath = pathJoin(efiPath, 'OC_Backup');

      await ensurePathExists(efiPath);
      await ensurePathExists(bootPath);

      const hasWindowsOrOpenCoreEfi =
        (await fileExists(pathJoin(efiPath, 'Microsoft'))) ||
        (await fileExists(pathJoin(bootPath, 'OpenCore.efi')));
      const bootEfiFileName = hasWindowsOrOpenCoreEfi
        ? 'OpenCore.efi'
        : 'BOOTx64.efi';
      await copyFile(
        pathJoin(downloadPath, 'Tongfang_EFI', 'BOOT', 'BOOTx64.efi'),
        pathJoin(bootPath, bootEfiFileName)
      );

      console.log('[log] copy BOOTx64.efi OK.');

      try {
        const hasBackup = await fileExists(backupPath);
        if (hasBackup) {
          console.log('[log] backup of older version was found.');
          await removeDir(backupPath, { recursive: true });
          await fileExists(backupPath);
        } 
      } catch(err) {
        // use shell command as alternative
        await execute('sh', ['-c', `rm -r ${backupPath}`]);
      }

      console.log('[log] old backup removed.');
      try {
        const hasOC = await fileExists(ocPath);
        if (hasOC) {
          console.log(await fileExists(backupPath));
          console.log('[log] backup current version...');
          await renameFile(ocPath, backupPath);
        }
      } catch(err) {
        await execute('sh', ['-c', `mv ${ocPath} ${backupPath}`]);
      }
      
      console.log(pathJoin(downloadPath, 'Tongfang_EFI', 'OC'), ocPath);

      await invoke('copy_dir', {
        src: pathJoin(downloadPath, 'Tongfang_EFI', 'OC'),
        dst: ocPath,
      });

      console.log('[log] copy OpenCore directory OK.');

      Message.success(t('DONE_REPLACE_ESP_SUCCESS'));
      setVisible(false);
    } catch (err) {
      Modal.error({
        title: t('FAILED'),
        content: t('DONE_REPLACE_ESP_FAILED'),
      });

      console.error(err);
    }
  };

  
  useEffect(() => {
    listEfiSystemPartitions().then(setPartitions);
  }, []);

  return (
    <Modal
      title={t('DONE_SELECT_TARGET_ESP')}
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      {partitions.map((part, index) => (
        <ESPItem
          key={index}
          onClick={() => confirmReplacement(part.name, part.identifier)}
        >
          <div className="icon">
            <DiskIcon />
          </div>
          <div>
            <div className="name-size">
              {part.name} ({part.size})
            </div>
            <div className="identifier">{part.identifier}</div>
          </div>
        </ESPItem>
      ))}
    </Modal>
  );
}

export default ESPModal;