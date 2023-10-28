import React, { useState } from "react";
import classes from "../styles/Tasks.module.css";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import TaskService from "../services/Task";
import { useNavigate } from "react-router-dom";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const token = sessionStorage.getItem("token");
  const [sort, setSort] = useState(10);
  const [sortedTasks, setSortedTasks] = useState([]);
  const navigate = useNavigate();

  if(!token){
    window.location.href = window.location.origin + "/login";
  }

  const fetchAllTasks = async () => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload?.id;

    try {
      const allTasksResponse = await TaskService.GetAllTasksByUser(
        token,
        userId
      );
      const allTasksData = await allTasksResponse.json();
      return allTasksData;
    } catch (e) {
      console.log(e, "Error");
    }
  };

  useState(() => {
    (async () => {
      const allTasks = await fetchAllTasks();
      const sortedTasks = getSortedTasksByDate(allTasks?.data);
      setTasks(sortedTasks);
      setSortedTasks(sortedTasks);
    })();
  }, []);

  const getSortedTasksByDate = (tasks) => {
    return tasks.sort(function (date1, date2) {
      return new Date(date2.updatedAt) - new Date(date1.updatedAt);
    });
  };

  const handleAddNewTask = async (title, description, status) => {
    if (title && description && status) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload?.id;

      const data = {
        id: userId,
        tasks: { title, description, status },
      };

      try {
        const newTaskResponse = await TaskService.CreateNewTask(token, data);
        const newTaskData = await newTaskResponse.json();
        const sortedTasks = getSortedTasksByDate(newTaskData?.data?.tasks);
        setTasks(sortedTasks);
        handleSort(sort, sortedTasks);
      } catch (e) {
        console.log(e, "Error");
      }
    } else {
      alert("All fields are required");
    }
  };

  const handleSort = (sortVal, updatedTask = tasks) => {
    setSort(sortVal);
    const sortArray = {
      10: "all",
      20: "pending",
      30: "active",
      40: "done",
    };

    let sortedTasks = [];
    if (sortArray[sortVal] === "all") {
      sortedTasks = updatedTask;
    } else {
      sortedTasks = updatedTask?.filter(
        (task) => task.status.toString() === sortArray[sortVal]
      );
    }

    setSortedTasks(sortedTasks);
  };

  const handleTaskUpdate = async (
    currentTitle,
    currentDescription,
    currentStatus,
    id
  ) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload?.id;
    const updateData = {
      id: userId,
      title: currentTitle,
      description: currentDescription,
      status: currentStatus,
    };
    try {
      const updatedTaskListResponse = await TaskService.UpdateATask(
        token,
        id.toString(),
        updateData
      );

      const updatedTaskListData = await updatedTaskListResponse.json();
      const sortedTasks = getSortedTasksByDate(
        updatedTaskListData?.data?.tasks
      );
      setTasks(sortedTasks);
      handleSort(sort, sortedTasks);
    } catch (e) {
      console.log(e, "Error");
    }
  };

  const handleTaskDelete = async (taskId) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload?.id;
    try {
      const data = {
        userId,
      };
      const deletedtaskListResponse = await TaskService.DeleteATask(
        token,
        taskId,
        data
      );

      const deletedtaskListData = await deletedtaskListResponse.json();
      const sortedTask = getSortedTasksByDate(deletedtaskListData?.data?.tasks);

      setTasks(sortedTask);
      handleSort(sort, sortedTask);
    } catch (e) {
      console.log(e, "Error");
    }
  };

  return (
    <div className={classes.mainDiv}>
      <div className={classes.navbar}>
        <div>Tasks</div>

        <div
          className={classes.logout}
          onClick={() => {
            sessionStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </div>
      </div>

      <div className={classes.mainTaskDiv}>
        <TaskInput handleAddNewTask={handleAddNewTask} />
        <TaskList
          taskList={sortedTasks}
          handleTaskUpdate={handleTaskUpdate}
          handleTaskDelete={handleTaskDelete}
          sort={sort}
          handleSort={handleSort}
        />
      </div>
    </div>
  );
};

export default Tasks;
