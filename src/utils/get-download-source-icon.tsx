import { BitBucketIcon, JSDelivrIcon } from "resources/icons"
import { GitHubIcon } from "resources/icons"

export function getDownloadSourceIcon(source: string) {
  switch (source) {
    case 'jsdelivr':
      return <JSDelivrIcon />;
    case 'github':
      return <GitHubIcon />;
    case 'bitbucket':
      return <BitBucketIcon />;
    default:
      return null;
  }
}
