import { describe, expect, it, test, vi } from "vitest";
import { toBase60, toJSDate } from "../index";

const BASE60_ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx";

describe("dtg-js", () => {
  describe("error handling", () => {
    test.each(["123", "12345678"])("invalid base 60 string length", (input) => {
      expect(() => toJSDate(input)).toThrowErrorMatchingInlineSnapshot(
        `[Error: Invalid base60 length]`,
      );
    });

    test.each([
      ["XXXXXX!", "!"],
      ["Xj4LA?D", "?"],
      ["Xj4LAéD", "é"],
      ["000000y", "y"],
      ["000000z", "z"],
    ])("invalid characters in base 60 string", (input, character) => {
      expect(() => toJSDate(input)).toThrow(`Invalid character: ${character}`);
    });

    test.each([null, "2025-05-22"])("invalid datetime object", (date) => {
      expect(() => toBase60(date)).toThrowErrorMatchingInlineSnapshot(
        `[Error: "date" is not a valid Date object]`,
      );
    });
  });

  describe("conversion", () => {
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

    const yearZero = new Date(0);
    yearZero.setUTCFullYear(0, 0, 1);
    yearZero.setUTCHours(0, 0, 0, 0);

    test.each([yearZero, new Date(Date.UTC(3599, 11, 31, 23, 59, 59))])(
      "boundary year round-trip for %s",
      (date) => {
        expect(toJSDate(toBase60(date))).toEqual(date);
      },
    );

    it.each(BASE60_ALPHABET.split(""))(
      "decodes valid base60 character %s to its value",
      (character) => {
        const value = toJSDate("0".repeat(6) + character);
        expect(value.getUTCSeconds()).toBe(BASE60_ALPHABET.indexOf(character));
      },
    );

    test("round-trip conversion for mocked today's date", () => {
      vi.setSystemTime(new Date("2026-09-16T10:33:07.000Z"));
      const today = new Date();

      expect(toBase60(today)).toEqual("Xk8FAX7");

      vi.useRealTimers();
    });
  });
});
