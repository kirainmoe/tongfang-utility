import { DiscussionChannelItem, DiscussionContainer } from './style';

import AlipayQRCode from 'resources/images/channels/Alipay.png';
import WechatPayQRCode from 'resources/images/channels/WechatPay.png';
import { AlipayIcon, WechatPayIcon } from 'resources/icons';
import t from 'resources/i18n';

export default function Donate() {
  return (
    <>
      <DiscussionContainer>
        <DiscussionChannelItem>
          <img src={AlipayQRCode} alt="Alipay" />
          <AlipayIcon />
        </DiscussionChannelItem>
        <DiscussionChannelItem>
          <img src={WechatPayQRCode} alt="Wechat Pay" />
          <WechatPayIcon />
        </DiscussionChannelItem>
      </DiscussionContainer>

      <div style={{ marginTop: 20 }}>{t('ABOUT_DONATE_WARNING')}</div>
    </>
  );
}
