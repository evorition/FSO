import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";

import { Diagnosis, HealthCheckEntry as HealthCheck } from "../../types";

interface Props {
  entry: HealthCheck;
  diagnoses: Diagnosis[];
}

const HealthCheckEntry = ({ entry, diagnoses }: Props) => {
  let iconColor;

  switch (entry.healthCheckRating) {
    case 0:
      iconColor = { color: "green" };
      break;
    case 1:
      iconColor = { color: "yellow" };
      break;
    case 2:
      iconColor = { color: "red" };
      break;
    case 3:
      iconColor = { color: "black" };
      break;
  }

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
        {entry.date} <MedicalServicesIcon />
      </Box>
      <em>{entry.description}</em>
      <Box>
        <FavoriteIcon style={iconColor} />
      </Box>
      diagnose by {entry.specialist}
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

export default HealthCheckEntry;
