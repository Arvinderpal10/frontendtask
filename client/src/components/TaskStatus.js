import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function TaskStatus({ status, handleStatusChange }) {
  // const [alignment, setAlignment] = React.useState("pending");

  const handleChange = (event, newAlignment) => {
    // setAlignment(newAlignment);
    handleStatusChange(newAlignment);
  };

  return (
    <div>
      <ToggleButtonGroup
        color="primary"
        value={status}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton sx={{ color: "orangered" }} value="pending">
          Pending
        </ToggleButton>
        <ToggleButton sx={{ color: "lightskyblue" }} value="active">
          Active
        </ToggleButton>
        <ToggleButton sx={{ color: "lightgreen" }} value="done">
          Done
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
