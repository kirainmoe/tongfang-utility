import { Tooltip } from '@arco-design/web-react';

import { DiscussionChannelItem, DiscussionContainer } from './style';

import { DiscordIcon, LarkIcon, QQIcon } from 'resources/icons/discuss-channel';

import QQGroupQRCode from 'resources/images/channels/QQGroup.png';
import DiscordQRCode from 'resources/images/channels/Discord.png';
import LarkQRCode from 'resources/images/channels/LarkGroup.png';
import t from 'resources/i18n';

export function Discussion() {
  return (
    <DiscussionContainer>
      <DiscussionChannelItem>
        <Tooltip content={t('ABOUT_DISCUSSION_QQ_GROUP')}>
          <img src={QQGroupQRCode} alt="QQ Group" />
          <QQIcon />
          <p className="tips">{t('ABOUT_DISCUSSION_QQ_GROUP_REQUIREMENT')}</p>
        </Tooltip>
      </DiscussionChannelItem>

      <DiscussionChannelItem>
        <Tooltip content="Discord">
          <img src={DiscordQRCode} alt="Discord" />
          <DiscordIcon />
        </Tooltip>
      </DiscussionChannelItem>

      <DiscussionChannelItem>
        <Tooltip content={t('ABOUT_DISCUSSION_LARK_GROUP')}>
          <img src={LarkQRCode} alt="Lark Group" />
          <LarkIcon />
        </Tooltip>
      </DiscussionChannelItem>
    </DiscussionContainer>
  );
}

export default Discussion;
