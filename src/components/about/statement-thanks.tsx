import {
  ContentContainer,
  OtherStatementContainer,
  StatementItemContainer,
} from './style';

import iconfontSvg from 'resources/images/logos/iconfont.svg';
import piaveCloudSvg from 'resources/images/logos/piave-cloud.svg';

import t from 'resources/i18n';

import { openPage } from 'utils/open-directory';
import { Link } from '@arco-design/web-react';

const GITHUB_TONGFANG_REPO_CREDIT = `'https://github.com/kirainmoe/hasee-tongfang-macos/blob/oc-general/Docs/Credits.md'`;

export interface StatementItemProps {
  icon: string;
  title: string;
  text: string;
  url: string;
}

export function StatementItem({ icon, title, text, url }: StatementItemProps) {
  return (
    <StatementItemContainer>
      <img onClick={() => openPage(url)} src={icon} alt={title} />
      <span>{text}</span>
    </StatementItemContainer>
  );
}

export default function StatementAndThank() {
  return (
    <ContentContainer>
      <StatementItem
        title="Icon Font"
        icon={iconfontSvg}
        text={t('ABOUT_ICON_COPYRIGHT')}
        url="https://iconfont.cn"
      />

      <StatementItem
        title="PiaveCloud"
        icon={piaveCloudSvg}
        text={t('ABOUT_PIAVE_CLOUD_SERVER')}
        url="https://console-cloud.piave.net/"
      />

      <OtherStatementContainer>
        <p className="title">{t('ABOUT_FURTHER_READING')}：</p>
        <li>
          <Link onClick={() => openPage(GITHUB_TONGFANG_REPO_CREDIT)}>
            {t('ABOUT_TONGFANG_MACOS_REPO')}
          </Link>
        </li>
      </OtherStatementContainer>
    </ContentContainer>
  );
}
