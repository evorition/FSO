import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Female, Male, Transgender } from "@mui/icons-material";
import axios from "axios";

import EntryDetails from "../EntryDetails";
import AddEntry from "../AddEntry";

import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnosis";

import { Patient, Diagnosis, EntryFormValues } from "../../types";

const PatientDetails = () => {
  const style = {
    marginTop: "24px",
    marginBottom: "16px",
  };

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();

  const { id } = useParams() as { id: string };
  let genderIcon;

  useEffect(() => {
    patientService.getOne(id).then((patient) => setPatient(patient));
    diagnosisService.getAll().then((diagnoses) => setDiagnoses(diagnoses));
  }, [id]);

  if (!patient) {
    return null;
  }

  const openForm = () => {
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const newEntry = await patientService.createEntry(id, values);
      setPatient({
        ...patient,
        entries: patient.entries.concat(newEntry),
      });
      closeForm();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data.error === "string") {
          const message = e.response.data.error.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

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
      {!open && (
        <Button variant="contained" onClick={() => openForm()}>
          Add New Entry
        </Button>
      )}
      {open && (
        <AddEntry
          onSubmit={submitNewEntry}
          onCancel={closeForm}
          diagnoses={diagnoses}
          error={error}
        />
      )}
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
