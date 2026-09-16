const TABLE = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx";

const LOOKUP = Uint8Array.from(
  [...TABLE].reduce((lookup, char, index) => {
    lookup[char.charCodeAt(0)] = index;
    return lookup;
  }, new Uint8Array(128)),
);

const decodeBase60 = (value) => {
  if (value.length !== 7) {
    throw new Error("Invalid base60 length");
  }

  return [...value].map((char) => {
    const code = char.charCodeAt(0);
    const decoded = code < LOOKUP.length ? LOOKUP[code] : undefined;

    if (decoded === undefined || (decoded === 0 && char !== "0")) {
      throw new Error(`Invalid character: ${char}`);
    }

    return decoded;
  });
};

export const toJSDate = (base60) => {
  const [hours, minutes, month, day, hour, minute, second] =
    decodeBase60(base60);

  return new Date(
    Date.UTC(hours * 60 + minutes, month, day + 1, hour, minute, second),
  );
};

export const toBase60 = (date) => {
  if (!(date instanceof Date)) {
    throw new Error('"date" is not a valid Date object');
  }

  const values = [
    Math.floor(date.getUTCFullYear() / 60),
    date.getUTCFullYear() % 60,
    date.getUTCMonth(),
    date.getUTCDate() - 1,
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  ];

  return values.map((value) => TABLE[value]).join("");
};
