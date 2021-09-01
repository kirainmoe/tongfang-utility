import loadable from "@loadable/component";

const LoadableCounter = loadable(() => import(/* webpackChunkName: 'counter-page' */ './Counter'));

export default LoadableCounter;
