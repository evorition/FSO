import express from "express";

import { isNotNumber, isNotArrayOfNumbers } from "./utils";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  if (isNotNumber(weight) || isNotNumber(height)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(Number(height), Number(weight));
  return res.json({ weight: Number(weight), height: Number(height), bmi });
});

app.post("/exercises", (req, res) => {
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "parameters missing" });
  } else if (isNotNumber(target) || isNotArrayOfNumbers(daily_exercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
