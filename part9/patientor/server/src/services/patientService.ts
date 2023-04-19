import patients from "../../data/patients";

import { NonSensetivePatientEntry } from "../types";

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

export default {
  getNonSensetiveEntries,
};
