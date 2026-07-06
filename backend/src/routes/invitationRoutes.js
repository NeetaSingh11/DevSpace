const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const invitationController =
require("../controllers/invitationController");

const router = express.Router({ mergeParams:true });

router.post(
    "/",
    protect,
    authorize("Owner","Admin"),
    invitationController.inviteMember
);

router.get(
    "/pending",
    protect,
    invitationController.getPendingInvitations
);

router.patch(
    "/:invitationId/accept",
    protect,
    invitationController.acceptInvitation
);

module.exports = router;