import { notification } from 'antd';
import t from 'resources/i18n';
import store from 'stores';

export default async function getBuildYAMLInfo(address: string, hash: string | null) {
  if (!hash) {
    store.config.setYAML(address);
    return true;
  }

  await fetch(`${address}?timestap=${+new Date()}`, {
      cache: 'no-cache',
    })
    .then(res => res.text())
    .then(data => {
      store.config.setYAML(data);
      return true;
    })
    .catch((err) => {
      notification.error({
        message: t('CONFIG_FETCH_YAML_FAILED'),
        description: err,
      });
      return false;
    });
}
