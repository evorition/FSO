import { Dispatch, SetStateAction } from "react";
import { Select, MenuItem } from "@mui/material";

import { HealthCheckRating } from "../../types";

interface Props {
  healthCheckRating: HealthCheckRating;
  setHealthCheckRating: Dispatch<SetStateAction<HealthCheckRating>>;
}

const HealthCheckFields = ({
  healthCheckRating,
  setHealthCheckRating,
}: Props) => {
  const ratingKeys = Object.values(HealthCheckRating).filter(
    (value) => typeof value === "string",
  ) as HealthCheckRating[];

  return (
    <div>
      <Select
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
      >
        {ratingKeys.map((key) => {
          const rating = HealthCheckRating[key];

          return (
            <MenuItem key={rating} value={rating}>
              {key}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default HealthCheckFields;
