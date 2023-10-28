import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import classes from "../styles/TaskInput.module.css";
import TaskStatus from "./TaskStatus";
import SendIcon from "@mui/icons-material/Send";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TaskInput = ({ handleAddNewTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const mediaQuery = useMediaQuery("(max-width:940px)");


  return (
    <div className={classes.mainDiv}>
      {mediaQuery ? (
        <Accordion sx={{ m: "2rem auto", bgcolor: "#F5F5F5" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Add Task</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <>
              <TextField
                required
                id="name"
                label="Title"
                name="name"
                className={classes.taskInput}
                sx={{ marginTop: "2rem" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <TextField
                required
                id="name"
                multiline
                rows={8}
                label="Description"
                name="name"
                className={classes.taskInput}
                sx={{ marginTop: "2rem" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className={classes.taskStatus}>
                <TaskStatus
                  status={status}
                  handleStatusChange={(statusValue) => setStatus(statusValue)}
                />
              </div>

              <div className={classes.btn}>
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  color="secondary"
                  onClick={() => {
                    handleAddNewTask(title, description, status);
                    setTitle("");
                    setDescription("");
                    setStatus("pending");
                  }}
                >
                  Add Task
                </Button>
              </div>
            </>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <TextField
            required
            id="name"
            label="Title"
            name="name"
            className={classes.taskInput}
            sx={{ marginTop: "2rem" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            required
            id="name"
            multiline
            rows={8}
            label="Description"
            name="name"
            className={classes.taskInput}
            sx={{ marginTop: "2rem" }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className={classes.taskStatus}>
            <TaskStatus
              status={status}
              handleStatusChange={(statusValue) => setStatus(statusValue)}
            />
          </div>

          <div className={classes.btn}>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              color="secondary"
              onClick={() => {
                handleAddNewTask(title, description, status);
                setTitle("");
                setDescription("");
                setStatus("pending");
              }}
            >
              Add Task
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskInput;
