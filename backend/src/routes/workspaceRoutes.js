const express = require("express");

const workspaceController = require("../controllers/workspaceController");
const protect = require("../middleware/authMiddleware");
const projectRoutes = require("./projectRoutes");
const activityRoutes = require("./activityRoutes");
const invitationRoutes = require("./invitationRoutes");

const router = express.Router();

router.post(
    "/",
    protect,
    workspaceController.createWorkspace
);

router.get(
    "/",
    protect,
    workspaceController.getMyWorkspaces
);

router.get(
    "/:id",
    protect,
    workspaceController.getWorkspaceById
);

router.put(
    "/:id",
    protect,
    workspaceController.updateWorkspace
);

router.delete(
    "/:id",
    protect,
    workspaceController.deleteWorkspace
);

router.use(
    "/:workspaceId/projects",
    projectRoutes
);

router.use(
    "/:workspaceId/activities",
    activityRoutes
);

router.use(
    "/:workspaceId/invitations",
    invitationRoutes
);

module.exports = router;