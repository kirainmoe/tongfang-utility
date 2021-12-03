import AppStore from "./app-store";
import ConfigStore from "./config-store";
import DashboardStore from "./dashboard-store";
import FanStore from "./fan-store";
import UIStore from "./ui-store";
import UpdateStore from "./update-store";
import UserStore from "./user-store";

export default class RootStore {
  public app: AppStore;
  public config: ConfigStore;
  public dashboard: DashboardStore;
  public fan: FanStore;
  public ui: UIStore;
  public update: UpdateStore;
  public user: UserStore;
  
  constructor() {
    this.app = new AppStore(this);
    this.dashboard = new DashboardStore(this);
    this.ui = new UIStore(this);
    this.config = new ConfigStore(this);
    this.update = new UpdateStore(this);
    this.user = new UserStore(this);
    this.fan = new FanStore(this);
  }
}