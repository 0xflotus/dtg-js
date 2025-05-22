const { toBase60, toJSDate } = require("../index");

test("convert datetime to base 60", () => {
  const datetime = new Date(Date.UTC(2025, 4, 22, 10, 15, 13));
  expect(toBase60(datetime)).toBe("Xj4LAFD");
});

test("convert base 60 to datetime", () => {
  const base60 = "Xj4LAFD";
  expect(toJSDate(base60).toString()).toBe(
    new Date(Date.UTC(2025, 4, 22, 10, 15, 13)).toString(),
  );
});
