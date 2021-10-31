import { useContext, useMemo, useState } from 'react';
import { Tabs } from '@arco-design/web-react';
import cn from 'classnames';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';


import ActionButtons from 'components/common/action-buttons';
import BlockTitle from 'components/common/block-title';
import { MainContentContainer } from 'components/common/style';

import t from 'resources/i18n';
import { RootStoreContext } from 'stores';
import { EFISupportModel } from 'types/efi-build-yaml';

import {
  CurrentSelected,
  ModelSelectorGridItem,
  ModelSelectorGrids,
  ModelSelectorGroup,
  ModelSelectorTab,
  ModelSelectorTitle,
  SearchInput,
  SelectedModelTag,
} from './style';

const { TabPane } = Tabs;

function ModelSelector() {
  const { config } = useContext(RootStoreContext);
  const [condition, setConndition] = useState<string>('');
  const models = config.yamlInfo?.['support-models'];
  const list = toJS(models)!;

  const modelsGroupByVendor = useMemo(() => {
    if (!list?.length) {
      return {};
    }
    let modelsGroupByVendor: any = {};
    list.forEach((item, index) => {
      if (!modelsGroupByVendor[item.vendor]) {
        modelsGroupByVendor[item.vendor] = [
          {
            ...item,
            index,
          },
        ];
      } else {
        modelsGroupByVendor[item.vendor].push({
          ...item,
          index,
        });
      }
    });
    return modelsGroupByVendor;
  }, [list]);

  const modelsGroupByBarebone = useMemo(() => {
    if (!list?.length) {
      return {};
    }
    let modelsGroupByBarebone: any = {};
    list.forEach((item, index) => {
      const barebones = [item.barebones].flat();
      for (const barebone of barebones) {
        if (!modelsGroupByBarebone[barebone]) {
          modelsGroupByBarebone[barebone] = [
            {
              ...item,
              index,
            },
          ];
        } else {
          modelsGroupByBarebone[barebone].push({
            ...item,
            index,
          });
        }
      }
    });
    return modelsGroupByBarebone;
  }, [list]);

  interface EFISupportModelItem extends EFISupportModel {
    index: number;
  }

  const renderModelItems = (
    dataSource: { [key: string]: EFISupportModelItem[] },
    useTranslation: boolean = false
  ) => {
    const result = [];

    for (const key in dataSource) {
      if (dataSource.hasOwnProperty(key)) {
        const data = dataSource[key].filter((item) => {
          if (condition.length) {
            if (
              item.vendor.toLowerCase().includes(condition) ||
              item.product.toLowerCase().includes(condition) ||
              t(item.vendor).includes(condition) ||
              t(item.product).includes(condition) ||
              [item.barebones]
                .flat()
                .join(' ')
                .toLowerCase()
                .includes(condition)
            )
              return true;
            return false;
          }
          return true;
        });

        if (!data.length) continue;

        result.push(
          <ModelSelectorGroup key={key}>
            <ModelSelectorTitle>
              {useTranslation ? t(key) : key}
            </ModelSelectorTitle>
            <ModelSelectorGrids>
              {data.map((datum, index) => (
                <ModelSelectorGridItem
                  key={index}
                  className={cn(config.modelIndex === datum.index && 'active')}
                  onClick={() => config.setModelIndex(datum.index)}
                >
                  {!useTranslation && t(datum.vendor)} {t(datum.product)}
                </ModelSelectorGridItem>
              ))}
            </ModelSelectorGrids>
          </ModelSelectorGroup>
        );
      }
    }

    return result;
  };

  return (
    <MainContentContainer>
      <BlockTitle title={t('CONFIG_STEP_SELECT_MODEL')!} />
      
      <SearchInput
        onChange={(v) => setConndition(v.toLocaleLowerCase())}
        placeholder={t('SELECT_MODEL_FILTER_INPUT')!}
      />
      
      <ModelSelectorTab defaultActiveTab="by-vendor" tabPosition="top">
        <TabPane title={t('SELECT_MODEL_BY_VENDOR')} key="by-vendor">
          {renderModelItems(modelsGroupByVendor, true)}
        </TabPane>
        <TabPane title={t('SELECT_MODEL_BY_BAREBONES')} key="by-barebones">
          {renderModelItems(modelsGroupByBarebone, false)}
        </TabPane>
      </ModelSelectorTab>

      <ActionButtons canNext={config.modelIndex !== null}>
        <CurrentSelected>
          <b>{t('SELECT_MODEL_CURRENT')}{': '}</b>
          <SelectedModelTag>
            {config.modelIndex !== null &&
              `${t(models?.[config.modelIndex].vendor!)} ${t(
                models?.[config.modelIndex].product!
              )}`}
          </SelectedModelTag>
        </CurrentSelected>
      </ActionButtons>
    </MainContentContainer>
  );
}

export default observer(ModelSelector);
