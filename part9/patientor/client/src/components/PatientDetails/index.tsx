import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";

import patientService from "../../services/patients";

import { Patient } from "../../types";

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams();
  let genderIcon;

  useEffect(() => {
    if (id) {
      patientService.getOne(id).then((patient) => setPatient(patient));
    }
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
      <Typography
        variant="h5"
        style={{ marginTop: "8px", marginBottom: "8px" }}
      >
        {patient.name}
        {genderIcon}
      </Typography>
      {patient.dateOfBirth ? (
        <Box>Date of birth: {patient.dateOfBirth}</Box>
      ) : null}
      {patient.ssn ? <Box>SSN: {patient.ssn}</Box> : null}
      <Box>Occupation: {patient.occupation}</Box>
    </div>
  );
};

export default PatientDetails;
