import { Progress, Button, Modal } from '@arco-design/web-react';
import { MainContentContainer } from 'components/common/style';
import { observer } from 'mobx-react';
import { useContext, useEffect, useState } from 'react';
import t from 'resources/i18n';
import processEFI from 'services/process-efi';
import { RootStoreContext } from 'stores';
import {
  CenterAlignContainer,
  HavingTrouble,
  ProcessingContainer,
  StepIndicator,
} from './style';

export enum ProcessStages {
  DOWNLOAD = 0,
  UNZIP = 1,
  CHECK_BUILD_FILE_HASH = 2,
  COPY_FILES = 3,
  PROCESS_CONFIG = 4,
  PARSE_IMAGE = 5,
  CLEAN_UP = 6,
  ERROR = 7,
}

const stepTexts = [
  t('PROCESSING_STEP_DOWNLOAD'),
  t('PROCESSING_STEP_UNZIP'),
  t('PROCESSING_COPY_FILES'),
  t('PROCESSING_CHECK_BUILD_FILE_HASH'),
  t('PROCESSING_PROCESS_CONFIG'),
  t('PROCESSING_PARSE_IMAGE'),
  t('PROCESSING_CLEAN_UP'),
  t('PROCESSING_PROCESS_ERROR'),
];

function Processing() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(ProcessStages.DOWNLOAD);
  const [showTroubleShooting, setShowTroubleShooting] = useState(false);

  const { app, config, ui } = useContext(RootStoreContext);

  useEffect(() => {
    processEFI({
      app,
      config,
      ui,
      setStage,
      setProgress,
    }).catch((err) => {
      Modal.error({
        title: t('PROCESSING_EFI_FAILED'),
        content: `${t('PROCESSING_PROCESS_ERROR')}: ${err}`,
      });
    });
  }, [app, config, ui]);

  return (
    <MainContentContainer>
      <ProcessingContainer>
        <Progress
          type="circle"
          color={
            stage === ProcessStages.ERROR
              ? undefined
              : {
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }
          }
          percent={progress}
          width={150}
          strokeWidth={10}
          status={stage === ProcessStages.ERROR ? 'error' : 'normal'}
          style={{ width: '100%', textAlign: 'center' }}
        />

        <StepIndicator>
          {stepTexts[stage].replace(':progress', progress.toString())}...
        </StepIndicator>

        <HavingTrouble href="#" onClick={() => setShowTroubleShooting(true)}>
          {t('PROCESSING_DOWNLOAD_PROBLEMS')}
        </HavingTrouble>

        {stage === ProcessStages.ERROR && (
          <CenterAlignContainer>
            <Button
              style={{ margin: 10 }}
              type="primary"
              onClick={() => config.setStep(1)}
            >
              {t('DONE_BACK_TO_HOME')}
            </Button>
          </CenterAlignContainer>
        )}
      </ProcessingContainer>

      <Modal
        title={t('PROCESSING_DOWNLOAD_PROBLEMS')}
        visible={showTroubleShooting}
        onOk={() => setShowTroubleShooting(false)}
        hideCancel={true}
      >
        <div dangerouslySetInnerHTML={{
          __html: t('PROCESSING_DOWNLOAD_PROBLEMS_DESCRIPTION')
            .replace(`$server`, app.downloadMirror)
            .replace('$downloadUrl', config.downloadSourceUrl!),
        }} />
      </Modal>
    </MainContentContainer>
  );
}

export default observer(Processing);
