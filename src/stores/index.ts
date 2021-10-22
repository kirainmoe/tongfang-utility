import { createContext } from "react";

import RootStore from "./root-store";

const store = new RootStore();

export const RootStoreContext = createContext(store);

export default store;
