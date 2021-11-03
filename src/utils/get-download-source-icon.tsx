import { BitBucketIcon, JSDelivrIcon } from "resources/icons"
import { GitHubIcon } from "resources/icons"

export function getDownloadSourceIcon(source: string) {
  switch (source.toLowerCase()) {
    case 'jsdelivr':
      return <JSDelivrIcon />;
    case 'github':
      return <GitHubIcon />;
    case 'bitbucket':
      return <BitBucketIcon />;
    case 'local':
      return <span>💻</span>;
    case 'rinco':
      return <span>🍁</span>;
    case 'eine':
      return <span>🎩</span>;
    default:
      return null;
  }
}
