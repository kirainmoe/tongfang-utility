import { LeftOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useContext } from 'react';
import cn from 'classnames';
import { useHistory } from 'react-router';
import { RootStoreContext } from 'stores';
import {
  ContentDescription,
  ContentPageContainer,
  ContentPageTitle,
} from './style';
export interface ContentPageProps {
  title?: string | null;
  description?: string | null;
  children?: React.ReactNode;
  enableOnBack?: boolean;
}

function ContentPage({
  title,
  description,
  children,
  enableOnBack,
}: ContentPageProps) {
  const history = useHistory();
  const { ui } = useContext(RootStoreContext);

  return (
    <ContentPageContainer className={cn(ui.isDark && 'dark-mode')} dark={ui.isDark}>
      {title && (
        <ContentPageTitle color={ui.titleFontColor}>
          {enableOnBack && (
            <LeftOutlined
              style={{ marginRight: '10px', cursor: 'pointer' }}
              onClick={() => history.goBack()}
            />
          )}
          {title}
        </ContentPageTitle>
      )}
      {description && <ContentDescription>{description}</ContentDescription>}
      {children}
    </ContentPageContainer>
  );
}

export default observer(ContentPage);