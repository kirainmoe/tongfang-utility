export interface EFIAction {
  type: string;

  [key: string]: any;
}

export interface EFIBuildAction {
  test: string;
  action: EFIAction[];
  children?: EFIBuildAction[];
}

export interface EFISupportModel {
  vendor: string;
  product: string;
  barebones: string | string[];
  generation: number;
  usbmap: string;
}

export interface EFIBuildYaml {
  'project': string;
  'author': string;
  'opencore-version': string;
  'efi-build': number;
  'efi-version': string;
  'link': string;
  'require-utility-version': string;
  'require-utility-build': number;
  'build-actions': EFIBuildAction[];
  'support-models': EFISupportModel[];
}
