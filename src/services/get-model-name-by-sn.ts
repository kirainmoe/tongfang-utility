import { ModelName } from 'resources/smbios/smbios-list';

export function getModelNameBySN(sn: string): string {
  const last4Letter = sn.slice(-4);
  if (ModelName.hasOwnProperty(last4Letter)) {
    return (ModelName as any)[last4Letter];
  }
  
  const last3Letter = sn.slice(-3);
  if (ModelName.hasOwnProperty(last3Letter)) {
    return (ModelName as any)[last3Letter];
  }

  return 'Unknown';
}
