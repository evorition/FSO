import { v4 as uuidv4 } from "uuid";

import patients from "../../data/patients";

import { PatientEntry, NonSensetivePatientEntry, Gender } from "../types";

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

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
): PatientEntry => {
  const newPatientEntry = {
    id: uuidv4(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensetiveEntries,
  addPatient,
};
