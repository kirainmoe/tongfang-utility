import { Avatar, Checkbox, Input } from '@arco-design/web-react';
import { IconEdit } from '@arco-design/web-react/icon';
import { Edit, Save } from '@icon-park/react';
import { observer } from 'mobx-react-lite';
import { createRef, useContext, useState } from 'react';
import t from 'resources/i18n';
import { RootStoreContext } from 'stores';
import { open } from '@tauri-apps/api/dialog';
import {
  AvatarFrame,
  AvatarImage,
  UserInfoContainer,
  UserPanelContainer,
  UserPanelOuterContainer,
} from './style';
import { readBinaryFile } from '../../../node_modules/@tauri-apps/api/fs';

export function UserPanel() {
  const { user, ui } = useContext(RootStoreContext);
  const [nameEditable, setNameEditable] = useState(false);
  const [nicknameVal, setNicknameVal] = useState(t(user.nickname));
  const outerContainerRef = createRef<HTMLDivElement>();

  const handleOuterContainerClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLDivElement) !== outerContainerRef.current) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    user.toggleUserPanel();
  };

  const handleSaveNickname = () => {
    user.setNickname(nicknameVal);
    setNameEditable(false);
  };

  const handleToggleBetaProgram = (v: boolean) => {
    user.setBetaProgram(v);
  };

  const handleChangeAvatar = async () => {
    const newAvatar = await open({
      filters: [
        {
          extensions: ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'webp'],
          name: 'Image File',
        },
      ],
      multiple: false,
    });

    if (newAvatar === null) {
      return;
    }

    const file = await readBinaryFile(newAvatar as string);
    const buffer = new Buffer(file);
    const base64Str = buffer.toString('base64');
    const type = (newAvatar as string).split('.').slice(-1)[0];
    user.setAvatarUrl(
      `data:image/${type === 'jpg' ? 'jpeg' : type};base64,${base64Str}`
    );
  };

  return (
    <UserPanelOuterContainer
      onClick={handleOuterContainerClick}
      ref={outerContainerRef}
      style={{
        display: user.showUserPanel ? 'block' : 'none',
      }}
    >
      <UserPanelContainer>
        <Avatar
          triggerIcon={<IconEdit />}
          onClick={handleChangeAvatar}
          size={80}
        >
          <AvatarImage src={user.avatarUrl} alt="Avatar" />
          {ui.avatarFrame && (
            <AvatarFrame src={ui.avatarFrame} alt="avatar frame" />
          )}
        </Avatar>
        <UserInfoContainer>
          <div>
            {nameEditable ? (
              <>
                <Input
                  className="user-nickname-input"
                  value={nicknameVal}
                  onChange={(v) => setNicknameVal(v)}
                />
                <span className="save-name" onClick={handleSaveNickname}>
                  <Save theme="outline" size="16" fill="#333" />
                </span>
              </>
            ) : (
              <>
                <span className="user-nickname">{t(user.nickname)}</span>
                <span
                  className="edit-name"
                  onClick={() => setNameEditable(true)}
                >
                  <Edit theme="outline" size="16" fill="#333" />
                </span>
              </>
            )}
          </div>

          <div className="user-id">
            {t('USER_ID')}: {user.userIdentifyUUID!.split('-').slice(-1)[0]}
          </div>

          <div className="join-beta">
            <Checkbox
              onChange={handleToggleBetaProgram}
              defaultChecked={user.isBetaProgram}
            />
            <span className="tag">{t('USER_BETA_PROGRAM')}</span>
          </div>
        </UserInfoContainer>
      </UserPanelContainer>
    </UserPanelOuterContainer>
  );
}

export default observer(UserPanel);
