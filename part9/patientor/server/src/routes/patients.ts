import express from "express";

import patientService from "../services/patientService";

import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensetiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.getEntry(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    console.log(errorMessage);
    res.status(400).json({ error: errorMessage });
  }
});

export default router;
