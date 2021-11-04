export enum DriverReleaseType {
  STABLE = 'stable',
  DEV = 'dev',
}

export interface KextItem {
  name: string;
  os: string;
  download_url: string;
  size: number;
}

export interface DriverPayload {
  name: string; 
  version: string;
  build: string;
  type: DriverReleaseType;
  kexts: KextItem[];
  release_date: Date;
}

export interface DriverList {
  wifi: DriverPayload[];
  bluetooth: DriverPayload[];
}