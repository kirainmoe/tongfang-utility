import { Message, Modal, Spin, Tooltip } from '@arco-design/web-react';
import MirrorServerSwitcher from 'components/common/mirror-server-switcher';
import { LinkButton } from 'components/common/style';
import { observer } from 'mobx-react';
import { useContext, useEffect, useRef, useState } from 'react';
import t from 'resources/i18n';
import { LaptopIcon } from 'resources/icons';
import { NetworkIcon } from 'resources/icons/network';
import { RootStoreContext } from 'stores';
import { openPage } from 'utils/open-directory';
import {
  ConnectivityCheckerTips,
  SolutionItem,
  SolutionItemContainer,
} from './style';

export interface ConnectivityCheckProps {
  reloadReleases: () => void;
}

const localGenerationLarkDocPageUrl = 'https://kirainmoe.feishu.cn/docx/doxcnT0pUSerTlxRJJmDCLtZ7cf';

function ConnectivityChecker({ reloadReleases }: ConnectivityCheckProps) {
  const [showConnectivityChecker, setShowConnectivityChecker] = useState(false);
  const [showMirrorSwitcher, setShowMirrorSwitcher] = useState(false);

  const { app } = useContext(RootStoreContext);

  return (
    <>
      <ConnectivityCheckerTips>
        <LinkButton onClick={() => setShowConnectivityChecker(true)}>
          {t('CONNECTIVITY_CHECKER_NO_EFI_SOLUTION')}
        </LinkButton>
      </ConnectivityCheckerTips>

      <Modal
        visible={showConnectivityChecker}
        title={t('CONNECTIVITY_CHECKER_TITLE')}
        onOk={() => setShowConnectivityChecker(false)}
        onCancel={() => setShowConnectivityChecker(false)}
      >
        <SolutionItemContainer>
          <SolutionItem onClick={() => setShowMirrorSwitcher(true)}>
            <NetworkIcon />
            <div>
              <p>{t('CONNECTIVITY_CHECKER')}</p>
            </div>
          </SolutionItem>

          <SolutionItem onClick={() => openPage(localGenerationLarkDocPageUrl)}>
            <LaptopIcon />
            <div>
              <p>{t('CONNECTIVITY_CHECKER_LOCAL_GENERATE')}</p>
            </div>
          </SolutionItem>
        </SolutionItemContainer>
      </Modal>

      <MirrorServerSwitcher show={showMirrorSwitcher} callback={() => {
        reloadReleases();
        setShowMirrorSwitcher(false);
        setShowConnectivityChecker(false);
      }} />
    </>
  );
}

export default observer(ConnectivityChecker);
