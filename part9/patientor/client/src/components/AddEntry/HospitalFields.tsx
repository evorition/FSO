import { Dispatch, SetStateAction } from "react";
import { TextField } from "@mui/material";

interface Props {
  dischargeDate: string;
  setDischargeDate: Dispatch<SetStateAction<string>>;
  criteria: string;
  setCriteria: Dispatch<SetStateAction<string>>;
}

const HospitalFields = ({
  dischargeDate,
  setDischargeDate,
  criteria,
  setCriteria,
}: Props) => {
  return (
    <div>
      <TextField
        fullWidth
        required
        variant="standard"
        label="Discharge date"
        InputLabelProps={{ shrink: true }}
        type="date"
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
      />
      <TextField
        fullWidth
        required
        variant="standard"
        label="Criteria"
        value={criteria}
        onChange={({ target }) => setCriteria(target.value)}
      />
    </div>
  );
};

export default HospitalFields;
