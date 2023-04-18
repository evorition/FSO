interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
