import { observer } from 'mobx-react';
import { useContext } from 'react';
import { RootStoreContext } from 'stores';
import { AvatarFrame, NavigatorUserAvatarContainer } from './style';

function NavigatorUserAvatar() {
  const { ui, user } = useContext(RootStoreContext);
  return (
    <NavigatorUserAvatarContainer onClick={() => user.toggleUserPanel()}>
      <div className="user-avatar-img">
        <img
          alt={'User Avatar'}
          src={user.avatarUrl}
        />
      </div>

      {ui.avatarFrame && <AvatarFrame src={ui.avatarFrame} />}
    </NavigatorUserAvatarContainer>
  );
}

export default observer(NavigatorUserAvatar);
