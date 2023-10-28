const router = require("express").Router();
const taskController = require("../controllers/task");
const auth = require("../middleware/auth");

router.get("/getTasksByUserId/:id", auth, taskController.getTasksByUserId);
router.post("/createTask", auth, taskController.createTask);
router.patch("/updateTaskByUserId/:id", auth, taskController.updateTaskByUserId);
router.patch("/deleteTask/:id", auth, taskController.deleteTask);

module.exports = router;
