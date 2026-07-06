const express = require("express");

const taskController = require("../controllers/taskController");
const protect = require("../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });

router.post(
    "/",
    protect,
    taskController.createTask
);

router.get(
    "/",
    protect,
    taskController.getTasks
);

router.patch(
    "/:taskId/assign",
    protect,
    taskController.assignTask
);

router.patch(
    "/:taskId/status",
    protect,
    taskController.updateTaskStatus
);

router.put(
    "/:taskId",
    protect,
    taskController.updateTask
);

router.delete(
    "/:taskId",
    protect,
    taskController.deleteTask
);

router.get(
    "/dashboard/stats",
    protect,
    taskController.dashboardStats
);

module.exports = router;