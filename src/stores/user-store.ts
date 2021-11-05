import { makeAutoObservable } from "mobx";

import RootStore from "./root-store";
import defaultAvatar from 'resources/images/avatar.png';
import { v4 } from "uuid";

export default class UserStore {
  public rootStore: RootStore;

  public avatarUrl: string = localStorage.getItem('tfu-user-avatar') || defaultAvatar;
  public nickname: string = localStorage.getItem('tfu-user-nickname') || 'DEFAULT_NICKNAME';
  public isBetaProgram: boolean = localStorage.getItem('tfu-user-is-beta-program') === 'true' || false;
  public showUserPanel: boolean = false;
  public userIdentifyUUID: string | null = null;

  constructor(root: RootStore) {
    this.rootStore = root;
    this.readUserUUID();
    makeAutoObservable(this);
  }

  public toggleUserPanel() {
    this.showUserPanel = !this.showUserPanel;
  }

  public setNickname(nickname: string) {
    this.nickname = nickname;
    localStorage.setItem('tfu-user-nickname', nickname);
  }

  public setBetaProgram(state: boolean) {
    this.isBetaProgram = state;
    localStorage.setItem('tfu-user-is-beta-program', String(state));
  }

  public setAvatarUrl(avatar: string) {
    this.avatarUrl = avatar;
    localStorage.setItem('tfu-user-avatar', avatar);
  }


  readUserUUID() {
    const storagedUUID = localStorage.getItem('tfu-app-user-uuid');
    if (storagedUUID === null) {
      this.userIdentifyUUID = v4();
      localStorage.setItem('tfu-app-user-uuid', this.userIdentifyUUID);
    } else {
      this.userIdentifyUUID = storagedUUID;
    }
  }

  resetUserUUID() {
    this.userIdentifyUUID = v4();
    localStorage.setItem('tfu-app-user-uuid', this.userIdentifyUUID);
  }
}