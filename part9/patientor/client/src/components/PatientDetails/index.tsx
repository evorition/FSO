import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";

import EntryDetails from "../EntryDetails";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";

import { Patient, Diagnosis } from "../../types";

const PatientDetails = () => {
  const style = {
    marginTop: "24px",
    marginBottom: "16px",
  };

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const { id } = useParams();
  let genderIcon;

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((patient) => setPatient(patient));
    }

    diagnosisService.getAll().then((diagnoses) => setDiagnoses(diagnoses));
  }, [id]);

  if (!patient) {
    return null;
  }

  switch (patient.gender) {
    case "female":
      genderIcon = <Female />;
      break;
    case "male":
      genderIcon = <Male />;
      break;
    case "other":
      genderIcon = <Transgender />;
      break;
  }

  return (
    <div>
      <Typography variant="h5" style={style}>
        {patient.name}
        {genderIcon}
      </Typography>
      {patient.dateOfBirth ? (
        <Box>Date of birth: {patient.dateOfBirth}</Box>
      ) : null}
      {patient.ssn ? <Box>SSN: {patient.ssn}</Box> : null}
      <Box>Occupation: {patient.occupation}</Box>
      <Typography variant="h6" style={style}>
        entries
      </Typography>
      {patient.entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientDetails;
