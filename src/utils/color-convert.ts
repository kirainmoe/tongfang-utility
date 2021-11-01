export const RGBtoHEX = ([r, g, b]: number[]) => {
  const fixDigit = (x: string) => x.length === 2 ? x : `0${x}`;

  const rHex = fixDigit(r.toString(16)),
    gHex = fixDigit(g.toString(16)),
    bHex = fixDigit(b.toString(16));

  return `#${rHex}${gHex}${bHex}`;
};

export const HEXtoRGB = (hex: string) => {
  const r = parseInt(hex.substr(1, 2), 16),
    g = parseInt(hex.substr(3, 2), 16),
    b = parseInt(hex.substr(5, 2), 16);
  return [r, g, b];
};