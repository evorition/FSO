// import { isNotNumber } from "./utils";

// interface exerciseValues {
//   dailyHours: number[];
//   target: number;
// }

// const parseArguments = (args: string[]): exerciseValues => {
//   if (args.length < 4) throw new Error("Not enough arguments");
//   if ([...args.slice(2)].every((arg) => !isNotNumber(arg))) {
//     return {
//       target: Number(args[2]),
//       dailyHours: args.slice(3).map((arg) => Number(arg)),
//     };
//   } else {
//     throw new Error("Provided values are not numbers");
//   }
// };

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number
): Result => {
  const average =
    dailyHours.reduce((total, hours) => total + hours, 0) / dailyHours.length;

  const diff = Math.abs(average - target);
  const maxDiff = Math.max(Math.abs(target - 1), Math.abs(target - 3));

  let rating;
  let ratingDescription;

  if (diff === 0 || average >= target) {
    rating = 3;
    ratingDescription = "Excellent!";
  } else if (diff <= maxDiff / 2) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You didn't even tried";
  }

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((hours) => hours > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   const { dailyHours, target } = parseArguments(process.argv);
//   console.log(calculateExercises(dailyHours, target));
// } catch (error: unknown) {
//   let errorMessage = "Something bad happened";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
