import { describe, expect, test } from "vitest";
import { toBase60, toJSDate } from "../index";

describe("dtg-js", () => {
  test("invalid base 60 string", () => {
    expect(() => toJSDate("foobar")).toThrow(
      "It\'s not a valid base 60 string",
    );
  });

  test("invalid datetime object", () => {
    expect(() => toBase60(null)).toThrow(
      '"datetime" is not a valid Date object',
    );
  });

  test("convert datetime to base 60", () => {
    const datetime = new Date(Date.UTC(2025, 4, 22, 10, 15, 13));
    expect(toBase60(datetime)).toBe("Xj4LAFD");
  });

  test("convert base 60 to datetime", () => {
    const base60 = "Xj4LAFD";
    expect(toJSDate(base60)).toEqual(
      new Date(Date.UTC(2025, 4, 22, 10, 15, 13)),
    );
  });
});
