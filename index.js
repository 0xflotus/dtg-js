const TABLE = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx";

const LOOKUP = new Uint8Array(128);
for (let i = 0; i < TABLE.length; i++) {
  LOOKUP[TABLE.charCodeAt(i)] = i;
}

export const toJSDate = (base60) => {
  if (base60.length !== 7) {
    throw new Error("Invalid base60 length");
  }

  const v = new Array(7);

  for (let i = 0; i < 7; i++) {
    const code = base60.charCodeAt(i);
    const val = LOOKUP[code];

    if (val === 0 && base60[i] !== "0") {
      throw new Error("Invalid character");
    }

    v[i] = val;
  }

  return new Date(Date.UTC(
    v[0] * 60 + v[1],
    v[2],
    v[3] + 1,
    v[4],
    v[5],
    v[6]
  ));
};

export const toBase60 = (date) => {
  if (!(date instanceof Date)) {
    throw new Error('"date" is not a valid Date object');
  }

  const year = date.getUTCFullYear();

  const chars = new Array(7);

  chars[0] = TABLE[(year / 60) | 0];
  chars[1] = TABLE[year % 60];
  chars[2] = TABLE[date.getUTCMonth()];
  chars[3] = TABLE[date.getUTCDate() - 1];
  chars[4] = TABLE[date.getUTCHours()];
  chars[5] = TABLE[date.getUTCMinutes()];
  chars[6] = TABLE[date.getUTCSeconds()];

  return chars.join("");
};
