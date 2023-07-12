import { Dispatch, SetStateAction } from "react";
import { Input, TextField } from "@mui/material";

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
    <div>
      <TextField
        fullWidth
        variant="standard"
        label="Employer name"
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
      />
      <Input
        fullWidth
        type="date"
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
      />
      <Input
        fullWidth
        type="date"
        value={endDate}
        onChange={({ target }) => setEndDate(target.value)}
      />
    </div>
  );
};

export default OccupationalHealthcareFields;
