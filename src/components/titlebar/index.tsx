import { useState } from "react";
import { TitleBarButton, TitleBarContainer } from "./style";

import { getCurrent } from '@tauri-apps/api/window';
import { DEFAULT_WINDOW_SIZE } from "common/constants";

export default function TitleBar() {
  const tauriWindow = getCurrent();
  const [isMaximized, setIsMaximized] = useState(false);

  const startDrag = () => tauriWindow.startDragging();
  const closeWindow = () => tauriWindow.close();
  const minimizeWindow = () => tauriWindow.minimize();
  const maximizeWindow = () => {
    isMaximized ? tauriWindow.setSize(DEFAULT_WINDOW_SIZE) : tauriWindow.maximize();
    setIsMaximized(!isMaximized);
  };

  return (
    <TitleBarContainer onMouseDown={startDrag}>
      <TitleBarButton color="#ff605c" onClick={closeWindow} />
      <TitleBarButton color="#ffbc44" onClick={minimizeWindow} />
      <TitleBarButton color="#00c84b" onClick={maximizeWindow} />
    </TitleBarContainer>
  );
}
