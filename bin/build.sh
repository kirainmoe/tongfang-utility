#!/bin/bash

echo '============ TongFang Utility Packer ============'
echo ''
echo 'Packing essential files using Vite...'
yarn build:vite
echo 'Building tauri...'
yarn tauri build
echo 'Pack complete.'
