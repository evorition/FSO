import express from "express";

import { isNotNumber } from "./utils";
import { calculateBmi } from "./bmiCalculator";

const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
