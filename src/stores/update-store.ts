import { makeAutoObservable } from "mobx";
import RootStore from "./root-store";

export default class UpdateStore {
  public rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root;

    makeAutoObservable(this);
  }

  public remoteAppVersion: string | null = null;
  public remoteAppBuild: number | null = null;

  public async checkUpdate() {
    
  }
}