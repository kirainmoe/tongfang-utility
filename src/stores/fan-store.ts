import { FanControlMode } from "common/constants";
import { makeAutoObservable } from "mobx";
import { execute } from "utils/execute";
import RootStore from "./root-store";

export default class FanStore {
  public rootStore: RootStore;

  public fanControlMode: FanControlMode = FanControlMode.NORMAL;
  public fanSpeedLevel: number = 0;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeAutoObservable(this);
  }

  async applySetting() {
    switch (this.fanControlMode) {
      case FanControlMode.NORMAL:
        await execute('/usr/local/bin/fancli', ['-m', 'normal']);
        break;
      case FanControlMode.BOOST:
        await execute('/usr/local/bin/fancli', ['-m', 'boost']);
        break;
      case FanControlMode.INTELLIGENT:
        await execute('/usr/local/bin/fancli', ['-m', 'normal']);
        await execute('/usr/local/bin/fancli', ['-r']);
        break;
      case FanControlMode.MANUAL:
        await execute('/usr/local/bin/fancli', ['-l', String(this.fanSpeedLevel)]);
        break;
    }
  }

  setFanControlMode(mode: FanControlMode) {
    this.fanControlMode = mode;
    this.applySetting();
  }

  setFanSpeedLevel(level: number) {
    this.fanControlMode = FanControlMode.MANUAL;
    this.fanSpeedLevel = Math.max(Math.min(5, level), 0);
    this.applySetting();
  }
}