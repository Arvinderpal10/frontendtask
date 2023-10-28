export default class TaskService {
  //Create a new task by the current logged in user
  static CreateNewTask = async (token, data) => {
    return await fetch("http://localhost:3001/task/createTask", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  //Get all the tasks by the current logged in user
  static GetAllTasksByUser = async (token, id) => {
    return await fetch(`http://localhost:3001/task/getTasksByUserId/${id}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //Updates a task by the given task id of the current logged in user
  static UpdateATask = async (token, taskId, data) => {
    return await fetch(
      `http://localhost:3001/task/updateTaskByUserId/${taskId}`,
      {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  };

  //Delete a task of the current logged in user
  static DeleteATask = async (token, taskId, data) => {
    return await fetch(
      `http://localhost:3001/task/deleteTask/${taskId}`,
      {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  };
}
