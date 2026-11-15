const TABLE = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx";

const LOOKUP = new Int8Array(128).fill(-1);
for (let i = 0; i < TABLE.length; i++) {
  LOOKUP[TABLE.charCodeAt(i)] = i;
}

const decodeBase60 = (value) => {
  if (value.length !== 7) {
    throw new Error("Invalid base60 length");
  }

  const decoded = new Uint8Array(7);
  for (let i = 0; i < 7; i++) {
    const code = value.charCodeAt(i);
    const val = code < 128 ? LOOKUP[code] : -1;

    if (val === -1) {
      throw new Error(`Invalid character: ${value[i]}`);
    }
    decoded[i] = val;
  }
  return decoded;
};

export const toJSDate = (base60) => {
  const d = decodeBase60(base60);

  return new Date(Date.UTC(d[0] * 60 + d[1], d[2], d[3] + 1, d[4], d[5], d[6]));
};

export const toBase60 = (date) => {
  if (!(date instanceof Date)) {
    throw new Error('"date" is not a valid Date object');
  }

  const year = date.getUTCFullYear();

  return (
    TABLE[Math.floor(year / 60)] +
    TABLE[year % 60] +
    TABLE[date.getUTCMonth()] +
    TABLE[date.getUTCDate() - 1] +
    TABLE[date.getUTCHours()] +
    TABLE[date.getUTCMinutes()] +
    TABLE[date.getUTCSeconds()]
  );
};
