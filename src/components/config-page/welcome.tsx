import BlockTitle from 'components/common/block-title';
import IconContainer from 'components/common/icon-container';
import { LinkButton, MainContentContainer } from 'components/common/style';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import t from 'resources/i18n';
import { BluetoothIcon, MotherboardIcon, WiFiIcon } from 'resources/icons';
import { ComponentVersionContainer, ComponentVersionItem } from './style';
import { Modal, Table, Tag, Notification } from '@arco-design/web-react';
import { EFIReleasePayload } from 'types/efi-release';
import getEfiReleases from 'services/get-efi-releases';
import { openInfoModal } from 'utils/open-modal';
import ActionButtons from 'components/common/action-buttons';
import getBuildYAMLInfo from 'services/get-build-yaml-info';
import { RootStoreContext } from 'stores';
import appConfig from 'common/appconfig';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getSMBIOSInfo } from 'services/get-smbios-info';
import { useHistory } from 'react-router';

const { confirm } = Modal;

const efiReleaseTableColumns = [
  {
    title: t('VERSION'),
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: t('RELEASE_ID'),
    dataIndex: 'build',
    key: 'build',
  },
  {
    title: t('BASED_OC_VERSION'),
    dataIndex: 'based_oc_version',
    key: 'based_oc_version',
  },
  {
    title: t('RELEASE_TYPE'),
    dataIndex: 'release_type',
    key: 'release_type',
    render: (releaseType: number) => {
      const typeString = [t('STABLE'), t('BETA'), t('ALPHA'), t('NIGHTLY'), t('LOCAL_VERSION')][
        releaseType
      ];
      const typeColor = ['green', 'arcoblue', 'orange', 'volcano', 'magenta'][releaseType];
      return <Tag color={typeColor}>{typeString}</Tag>;
    },
  },
  {
    title: t('RELEASE_NOTE'),
    dataIndex: 'release_note',
    key: 'release_note',
    render: (releaseNote: string) => (
      <LinkButton
        onClick={() => openInfoModal(t('RELEASE_NOTE')!, releaseNote)}
      >
        {t('WELCOME_READ_RELEASE_NOTE')}
      </LinkButton>
    ),
  },
];

function Welcome() {
  const [isFetching, setIsFetching] = useState(true);
  const [nextLoading, setNextLoading] = useState(false);
  const [releaseList, setReleaseList] = useState<EFIReleasePayload[]>([]);
  const [selectedRow, setSelectedRow] = useState<any>([0]);
  const history = useHistory();

  const { app, config } = useContext(RootStoreContext);

  useEffect(() => {
    getEfiReleases().then((payload) => {
      setReleaseList(payload);
      setIsFetching(false);
    });

    getSMBIOSInfo()
  }, []);

  const onNext = async () => {
    if (!releaseList.length) {
      return;
    }

    const selected = releaseList[selectedRow[0]];
    // check utility version
    if (selected.required_utility_build > appConfig.build) {
      Notification.warning({
        title: t('CONFIG_UTILITY_VERSION_NOT_SATISFIED')!,
        content: (
          <>
            <p>
              {t('CONFIG_UTILITY_VERSION_NOT_SATISFIED_CONTENT')!
                .replace(':efi_version', selected.version)
                .replace(':utility_version', selected.required_utility_version)
                .replace(
                  ':utility_build',
                  selected.required_utility_build.toString()
                )
                .replace(':local_utility_version', appConfig.version)
                .replace(':local_utility_build', appConfig.build.toString())}
            </p>
            <div>
              <LinkButton>{t('CONFIG_GO_TO_UPGRADE')}</LinkButton>
            </div>
          </>
        ),
      });
      return;
    }
    config.setSelected(selected);
    

    setNextLoading(true);
    try {
      await getBuildYAMLInfo(selected.build_yaml_url, selected.build_yaml_hash);
    } catch(err) {
      setNextLoading(false);
      return;
    }

    // check build.yml hash
    if (selected.build_yaml_hash && selected.build_yaml_hash !== config.buildYAMLhash) {
      console.log('Hash differs:', selected.build_yaml_hash, config.buildYAMLhash);
      const shouldContinueWithRisk = await(
        new Promise((resolve) => {
          confirm({
            title: ` ${t('CONFIG_BUILD_FILE_HASH_NOT_MATCH')}`,
            icon: <ExclamationCircleOutlined />,
            content: t('CONFIG_BUILD_FILE_HASH_NOT_MATCH_CONTENT'),
            onOk() {
              resolve(true);
            },
            onCancel() {
              resolve(false);
            },
          });
        })
      );
      if (!shouldContinueWithRisk) {
        setNextLoading(false);
        return;
      }
    }

    setNextLoading(false);
    config.nextStep();
  };

  return (
    <MainContentContainer>
      <BlockTitle title={t('WELCOME_CHECK_COMPONENT_VERSION')!} />
      <ComponentVersionContainer>
        <ComponentVersionItem>
          <IconContainer
            width={20}
            height={20}
            icon={<MotherboardIcon />}
            scale={0.9}
          />
          <span>
            <b>{t('WELCOME_CURRENT_EFI_VERSION')}</b>
          </span>
          <p>
            {app.currentEFIVersion ||
              (app.platform === 'windows'
                ? t('WELCOME_ON_WINDOWS')
                : t('UNKNOWN'))}
          </p>
        </ComponentVersionItem>

        <ComponentVersionItem onClick={() => history.push('/drivers')}>
          <IconContainer width={20} height={20} icon={<WiFiIcon />} />
          <span>
            <b>{t('WELCOME_INTEL_WIFI_VERSION')}</b>
          </span>
          <p className="version">
            {app.defaultDriverVersion.wifi !== 'null'
              ? app.defaultDriverVersion.wifi
              : t('NOT_SPEFICIED')}
          </p>
          <p className="action">{t('WELCOME_MANAGE_VERSION')}</p>
        </ComponentVersionItem>

        <ComponentVersionItem onClick={() => history.push('/drivers')}>
          <IconContainer width={20} height={20} icon={<BluetoothIcon />} />
          <span>
            <b>{t('WELCOME_INTEL_BLUETOOTH_VERSION')}</b>
          </span>
          <p className="version">
            {app.defaultDriverVersion.bluetooth !== 'null'
              ? app.defaultDriverVersion.bluetooth
              : t('NOT_SPEFICIED')}
          </p>
          <p className="action">{t('WELCOME_MANAGE_VERSION')}</p>
        </ComponentVersionItem>
      </ComponentVersionContainer>

      <BlockTitle title={t('WELCOME_EFI_RELEASE_LIST')!} />
      <Table
        columns={efiReleaseTableColumns}
        data={releaseList.map((release, id) => ({
          id,
          ...release,
        }))}
        loading={isFetching}
        scroll={{ y: 200 }}
        rowKey="id"
        rowSelection={{
          selectedRowKeys: selectedRow,
          onChange: setSelectedRow,
          type: 'radio',
        }}
        style={{ margin: '20px 10px 0 10px' }}
        pagination={false}
      />
      <ActionButtons onNext={onNext} nextLoading={nextLoading} />
    </MainContentContainer>
  );
}

export default observer(Welcome);
