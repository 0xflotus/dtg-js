// prettier-ignore
const TABLE = Array.of(
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x'
  );

export const toJSDate = (base60) => {
  if (!/^[0-9A-Za-x]{7}$/.test(base60)) {
    throw new Error("It\'s not a valid base 60 string");
  }

  const mem = base60.split("").map((char) => TABLE.indexOf(char));
  return new Date(
    Date.UTC(mem[0] * 60 + mem[1], mem[2], mem[3] + 1, mem[4], mem[5], mem[6]),
  );
};

export const toBase60 = (datetime) => {
  if (!(datetime instanceof Date)) {
    throw new Error('"datetime" is not a valid Date object');
  }

  return [
    Math.floor(datetime.getUTCFullYear() / 60),
    datetime.getUTCFullYear() % 60,
    datetime.getUTCMonth(),
    datetime.getUTCDate() - 1,
    datetime.getUTCHours(),
    datetime.getUTCMinutes(),
    datetime.getUTCSeconds(),
  ]
    .map((num) => TABLE[num])
    .join("");
};
