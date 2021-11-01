import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
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

export default function ContentPage({
  title,
  description,
  children,
  enableOnBack,
}: ContentPageProps) {
  const history = useHistory();

  return (
    <ContentPageContainer>
      {title && (
        <ContentPageTitle>
          {enableOnBack && (
            <LeftOutlined
              style={{ marginRight: '10px', cursor: 'pointer' }}
              onClick={() => history.goBack()}
            />
          )}
          {title}
        </ContentPageTitle>
      )}
      <ContentDescription>{description}</ContentDescription>
      {children}
    </ContentPageContainer>
  );
}
