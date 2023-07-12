import {
  Gender,
  NewEntry,
  NewPatientEntry,
  DiagnoseEntry,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing data");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing data");
  }

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing data");
  }

  return ssn;
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing data");
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing data");
  }

  return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }

  throw new Error("Incorrect or missing data");
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing data");
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing data");
  }

  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<DiagnoseEntry["code"]>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry["code"]>;
};

const isHealthCheckRating = (value: unknown): value is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(value as HealthCheckRating);
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
  const rating = Number(value);

  if (isNaN(rating) || !isHealthCheckRating(rating)) {
    throw new Error("Invalid health check rating");
  }

  return rating;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect or missing data");
  }

  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error("Incorrect or missing data");
  }

  return criteria;
};

const parseDischarge = (
  object: unknown
): { date: string; criteria: string } => {
  if (
    object &&
    typeof object === "object" &&
    "date" in object &&
    "criteria" in object
  ) {
    const discharge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria),
    };
    return discharge;
  }

  throw new Error("Incorrect or missing data");
};

const parseSickLeave = (
  object: unknown
): { startDate: string; endDate: string } | undefined => {
  if (
    object &&
    typeof object === "object" &&
    "sickLeave" in object &&
    object.sickLeave &&
    typeof object.sickLeave === "object" &&
    "startDate" in object.sickLeave &&
    "endDate" in object.sickLeave
  ) {
    return {
      startDate: parseDate(object.sickLeave.startDate),
      endDate: parseDate(object.sickLeave.endDate),
    };
  }

  return undefined;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in object &&
    "description" in object &&
    "date" in object &&
    "specialist" in object
  ) {
    const newBaseEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object),
    };

    if (object.type === "HealthCheck" && "healthCheckRating" in object) {
      const newEntry: NewEntry = {
        ...newBaseEntry,
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return newEntry;
    } else if (
      object.type === "OccupationalHealthcare" &&
      "employerName" in object
    ) {
      const newEntry: NewEntry = {
        ...newBaseEntry,
        type: object.type,
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object),
      };
      return newEntry;
    } else if (object.type === "Hospital" && "discharge" in object) {
      const newEntry: NewEntry = {
        ...newBaseEntry,
        type: object.type,
        discharge: parseDischarge(object.discharge),
      };
      return newEntry;
    }
  }

  throw new Error("Incorrect or missing data");
};
