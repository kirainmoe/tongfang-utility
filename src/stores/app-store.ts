import { platform } from '@tauri-apps/api/os';
import { desktopDir, homeDir } from '@tauri-apps/api/path';
import { DownloadServer, MIRROR_SERVER_DOMAINS } from 'common/constants';
import { makeAutoObservable } from 'mobx';
import ensurePathExists from 'utils/ensure-path-exists';
import { getKextsList } from 'utils/get-kext-list';
import pathJoin from 'utils/path-join';
import readNVRAM from 'utils/read-nvram';
import RootStore from './root-store';

export default class AppStore {
  rootStore: RootStore;

  appPath: string = '';

  downloadPath: string = '';

  platform: string | null = null;

  downloadMirror: DownloadServer = DownloadServer.EINE;

  supportFanControl: boolean = false;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeAutoObservable(this);

    this.getPathConfig();
    this.getPlatform();
    this.getMirror();
    this.getFanControlSupport();
  }

  setPlatform(platform: string) {
    this.platform = platform;
  }

  async getPlatform() {
    const pf = await platform();
    this.setPlatform(pf);
  }

  async getPathConfig() {
    const memorizedAppPath =
      localStorage.getItem('tfu-app-path') || (await this.getDefaultAppPath());
    const memorizedDownloadPath =
      localStorage.getItem('tfu-download-path') ||
      (await this.getDefaultDownloadPath());

    this.appPath = memorizedAppPath;
    this.downloadPath = memorizedDownloadPath;

    await ensurePathExists(this.appPath);
    await ensurePathExists(this.downloadPath);

    localStorage.setItem('tfu-app-path', this.appPath);
    localStorage.setItem('tfu-download-path', this.downloadPath);

    return {
      appPath: this.appPath,
      downloadPath: this.downloadPath,
    };
  }

  getMirror() {
    this.downloadMirror = (localStorage.getItem('tfu-app-mirror') || DownloadServer.RINCO) as DownloadServer;
  }

  getMirroredUrl(uri: string) {
    return `${MIRROR_SERVER_DOMAINS[this.downloadMirror]}${uri}`;
  }

  setDownloadPath(path: string) {
    this.downloadPath = path;
    localStorage.setItem('tfu-download-path', path);
  }

  setAppPath(path: string) {
    this.appPath = path;
    localStorage.setItem('tfu-app-path', path);
  }

  setDownloadMirror(server: DownloadServer) {
    this.downloadMirror = server;
    localStorage.setItem('tfu-app-mirror', server);
  }

  async getDefaultAppPath() {
    const homePath = await homeDir();
    const defaultName = '.tfu';
    return pathJoin(homePath, defaultName);
  }

  async getDefaultDownloadPath() {
    return await desktopDir();
  }

  defaultDriverVersion: { [key: string]: string } = {
    wifi: localStorage.getItem('tfu-default-wifi-driver-version') || 'null',
    bluetooth: localStorage.getItem('tfu-default-bluetooth-driver-version') || 'null',
  }

  setDefaultDriverVersion(key: string, value: string) {
    this.defaultDriverVersion[key] = value;
    localStorage.setItem(`tfu-default-${key}-driver-version`, value);
  }

  currentEFIReleaseVersion: string | null = null;

  get currentEFIVersion() {
    if (!this.currentEFIReleaseVersion) {
      this.getCurrentEFIReleaseVersion();
    }
    return this.currentEFIReleaseVersion;
  }

  async getCurrentEFIReleaseVersion() {
    const os = await platform();
    if (os === 'macos') {
      this.currentEFIReleaseVersion = await readNVRAM('efi-version');
    }
  }

  async getFanControlSupport() {
    const os = await platform();
    if (os !== 'macos') {
      this.supportFanControl = false;
      return;
    }
    
    const list = await getKextsList();
    const hasEnhancer =
      list.filter((item) => item.name.includes('com.kirainmoe.TongfangEnhancer'))
        .length > 0;
    this.supportFanControl = hasEnhancer;
  }
}
