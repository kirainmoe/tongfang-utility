import { observer } from 'mobx-react-lite';

import { message, Select } from "antd";
import ActionButtons from "components/common/action-buttons";
import BlockTitle from "components/common/block-title";
import { useContext, useEffect, useState } from "react";
import t from "resources/i18n";

import getLocalDrivers from "services/get-local-drivers";
import { RootStoreContext } from "stores";
import { DriverList } from "types/drivers";
import { StyledSelect } from "./styles";

const { Option } = Select;

function LocalTab() {
  const [driversList, setDriverList] = useState<DriverList>({
    wifi: [],
    bluetooth: [],
  });

  const { app } = useContext(RootStoreContext);
  const [defaultWiFiVersion, setDefaultWiFiVersion] = useState(String(app.defaultDriverVersion.wifi));
  const [defaultBluetoothVersion, setDefaultBluetoothVersion] = useState(String(app.defaultDriverVersion.bluetooth));

  const onApply = () => {
    app.setDefaultDriverVersion('wifi', defaultWiFiVersion);
    app.setDefaultDriverVersion('bluetooth', defaultBluetoothVersion);
    
    message.success(t('DRIVERS_SET_DEFAULT_VERSION_SUCCESS'));
  };

  const onDelete = () => {

  };

  useEffect(() => {
    getLocalDrivers().then(setDriverList);
  }, []);

  return (
    <>
      <BlockTitle title={t('DRIVERS_INTEL_WIFI')} />
      <StyledSelect 
        onChange={v => setDefaultWiFiVersion(v as string)} 
        defaultValue={String(app.defaultDriverVersion.wifi)}>
        <Option value={'null'}>
          {t('DRIVERS_DEFAULT_VERSION_NOT_SELECTED')}
        </Option>

        {driversList.wifi.map((item, key) => (
          <Option
            key={key}
            value={`${item.version}-${item.build}-${item.type}`}
          >
            {item.version} - {item.build} ({t(item.type.toUpperCase())})
          </Option>
        ))}
      </StyledSelect>

      <BlockTitle title={t('DRIVERS_INTEL_BLUETOOTH')} />
      <StyledSelect
        onChange={v => setDefaultBluetoothVersion(v as string)} 
        defaultValue={String(app.defaultDriverVersion.bluetooth)}>
        <Option value={'null'}>
          {t('DRIVERS_DEFAULT_VERSION_NOT_SELECTED')}
        </Option>

        {driversList.bluetooth.map((item, key) => (
          <Option
            key={key}
            value={`${item.version}-${item.build}-${item.type}`}
          >
            {item.version} - {item.build} ({t(item.type.toUpperCase())})
          </Option>
        ))}
      </StyledSelect>

      <ActionButtons 
        prevText={t('DRIVERS_CLEAR_CACHE')}
        nextText={t('APPLY')} 
        canPrev={true}
        canNext={true}
        onPrev={onDelete}
        onNext={onApply}
      />
    </>
  );
}

export default observer(LocalTab);
