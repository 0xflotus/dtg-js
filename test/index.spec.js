import { describe, expect, test } from "vitest";
import { toBase60, toJSDate } from "../index";

describe("dtg-js", () => {
  test("invalid base 60 string length", () => {
    expect(() => toJSDate("123")).toThrowErrorMatchingInlineSnapshot(
      `[Error: Invalid base60 length]`,
    );
    expect(() => toJSDate("12345678")).toThrowErrorMatchingInlineSnapshot(
      `[Error: Invalid base60 length]`,
    );
  });

  test("invalid characters in base 60 string", () => {
    expect(() => toJSDate("XXXXXX!")).toThrowErrorMatchingInlineSnapshot(
      `[Error: Invalid character]`,
    );
    expect(() => toJSDate("Xj4LA?D")).toThrowErrorMatchingInlineSnapshot(
      `[Error: Invalid character]`,
    );
  });

  test("invalid datetime object", () => {
    expect(() => toBase60(null)).toThrowErrorMatchingInlineSnapshot(
      `[Error: "date" is not a valid Date object]`,
    );
    expect(() => toBase60("2025-05-22")).toThrowErrorMatchingInlineSnapshot(
      `[Error: "date" is not a valid Date object]`,
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

  test.each([
    new Date(Date.UTC(2000, 0, 1, 0, 0, 0)),
    new Date(Date.UTC(1999, 11, 31, 23, 59, 59)),
    new Date(Date.UTC(2050, 6, 15, 12, 30, 45)),
    new Date(Date.UTC(2023, 2, 26, 14, 5, 9)),
  ])("round-trip conversion for %s", (d) => {
    const base60 = toBase60(d);
    const parsed = toJSDate(base60);
    expect(parsed).toEqual(d);
  });

  test.each([
    new Date(Date.UTC(0, 0, 1, 0, 0, 0)),
    new Date(Date.UTC(3599, 11, 31, 23, 59, 59)),
  ])("boundary year round-trip for %s", (date) => {
    expect(toJSDate(toBase60(date))).toEqual(date);
  });

  test("all valid base60 characters", () => {
    const TABLE =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx";
    for (let c of TABLE) {
      const val = toJSDate("0".repeat(6) + c);
      expect(val instanceof Date).toBe(true);
    }
  });
});
