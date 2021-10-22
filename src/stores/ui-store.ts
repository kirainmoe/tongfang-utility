import { Theme, Arco } from "common/themes";
import { makeAutoObservable } from "mobx";
import RootStore from "./root-store";

export default class UIStore {
  public rootStore: RootStore;

  public theme: Theme = Arco;

  public language: string = window.navigator.language;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeAutoObservable(this);
  }

  get navigatorColor() {
    return this.theme.navigatorColor;
  }

  get navigatorHoverColor() {
    return this.theme.navigatorHoverColor;
  }

  get navigatorActiveColor() {
    return this.theme.navigatorActiveColor;
  }
  
  get mainColor() {
    return this.theme.mainColor;
  }

  get borderColor() {
    return this.theme.borderColor;
  }

  public setUILanguage(language: string) {
    this.language = language;
  }

}