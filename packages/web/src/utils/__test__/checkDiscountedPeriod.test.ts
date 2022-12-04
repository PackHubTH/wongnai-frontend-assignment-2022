import checkDiscountedPeriod from "@utils/checkDiscountedPeriod";

describe("checkDiscountedPeriod", () => {
  it("should return true if it has discount and its period is in between begin and end", () => {
    jest.useFakeTimers().setSystemTime(new Date("1970-01-02T00:00:00.000Z"));
    expect(checkDiscountedPeriod({ begin: "07:00", end: "07:01" }, 10)).toBe(
      true
    );
    expect(checkDiscountedPeriod({ begin: "06:59", end: "07:00" }, 10)).toBe(
      true
    );
    expect(checkDiscountedPeriod({ begin: "07:00", end: "07:00" }, 10)).toBe(
      true
    );
    expect(checkDiscountedPeriod({ begin: "06:00", end: "08:00" }, 10)).toBe(
      true
    );
  });

  it("should return false if its period is in between begin and end but no discount", () => {
    jest.useFakeTimers().setSystemTime(new Date("1970-01-02T00:00:00.000Z"));
    expect(checkDiscountedPeriod({ begin: "07:00", end: "07:01" }, 0)).toBe(
      false
    );
    expect(checkDiscountedPeriod({ begin: "06:59", end: "07:00" }, 0)).toBe(
      false
    );
    expect(checkDiscountedPeriod({ begin: "07:00", end: "07:00" }, 0)).toBe(
      false
    );
    expect(checkDiscountedPeriod({ begin: "06:00", end: "08:00" }, 0)).toBe(
      false
    );
  });

  it("should return false if its period is not in between begin and end but have discount", () => {
    jest.useFakeTimers().setSystemTime(new Date("1970-01-02T00:00:00.000Z"));
    expect(checkDiscountedPeriod({ begin: "06:00", end: "06:59" }, 10)).toBe(
      false
    );
    expect(checkDiscountedPeriod({ begin: "07:01", end: "07:02" }, 20)).toBe(
      false
    );
  });

  it("should return false if its period is not in between begin and end and no discount", () => {
    jest.useFakeTimers().setSystemTime(new Date("1970-01-02T00:00:00.000Z"));
    expect(checkDiscountedPeriod({ begin: "06:00", end: "06:59" }, 0)).toBe(
      false
    );
    expect(checkDiscountedPeriod({ begin: "07:01", end: "07:02" }, 0)).toBe(
      false
    );
  });
});
