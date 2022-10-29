import axios from 'axios';
import store from 'stores';
import { DriverList } from 'types/drivers';

function sortDriverListByReleaseDate<T extends { release_date: string }>(
  driversList: T[]
) {
  return driversList.sort((a, b) => {
    const timeA: number = +new Date(a.release_date);
    const timeB: number = +new Date(b.release_date);
    return timeB - timeA;
  });
}

export default function getRemoteDrivers(): Promise<DriverList> {
  return new Promise((resolve, reject) => {
    axios
      .get(store.app.getMirroredUrl('api/driver/release'))
      .then((res) => {
        if (res.data.code === 0) {
          const { wifi, bluetooth } = res.data.payload;
          resolve({
            wifi: sortDriverListByReleaseDate(wifi) as any,
            bluetooth: sortDriverListByReleaseDate(bluetooth) as any,
          });
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => reject(err));
  });
}
