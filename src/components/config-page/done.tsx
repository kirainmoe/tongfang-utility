import { Button, Tooltip } from "antd";
import { LinkButton, MainContentContainer } from "components/common/style";
import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import t from "resources/i18n";
import { CompleteIcon, SystemConfigIcon, TextTutorial, VideoTutorial } from "resources/icons";
import { RootStoreContext } from "stores";
import openDirectory, { openPage } from "utils/open-directory";
import pathJoin from "utils/path-join";
import ESPModal from "./esp-modal";
import { CenterAlignContainer, DoneActionButton, DoneContainer, DoneTitle } from "./style";

function Done() {
  const [visible, setVisible] = useState(false);
  const { app, config, ui } = useContext(RootStoreContext);

  const successTips = () => {
    const payload: React.ReactNode[] = t('DONE_SUCCESS_TIPS').split(':');
    const efiDownloadPath = pathJoin(app.downloadPath, 'Tongfang_EFI');
    payload[1] = (
      <Tooltip title={efiDownloadPath} key={1}>
        <LinkButton onClick={() => openDirectory(efiDownloadPath)}>
          {payload[1]}
        </LinkButton>
      </Tooltip>
    );

    return payload;
  };

  const openTextTutorialPage = () => {
    switch (ui.language) {
      case 'zh-cn':
      case 'zh-tw':
      case 'zh-hk':
        openPage('https://github.com/kirainmoe/hasee-tongfang-macos/blob/oc-general/README.md')
        break;
      case 'en':
      default:
        openPage('https://github.com/kirainmoe/hasee-tongfang-macos/blob/oc-general/README-en.md');
        break;
    }
  };

  const openVideoTutorialPage = () => 
    openPage('https://www.bilibili.com/video/BV1uJ411Y77y');
  
  const openAutoReplaceEFIModal = () => setVisible(true);

  return (
    <MainContentContainer>
      <DoneContainer>
        <CenterAlignContainer>
          <CompleteIcon />
          <DoneTitle>{t('DONE_SUCCESS')}</DoneTitle>
        </CenterAlignContainer>
        <div>{successTips()}</div>

        <CenterAlignContainer style={{ marginTop: 50 }}>
          <DoneActionButton onClick={openTextTutorialPage}>
            <TextTutorial />
            <div>{t('DONE_TEXT_TUTORIAL')}</div>
          </DoneActionButton>

          {ui.language === 'zh-cn' && (
            <DoneActionButton onClick={openVideoTutorialPage}>
              <VideoTutorial />
              <div>{t('DONE_VIDEO_TUTORIAL')}</div>
            </DoneActionButton>
          )}

          {app.platform === 'macos' && (
            <DoneActionButton onClick={openAutoReplaceEFIModal}>
              <SystemConfigIcon />
              <div>{t('DONE_EFI_AUTO_REPLACE')}</div>
            </DoneActionButton>
          )}
        </CenterAlignContainer>

        <Button
          style={{ margin: 10 }}
          type="primary"
          onClick={() => config.setStep(0)}
        >
          {t('DONE_BACK_TO_HOME')}
        </Button>
      </DoneContainer>

      {app.platform === 'macos' && (
        <ESPModal
          downloadPath={app.downloadPath}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </MainContentContainer>
  );
}

export default observer(Done);
