import { v4 as uuidv4 } from "uuid";

import patients from "../../data/patients";

import {
  PatientEntry,
  NonSensetivePatientEntry,
  NewPatientEntry,
  NewEntry,
} from "../types";

const getNonSensetiveEntries = (): NonSensetivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const getEntry = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    entries: [],
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): PatientEntry | undefined => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };

  const patientEntry = getEntry(id);
  patientEntry?.entries.push(newEntry);

  return patientEntry;
};

export default {
  getNonSensetiveEntries,
  addPatient,
  getEntry,
  addEntry,
};
