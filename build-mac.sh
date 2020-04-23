cd starbeat-core
yarn build
cd ..
rm -rf starbeat-client/build
cp -r starbeat-core/build starbeat-client/build
cd starbeat-client
yarn pack:macos

