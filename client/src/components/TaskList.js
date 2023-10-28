import React from "react";
import classes from "../styles/TaskList.module.css";
import TaskItem from "./TaskItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const TaskList = ({
  taskList,
  sort,
  handleSort,
  handleTaskUpdate,
  handleTaskDelete,
}) => {
  const mediaQuery = useMediaQuery("(max-width:940px)");

  return (
    <div className={classes.mainDiv}>
      <div className={classes.taskListHeader}>
        <div style={{ margin: "auto" }}>Your Tasks</div>
        <div>
          <FormControl>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Sort
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              label="Age"
              onChange={(e) => {
                handleSort(e.target.value);
              }}
              defaultValue={10}
              sx={{ maxWidth: 80 }}
            >
              <MenuItem value={10}>All</MenuItem>
              <MenuItem value={20}>Pending</MenuItem>
              <MenuItem value={30}>Active</MenuItem>
              <MenuItem value={40}>Done</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {mediaQuery ? (
        <Accordion sx={{ m: "2rem auto", bgcolor: "#F5F5F5" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Show tasks</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {taskList?.length ? (
              <div className={classes.taskItem}>
                {taskList?.map((task) => (
                  <TaskItem
                    key={task._id}
                    id={task._id}
                    title={task.title}
                    description={task.description}
                    status={task.status}
                    createdDate={task.createdAt}
                    handleTaskUpdate={handleTaskUpdate}
                    handleTaskDelete={handleTaskDelete}
                  />
                ))}
              </div>
            ) : (
              <div className={classes.emptyList}> No tasks found </div>
            )}
          </AccordionDetails>
        </Accordion>
      ) : (
        <div className={classes.taskItem}>
          {taskList?.map((task) => (
            <TaskItem
              key={task._id}
              id={task._id}
              title={task.title}
              description={task.description}
              status={task.status}
              createdDate={task.createdAt}
              handleTaskUpdate={handleTaskUpdate}
              handleTaskDelete={handleTaskDelete}
            />
          ))}
        </div>
      )}

      {taskList.length === 0 && !mediaQuery ? (
        <div className={classes.emptyList}> No tasks found </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TaskList;
