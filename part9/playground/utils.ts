export const isNotNumber = (value: unknown): boolean => isNaN(Number(value));

export const isNotArrayOfNumbers = (value: unknown): boolean => {
  if (!Array.isArray(value)) {
    return true;
  }

  return value.some((v) => isNotNumber(v));
};
