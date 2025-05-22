const toJSDate = (base60) => {
  if (!/^[0-9A-Za-x]{7}$/.test(base60)) {
    throw new Error("It\'s not a valid base 60 string");
  }

  // prettier-ignore
  const table = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x'
];

  const mem = [];
  for (let char of base60) {
    mem.push(table.indexOf(char));
  }

  return new Date(
    Date.UTC(mem[0] * 60 + mem[1], mem[2], mem[3] + 1, mem[4], mem[5], mem[6]),
  );
};

const toBase60 = (datetime) => {
  if ((!datetime) instanceof Date) {
    throw new Error('"datetime" is not a valid Date object');
  }

  // prettier-ignore
  const table = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
        'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x'
    ];

  return (
    table[Math.floor(datetime.getUTCFullYear() / 60)] +
    table[datetime.getUTCFullYear() % 60] +
    table[datetime.getUTCMonth()] +
    table[datetime.getUTCDate() - 1] +
    table[datetime.getUTCHours()] +
    table[datetime.getUTCMinutes()] +
    table[datetime.getUTCSeconds()]
  );
};

module.exports = { toBase60, toJSDate };
