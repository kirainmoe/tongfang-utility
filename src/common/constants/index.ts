import { LogicalSize } from "@tauri-apps/api/window";

export const DEFAULT_WINDOW_SIZE = new LogicalSize(900, 700);

export enum CheckResult {
  PASSING,
  UNKNOWN,
  WARNING,
  FAILED,
  CHECKING,
}