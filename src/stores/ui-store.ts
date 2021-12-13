import themes, { Theme } from "common/themes";
import { makeAutoObservable } from "mobx";
import RootStore from "./root-store";

export default class UIStore {
  public rootStore: RootStore;

  public theme: Theme = themes.Natsu;

  public language: string = this.getDefaultUILanguage();

  private getDefaultUILanguage() {
    return localStorage.getItem('tfu-app-language') || window.navigator.language.toLowerCase();
  }

  constructor(root: RootStore) {
    this.rootStore = root;
    this.loadTheme();
    makeAutoObservable(this);
  }

  loadTheme() {
    const themeName = localStorage.getItem('tfu-ui-theme');
    if (!themeName || !themes.hasOwnProperty(themeName)) {
      return;
    }
    this.theme = (themes as Record<string, Theme>)[themeName];
  }

  setTheme(target: string | Theme) {
    if (typeof target === 'string') {
      if (themes.hasOwnProperty(target))
        this.theme = (themes as Record<string, Theme>)[target];
        localStorage.setItem('tfu-ui-theme', this.theme.name);
    } else {
      this.theme = target;
      localStorage.setItem('tfu-ui-theme', this.theme.name);
    }
  }
  
  get background() {
    return this.theme.background;
  }

  get navigatorItemHover() {
    return this.theme.navigator.itemHover;
  }

  get navigatorItemActive() {
    return this.theme.navigator.itemActive;
  }

  get titleFontColor() {
    return this.theme.title.fontColor;
  }

  get navigatorItemFontColor() {
    return this.theme.navigator.fontColor;
  }

  get cssVariable() {
    return this.theme.cssVariable || '';
  }

  get isDark() {
    return this.theme.dark || false;
  }

  public setUILanguage(language: string) {
    this.language = language;
    localStorage.setItem('tfu-app-language', language);
  }

}