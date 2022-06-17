import { invoke } from '@tauri-apps/api';
import { listen } from '@tauri-apps/api/event';
import { removeDir, removeFile, renameFile } from '@tauri-apps/api/fs';
import {
  Button,
  Progress,
  Notification,
  Modal,
  Message,
} from '@arco-design/web-react';
import BlockTitle from 'components/common/block-title';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import t from 'resources/i18n';
import getLocalDrivers from 'services/get-local-drivers';
import getRemoteDrivers from 'services/get-remote-drivers';
import { RootStoreContext } from 'stores';
import { DriverList, DriverPayload } from 'types/drivers';
import ensurePathExists from 'utils/ensure-path-exists';
import pathJoin from 'utils/path-join';
import {
  DownloadingProgressIndicator,
  DownloadSelectContainer,
  StyledSelect,
  ActionButtonGroup,
  DownloadProblemTags,
} from './styles';
import { LinkButton } from 'components/common/style';
import { openPage } from 'utils/open-directory';

const { Option } = StyledSelect;

const solutionLarkDocumentUrl = 'https://kirainmoe.feishu.cn/docx/doxcncWkdZXyC6Vtj7ctolfR52e';

interface ProgressUpdatePayload {
  total_size: number;
  downloaded_size: number;
}

function RemoteTab() {
  const [driversList, setDriverList] = useState<{
    [key: string]: string[];
  }>({
    wifi: [],
    bluetooth: [],
  });
  const [remoteDriversList, setRemoteDriversList] = useState<DriverList>({
    wifi: [],
    bluetooth: [],
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadingFile, setDownloadingFile] = useState('');
  const [progress, setProgress] = useState(0);
  const [wifiIndex, selectWiFiIndex] = useState(0);
  const [bluetoothIndex, selectBluetoothIndex] = useState(0);
  const [downloadingIndex, setDownloadingIndex] = useState(1);
  const [downloadingTotal, setDownloadingTotal] = useState(1);
  const { app } = useContext(RootStoreContext);

  const refreshLocalDrivers = () => {
    getLocalDrivers().then((payload) => {
      const temp = {
        wifi: payload.wifi.map(
          (item) => `${item.version}-${item.build}-${item.type}`
        ),
        bluetooth: payload.bluetooth.map(
          (item) => `${item.version}-${item.build}-${item.type}`
        ),
      };
      setDriverList(temp);
    });
  };

  useEffect(() => {
    refreshLocalDrivers();
    getRemoteDrivers().then(setRemoteDriversList);
  }, []);

  const isDownloaded = (
    category: 'wifi' | 'bluetooth',
    item: DriverPayload
  ) => {
    return (
      driversList[category].indexOf(
        `${item.version}-${item.build}-${item.type}`
      ) >= 0
    );
  };

  const handleDownload = async (
    category: 'wifi' | 'bluetooth',
    index: number
  ) => {
    try {
      const unlisten = await listen('download-progress-update', (event) => {
        const total_size = remoteDriversList[category][index].kexts[downloadingIndex].size;
        const { downloaded_size }: ProgressUpdatePayload =
          event.payload as ProgressUpdatePayload;
        setProgress(Math.floor((downloaded_size / total_size) * 100));
      });

      setIsDownloading(true);

      const item = remoteDriversList[category][index];
      const driverPath = pathJoin(app.appPath, 'drivers', `intel-${category}`);
      const versionPath = pathJoin(
        driverPath,
        `${item.version}-${item.build}-${item.type}`
      );

      const isExist = await invoke('file_exists', {
        path: versionPath,
      });
      if (isExist) {
        await removeDir(versionPath, {
          recursive: true,
        });
      }

      await ensurePathExists(versionPath);

      setDownloadingTotal(item.kexts.length);

      for (let index = 0; index < item.kexts.length; index++) {
        const kexts = item.kexts[index];
        const savePath = pathJoin(versionPath, `${kexts.name}_${kexts.os}.zip`);
        setDownloadingFile(kexts.download_url);
        setDownloadingIndex(index + 1);
        setProgress(0);

        await invoke('download_remote_file', {
          url: kexts.download_url,
          savePath,
        });

        await invoke('extract_to', {
          filepath: savePath,
          extractPath: versionPath,
        });

        const contents = await invoke('list_zip_contents', {
          filepath: savePath,
        });

        const extractBasePath = (contents as string[])[0];
        const entryPath = pathJoin(versionPath, kexts.os);
        const kextRealPath = pathJoin(entryPath, kexts.name);

        if (extractBasePath.endsWith('.kext') || extractBasePath.endsWith('.kext/')) {
          await ensurePathExists(entryPath);
          await renameFile(
            pathJoin(versionPath, extractBasePath),
            kextRealPath
          );
        } else {
          await renameFile(pathJoin(versionPath, extractBasePath), entryPath);
        }

        await removeFile(savePath);
      }

      setDownloadingIndex(0);
      setDownloadingTotal(0);
      setIsDownloading(false);
      unlisten();
      refreshLocalDrivers();
    } catch (err) {
      Notification.error({
        content: err as string,
      });

      setDownloadingIndex(0);
      setDownloadingTotal(0);
      setIsDownloading(false);
      refreshLocalDrivers();
    }
  };

  const handleDelete = async (
    category: 'wifi' | 'bluetooth',
    index: number
  ) => {
    Modal.confirm({
      title: t('DRIVERS_SURE_DELETE'),
      onOk: async () => {
        try {
          const item = remoteDriversList[category][index];
          const driverPath = pathJoin(
            app.appPath,
            'drivers',
            `intel-${category}`
          );
          const versionPath = pathJoin(
            driverPath,
            `${item.version}-${item.build}-${item.type}`
          );

          await removeDir(versionPath, {
            recursive: true,
          });

          Message.success(t('DRIVERS_DELETE_SUCCESS'));
          refreshLocalDrivers();
        } catch (err) {
          Notification.error({
            content: err as string,
          });
        }
      },
    });
  };

  const handleCancel = () => {
    setDownloadingIndex(0);
    setDownloadingTotal(0);
    setIsDownloading(false);
  };

  return (
    <>
      <BlockTitle title={t('DRIVERS_INTEL_WIFI')} />
      <DownloadSelectContainer>
        <StyledSelect
          defaultValue={0}
          minWidth={70}
          onChange={(v) => selectWiFiIndex(v as number)}
        >
          {remoteDriversList.wifi.map((item, key) => (
            <Option value={key} key={key}>
              {item.version} - {item.build} ({t(item.type.toUpperCase())}
              {isDownloaded('wifi', item) && `, ${t('DOWNLOADED')}`})
            </Option>
          ))}
        </StyledSelect>
        <Button
          className="download-btn"
          type="primary"
          disabled={isDownloading}
          onClick={() => handleDownload('wifi', wifiIndex)}
        >
          {t('DOWNLOAD')}
        </Button>

        <Button
          className="delete-btn"
          type="primary"
          status="danger"
          disabled={
            !remoteDriversList.wifi[wifiIndex]
              ? true
              : !isDownloaded('wifi', remoteDriversList.wifi[wifiIndex])
          }
          onClick={() => handleDelete('wifi', wifiIndex)}
        >
          {t('DELETE')}
        </Button>
      </DownloadSelectContainer>

      <BlockTitle title={t('DRIVERS_INTEL_BLUETOOTH')} />
      <DownloadSelectContainer>
        <StyledSelect
          defaultValue={0}
          minWidth={70}
          onChange={(v) => selectBluetoothIndex(v as number)}
        >
          {remoteDriversList.bluetooth.map((item, key) => (
            <Option value={key} key={key}>
              {item.version} - {item.build} ({t(item.type.toUpperCase())}
              {isDownloaded('bluetooth', item) && `, ${t('DOWNLOADED')}`})
            </Option>
          ))}
        </StyledSelect>

        <Button
          className="download-btn"
          type="primary"
          disabled={isDownloading}
          onClick={() => handleDownload('bluetooth', bluetoothIndex)}
        >
          {t('DOWNLOAD')}
        </Button>

        <Button
          className="delete-btn"
          type="primary"
          status="danger"
          disabled={
            !remoteDriversList.bluetooth[bluetoothIndex]
              ? true
              : !isDownloaded(
                  'bluetooth',
                  remoteDriversList.bluetooth[bluetoothIndex]
                )
          }
          onClick={() => handleDelete('bluetooth', bluetoothIndex)}
        >
          {t('DELETE')}
        </Button>
      </DownloadSelectContainer>

      <DownloadingProgressIndicator>
        <Progress
          percent={
            !isDownloading
              ? 0
              : downloadingTotal > 0
              ? Math.floor(
                  ((downloadingIndex - 1) / downloadingTotal) * 100 +
                    progress / downloadingTotal
                )
              : 0
          }
          animation={true}
        />

        <DownloadProblemTags>
          <LinkButton onClick={() => openPage(solutionLarkDocumentUrl)}>
            {t('DRIVER_DOWNLOAD_PROBLEM')}
          </LinkButton>
        </DownloadProblemTags>

        {isDownloading && (
          <>
            <span>
              <span className="downloading-tag">{t('DOWNLOADING')} </span>
              <span className="downloading-file-url">{downloadingFile}</span>
              <span className="downloading-progress">... {progress}% </span>
              <span className="downloading-total-files">
                (
                {t('DRIVERS_FILE_INDEX')
                  .replace(':index', String(downloadingIndex))
                  .replace(':total', String(downloadingTotal))}
                )
              </span>
            </span>

            <ActionButtonGroup>
              <Button onClick={handleCancel}>{t('DRIVERS_DOWNLOAD_CANCEL')}</Button>
            </ActionButtonGroup>
          </>
        )}
      </DownloadingProgressIndicator>
    </>
  );
}

export default observer(RemoteTab);
