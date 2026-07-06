const express = require("express");

const projectController = require("../controllers/projectController");
const protect = require("../middleware/authMiddleware");
const taskRoutes = require("./taskRoutes");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router({ mergeParams: true });

router.post(
    "/",
    protect,
    authorize(
        "Owner",
        "Admin"
    ),
    projectController.createProject
);

router.get(
    "/",
    protect,
    projectController.getProjects
);

router.use(
    "/:projectId/tasks",
    taskRoutes
);

router.put(
    "/:id",
    protect,
    authorize("Owner", "Admin"),
    projectController.updateProject
);

router.delete(
    "/:id",
    protect,
    authorize("Owner", "Admin"),
    projectController.deleteProject
);

module.exports = router;