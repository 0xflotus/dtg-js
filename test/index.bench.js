import { describe, test } from "vitest";
import { toBase60, toJSDate } from "../index";

const date = new Date(Date.UTC(2025, 4, 22, 10, 15, 13));
const base60 = "Xj4LAFD";
const convertToBase60 = toBase60;
const convertToJSDate = toJSDate;

describe("dtg-js", () => {
  test("conversion", async ({ bench }) => {
    await bench("convert datetime to base 60", () => {
      convertToBase60(date);
    }).run({ time: 400 });

    await bench("convert base 60 to datetime", () => {
      convertToJSDate(base60);
    }).run({ time: 400 });
  });
});
