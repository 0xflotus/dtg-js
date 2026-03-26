const TABLE = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx';
const LOOKUP = Object.fromEntries([...TABLE].map((c, i) => [c, i]));
const BASE60_REGEX = /^[0-9A-Za-x]{7}$/;

export const toJSDate = (base60) => {
  if (!BASE60_REGEX.test(base60)) {
    throw new Error("It's not a valid base 60 string");
  }

  const m0 = LOOKUP[base60[0]];
  const m1 = LOOKUP[base60[1]];
  const m2 = LOOKUP[base60[2]];
  const m3 = LOOKUP[base60[3]];
  const m4 = LOOKUP[base60[4]];
  const m5 = LOOKUP[base60[5]];
  const m6 = LOOKUP[base60[6]];

  return new Date(Date.UTC(
    m0 * 60 + m1,
    m2,
    m3 + 1,
    m4,
    m5,
    m6
  ));
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
