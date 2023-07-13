import { useState, SyntheticEvent } from "react";
import {
  Select,
  MenuItem,
  TextField,
  Button,
  SelectChangeEvent,
  Alert,
  Typography,
  InputLabel,
  FormControl,
} from "@mui/material";

import HealthCheckFields from "./HealthCheckFields";
import OccupationalHealthcareFields from "./OccupationalHealthcareFields";
import HospitalFields from "./HospitalFields";
import { EntryFormValues, DiagnoseEntry, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  diagnoses: Array<DiagnoseEntry>;
  error: undefined | string;
}

const AddEntryForm = ({ onSubmit, onCancel, diagnoses, error }: Props) => {
  const [entryType, setEntryType] = useState("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<DiagnoseEntry["code"]>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );
  const [employerName, setEmployerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [criteria, setCriteria] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");

  const renderSelectedEntryType = () => {
    if (entryType === "HealthCheck") {
      return (
        <HealthCheckFields
          healthCheckRating={healthCheckRating}
          setHealthCheckRating={setHealthCheckRating}
        />
      );
    } else if (entryType === "OccupationalHealthcare") {
      return (
        <OccupationalHealthcareFields
          employerName={employerName}
          setEmployerName={setEmployerName}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      );
    } else if (entryType === "Hospital") {
      return (
        <HospitalFields
          criteria={criteria}
          setCriteria={setCriteria}
          dischargeDate={dischargeDate}
          setDischargeDate={setDischargeDate}
        />
      );
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    if (entryType === "HealthCheck") {
      onSubmit({
        type: entryType,
        ...baseEntry,
        healthCheckRating,
      });
    } else if (entryType === "OccupationalHealthcare") {
      if (startDate !== "" && endDate !== "") {
        onSubmit({
          type: entryType,
          ...baseEntry,
          employerName,
          sickLeave: {
            startDate,
            endDate,
          },
        });
      } else {
        onSubmit({
          type: entryType,
          ...baseEntry,
          employerName,
          sickLeave: undefined,
        });
      }
    } else if (entryType === "Hospital") {
      onSubmit({
        type: entryType,
        ...baseEntry,
        discharge: {
          date: dischargeDate,
          criteria,
        },
      });
    }
  };

  const handleDiagnosisChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>,
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <Typography
        component="span"
        sx={{ display: "flex", alignItems: "center", gap: "4px" }}
      >
        New
        <Select
          variant="standard"
          value={entryType}
          onChange={({ target }) => setEntryType(target.value)}
          sx={{ marginTop: "8px", marginBottom: "8px" }}
        >
          <MenuItem selected={true} value={"HealthCheck"}>
            Health check entry
          </MenuItem>
          <MenuItem value={"OccupationalHealthcare"}>
            Occupational healthcare entry
          </MenuItem>
          <MenuItem value={"Hospital"}>Hospital entry</MenuItem>
        </Select>
        Entry
      </Typography>
      {error && (
        <Alert severity="error" style={{ marginBottom: "8px" }}>
          {error}
        </Alert>
      )}
      <form
        onSubmit={addEntry}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          border: "1px dashed",
          padding: "12px",
        }}
      >
        <TextField
          fullWidth
          required
          variant="standard"
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          fullWidth
          required
          variant="standard"
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          fullWidth
          required
          variant="standard"
          label="Specialist"
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <FormControl variant="standard">
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            fullWidth
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisChange}
          >
            {diagnoses.map((diagnose) => {
              return (
                <MenuItem key={diagnose.name} value={diagnose.code}>
                  {diagnose.code}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {renderSelectedEntryType()}
        <div>
          <Button
            style={{
              float: "left",
            }}
            variant="contained"
            color="error"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddEntryForm;
