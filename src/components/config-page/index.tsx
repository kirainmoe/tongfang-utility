import { Steps } from "@arco-design/web-react";
import ContentPage from "components/common/content-page";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import t from "resources/i18n";
import { RootStoreContext } from "stores";
import { ConfigPageStyles } from "./style";

import Customize from "./customize";
import ModelSelector from "./model-selector";
import Welcome from "./welcome";
import Personalize from './personalize';
import Generate from "./generate";
import Done from "./done";

const { Step } = Steps;

const configSteps = [
  'CONFIG_STEP_WELCOME',
  'CONFIG_STEP_SELECT_MODEL',
  'CONFIG_STEP_CUSTOMIZE',
  'CONFIG_STEP_PERSONALIZE',
  'CONFIG_STEP_GENERATE_CONFIG',
  'CONFIG_STEP_DONE'
];

function ConfigPage() {
  const { config } = useContext(RootStoreContext);
  const { step } = config;
  
  return (
    <ContentPage
      title={t('CONFIG_PAGE_TITLE')}
      description={t('CONFIG_PAGE_DESCRIPTION')}
    >
      <Steps
        type="arrow"
        size="small"
        current={step}
        onChange={(nextStep) =>
          (process.env.NODE_ENV === 'development' || step >= nextStep) &&
          config.setStep(nextStep)
        }
        style={{ marginBottom: 20 }}
      >
        {configSteps.map((step, key) => (
          <Step title={t(step)} key={key} />
        ))}
      </Steps>

      {step === 1 && <Welcome />}
      {step === 2 && <ModelSelector />}
      {step === 3 && <Customize />}
      {step === 4 && <Personalize />}
      {step === 5 && <Generate />}
      {step === 6 && <Done />}

      <ConfigPageStyles />
    </ContentPage>
  );
}

export default observer(ConfigPage);