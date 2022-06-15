import { OSVersion } from "stores/config-store";

export default function getOSName(os: OSVersion) {
  switch (os) {
    case OSVersion.Mojave:
      return 'macOS 10.14 Mojave';
    case OSVersion.Catalina:
      return 'macOS 10.15 Catalina';
    case OSVersion.BigSur:
      return 'macOS 11 Big Sur';
    case OSVersion.Monterey:
      return 'macOS 12 Monterey';
    case OSVersion.Ventura:
      return 'macOS 13 Ventura';
  }
}
