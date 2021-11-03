import { makeAutoObservable } from "mobx";

import RootStore from "./root-store";
import defaultAvatar from 'resources/images/avatar.png';

export default class UserStore {
  public rootStore: RootStore;

  public avatarUrl: string = localStorage.getItem('tfu-user-avatar') || defaultAvatar;
  public nickname: string = localStorage.getItem('tfu-user-nickname') || 'DEFAULT_NICKNAME';
  public isBetaProgram: boolean = localStorage.getItem('tfu-user-is-beta-program') === 'true' || false;
  public showUserPanel: boolean = false;

  constructor(root: RootStore) {
    this.rootStore = root;
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
}