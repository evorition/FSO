import { Dispatch, SetStateAction } from "react";
import { TextField, InputLabel } from "@mui/material";

interface Props {
  employerName: string;
  setEmployerName: Dispatch<SetStateAction<string>>;
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
}

const OccupationalHealthcareFields = ({
  employerName,
  setEmployerName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) => {
  return (
    <>
      <TextField
        fullWidth
        required
        variant="standard"
        label="Employer name"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <InputLabel>Sickleave</InputLabel>
      <TextField
        sx={{ marginLeft: "16px" }}
        label="Start"
        variant="standard"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
      />
      <TextField
        sx={{ marginLeft: "16px" }}
        label="End"
        variant="standard"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={({ target }) => setEndDate(target.value)}
      />
    </>
  );
};

export default OccupationalHealthcareFields;
