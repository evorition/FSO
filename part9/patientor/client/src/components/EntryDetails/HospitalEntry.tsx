import { Box } from "@mui/material";
import HealingIcon from "@mui/icons-material/Healing";

import { Diagnosis, HospitalEntry as Hospital } from "../../types";

interface Props {
  entry: Hospital;
  diagnoses: Diagnosis[];
}

const HospitalEntry = ({ entry, diagnoses }: Props) => {
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
        {entry.date} <HealingIcon />
      </Box>
      <Box>
        <em>{entry.description}</em>
      </Box>
      <Box>
        Discharged by {entry.discharge.date} because of{" "}
        {entry.discharge.criteria}
      </Box>
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

export default HospitalEntry;
