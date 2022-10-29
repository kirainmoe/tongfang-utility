export function compareStringVersion(a: string, b: string) {
  const [majorA = 0, minorA = 0, patchA = 0] = a
    .split('.')
    .map((str) => Number(str) || 0);

  const [majorB = 0, minorB = 0, patchB = 0] = b
    .split('.')
    .map((str) => Number(str) || 0);

  if (majorA !== majorB) {
    return Math.sign(majorA - majorB);
  }

  if (minorA !== minorB) {
    return Math.sign(minorA - minorB);
  }
 
  return Math.sign(patchA - patchB);
}
