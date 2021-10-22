import { Button } from "antd";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import t from "resources/i18n";
import { RootStoreContext } from "stores";
import styled from "styled-components";

const StyledButton = styled(Button)`
  margin: 0 10px;
`;

StyledButton.defaultProps = {
  shape: 'round',
};

const ActionButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px 30px;
  text-align: right;
`;

const ChildContainer = styled.div`
  position: absolute;
  left: 100px;
  bottom: 25px;
`;

export interface ActionButtonsProps {
  onNext?: () => void;
  onPrev?: () => void;
  canNext: boolean;
  canPrev: boolean;
  nextLoading?: boolean;
  prevLoading?: boolean;
  prevText?: React.ReactNode;
  nextText?: React.ReactNode;
  children?: React.ReactNode;
}

function ActionButtons({
  children,
  onPrev,
  onNext,
  nextLoading,
  prevLoading,
  canNext,
  canPrev,
  prevText,
  nextText,
}: ActionButtonsProps) {
  const { config } = useContext(RootStoreContext);

  const handleClickPrev = onPrev ? onPrev : () => config.prevStep();
  const handleClickNext = onNext ? onNext : () => config.nextStep();

  return (
    <ActionButtonContainer>
      <ChildContainer>
        {children}
      </ChildContainer>
      {(config.step > 0 || canPrev) && (
        <StyledButton onClick={handleClickPrev} loading={prevLoading} disabled={!canPrev}>
          {prevText || t('CONFIG_PREV_STEP')}
        </StyledButton>
      )}
      {(config.step < 5 || canNext) && (
        <StyledButton onClick={handleClickNext} type="primary" loading={nextLoading} disabled={!canNext}>
          {nextText || t('CONFIG_NEXT_STEP')}
        </StyledButton>
      )}
    </ActionButtonContainer>
  );
}

ActionButtons.defaultProps = {
  canNext: true,
  canPrev: true,
};

export default observer(ActionButtons);