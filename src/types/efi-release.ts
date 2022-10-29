export interface DownloadSource {
  source_name: string;
  url: string;
}

export enum EFIReleaseType {
  STABLE = 0,
  BETA = 1,
  ALPHA = 2,
  NIGHTLY = 3,
  LOCAL = 4,
}

export interface EFIReleasePayload {
  version: string;
  build: number;
  size: number;
  release_type: EFIReleaseType;
  require_utility_version: string;
  require_utility_build: number;
  based_oc_version: string;
  release_note: string;
  build_yaml_url: string;
  build_yaml_hash: null | string;
  download_sources: DownloadSource[];
  require_itlwm_driver_version?: string;
  require_intel_bluetooth_driver_version?: string;
}