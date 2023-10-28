import {
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import classes from "../styles/TaskItem.module.css";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskItem = ({
  title,
  description,
  status,
  id,
  createdDate,
  handleTaskUpdate,
  handleTaskDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStatus, setCurrentStatus] = React.useState(status);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getStatusBgColor = () => {
    if (status === "pending") {
      return "orangered";
    } else if (status === "active") {
      return "lightskyblue";
    } else {
      return "lightgreen";
    }
  };

  return (
    <div className={classes.mainDiv}>
      <div className={classes.editBtn}>
        <EditIcon
          onClick={(e) => {
            if (id === e.currentTarget.id.toString()) {
              setIsEditing(!isEditing);
            }
          }}
          id={id}
          sx={{ color: "#199DE0" }}
        />
      </div>

      <div className={classes.deleteBtn}>
        <DeleteIcon
          onClick={() => {
            handleTaskDelete(id);
          }}
          id={id}
          sx={{ color: "orangered" }}
        />
      </div>

      <div>
        <h3 style={{ marginBottom: ".5rem", letterSpacing: ".2rem" }}>Title</h3>
        {isEditing ? (
          <TextField
            className={classes.taskEditItemText}
            onChange={(e) => setCurrentTitle(e.target.value)}
            value={currentTitle}
          />
        ) : (
          <p className={classes.taskItemText}>{title}</p>
        )}
      </div>

      <div>
        <h3 style={{ marginBottom: ".5rem", letterSpacing: ".2rem" }}>
          Description
        </h3>
        {isEditing ? (
          <TextField
            multiline
            rows={8}
            className={classes.taskEditItemText}
            onChange={(e) => setCurrentDescription(e.target.value)}
            value={currentDescription}
          />
        ) : (
          <p className={classes.taskItemText}>{description}</p>
        )}
      </div>

      <div>
        <h3 style={{ letterSpacing: ".2rem" }}>Status</h3>
        {isEditing ? (
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
            >
              <FormControlLabel
                value="pending"
                control={<Radio />}
                label="Pending"
              />
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel value="done" control={<Radio />} label="Done" />
            </RadioGroup>
          </FormControl>
        ) : (
          <Chip
            sx={{ m: ".5rem 0", bgcolor: getStatusBgColor() }}
            label={`${status[0].toUpperCase()}${status.slice(1)}`}
            color="primary"
            size="small"
          />
        )}
      </div>

      {isEditing ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            className={classes.updateBtn}
            color="secondary"
            onClick={() => {
              handleTaskUpdate(
                currentTitle,
                currentDescription,
                currentStatus,
                id
              );

              setIsEditing(false);
            }}
          >
            Update
          </Button>
        </div>
      ) : (
        <></>
      )}

      <div className={classes.createdDate}>
        <p>{new Date(createdDate).toLocaleDateString("en-US", options)}</p>
      </div>
    </div>
  );
};

export default TaskItem;
