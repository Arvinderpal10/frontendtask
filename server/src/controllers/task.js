const mongoose = require("mongoose");
const Task = mongoose.model("Task");
const SubTask = mongoose.model("SubTask");
const User = mongoose.model("User");

exports.createTask = async (req, res) => {
  const { tasks, id } = req.body;
  const userId = id;
  const { title, description, status } = tasks;

  try {
    if (!title || !description || !status) {
      res.json({
        message: "All fields are required.",
        status: 400,
      });
    }

    if (!userId) {
      res.json({
        message: "User id is required while creating a new task.",
        status: 500,
      });
    }

    const existingUserTasks = await Task.findOne({ _id: userId });

    if (!existingUserTasks) {
      if (title && description && status && userId) {
        const task = new Task({
          _id: userId,
          tasks: tasks,
        });

        const newTask = await task.save({ _id: task._id, tasks: task });
        res.json({
          data: newTask,
          status: 201,
        });
      }
    } else {
      if (title && description && status && userId) {
        const task = new SubTask({
          title: tasks.title,
          description: tasks.description,
          status: tasks.status,
        });

        const newTask = await Task.findOneAndUpdate(
          { _id: userId },
          { $push: { tasks: task } },
          { new: true }
        );
        res.json({
          data: newTask,
          status: 201,
        });
      }
    }
  } catch (e) {
    res.json({
      message: "Something went wrong from our end.",
      status: 500,
    });
  }
};

exports.getTasksByUserId = async (req, res) => {
  const id = req.params.id;

  try {
    const taskByUserExists = await Task.findOne({ _id: id });

    if (taskByUserExists) {
      res.json({
        data: taskByUserExists.tasks,
        status: 201,
      });
    } else {
      res.json({
        data: [],
        message: "No tasks by this user found",
      });
    }
  } catch (e) {
    res.json({
      message: "Something went wrong from our end.",
    });
  }
};

exports.updateTaskByUserId = async (req, res) => {
  const { title, description, status, id } = req.body;
  const taskId = req.params.id;
  const userId = id;

  const userWithTasks = await Task.findOne({ _id: userId });

  if (userWithTasks?.tasks?.length) {
    const taskByUserExists = userWithTasks.tasks.filter(
      (task) => task._id.toString() === taskId
    );
    if (taskByUserExists?.length) {
      const updatedTask = await Task.findOneAndUpdate(
        { "tasks._id": taskId },
        {
          $set: {
            "tasks.$.title": title ? title : taskByUserExists[0].title,
            "tasks.$.description": description
              ? description
              : taskByUserExists[0].description,
            "tasks.$.status": status ? status : taskByUserExists[0].status,
          },
        },
        { new: true }
      );

      res.json({
        data: updatedTask,
      });
    } else {
      res.json({
        data: [],
        message: "No tasks by this user with the given task id found",
        status: 400,
      });
    }
  }

  try {
  } catch (e) {
    res.json({
      message: e,
      status: 500,
    });
  }
};

exports.deleteTask = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const existingTaskOfUser = await Task.findOne({ _id: userId });
    if (existingTaskOfUser?.tasks?.length) {
      const updatedTask = await Task.findOneAndUpdate(
        { "tasks._id": id },
        {
          $pull: {
            tasks: { _id: id },
          },
        },

        { new: true }
      );
      res.json({
        data: updatedTask,
        message: `Task with ${id} deleted successfully`,
      });
    } else {
      res.json({
        data: {},
        message: "No task with the given id found",
      });
    }
  } catch (e) {
    res.json({
      message: "Something went wrong from our end.",
      status: 500,
    });
  }
};
