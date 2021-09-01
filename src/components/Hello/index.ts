import loadable from '@loadable/component';

const LoadableHello = loadable(() => import(/* webpackChunkName: "hello-page" */ './Hello'));

export default LoadableHello;
