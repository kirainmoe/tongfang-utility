import loadable from "@loadable/component";

const LoadableNavigator = loadable(() => import(/* webpackChunkName: "navigator" */ "./Navigator"));

export default LoadableNavigator;
