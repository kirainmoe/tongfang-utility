import { makeAutoObservable } from "mobx";
import { checkUpdate } from "../../node_modules/@tauri-apps/api/updater";
import RootStore from "./root-store";

export interface UpdateManifestBody {
  body: string;
  date: string;
  version: string;
}

export default class UpdateStore {
  public rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root;

    makeAutoObservable(this);
    this.checkUpdate();
  }

  public remoteAppVersion: string | null = null;
  public remoteAppBuild: number | null = null;
  public requireUpdate: boolean | null = null;
  public manifest: UpdateManifestBody | undefined = undefined;
  public releaseNote: string | null = null;

  public resetRequireUpdate() {
    this.requireUpdate = null;
  }

  public setUpdateStatus(shouldUpdate: boolean, manifest: UpdateManifestBody | undefined) {
    this.requireUpdate = shouldUpdate;
    this.manifest = manifest;
    if (manifest) {
      const res = JSON.parse(manifest.body);
      this.remoteAppVersion = manifest.version;
      this.remoteAppBuild = res.build;
      this.releaseNote = res.release_note;
    }
  }

  public async checkUpdate() {
    this.resetRequireUpdate();
    const { shouldUpdate, manifest } = await checkUpdate();
    this.setUpdateStatus(shouldUpdate, manifest);
  }
}