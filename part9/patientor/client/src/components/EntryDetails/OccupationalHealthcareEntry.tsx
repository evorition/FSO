import { Box } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

import {
  Diagnosis,
  OccupationalHealthcareEntry as OccupationalHealthcare,
} from "../../types";

interface Props {
  entry: OccupationalHealthcare;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntry = ({ entry, diagnoses }: Props) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: "4px",
        padding: "4px",
        marginBottom: "4px",
      }}
    >
      <Box>
        {entry.date} <WorkIcon /> {entry.employerName}
      </Box>
      <Box>
        <em>{entry.description}</em>
      </Box>
      {entry.sickLeave && (
        <Box>
          Sick leave since {entry.sickLeave.startDate} till{" "}
          {entry.sickLeave.endDate}
        </Box>
      )}
      <Box>diagnose by {entry.specialist}</Box>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map((code, index) => (
            <li key={index}>
              {code}{" "}
              {diagnoses.find((diagnose) => diagnose.code === code)?.name}
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default OccupationalHealthcareEntry;
