import axios from "axios";
import store from "stores";
import { DriverList } from "types/drivers";

export default function getRemoteDrivers(): Promise<DriverList> {
  return new Promise((resolve, reject) => {
    axios.get(store.app.getMirroredUrl('api/driver/release'))
      .then(res => {
        if (res.data.code === 0) {
          resolve(res.data.payload);
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch(err => reject(err));
  });
}