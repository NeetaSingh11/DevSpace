const express = require("express");

const protect =
require("../middleware/authMiddleware");

const activityController =
require("../controllers/activityController");

const router =
express.Router({ mergeParams: true });

router.get(

    "/",

    protect,

    activityController.getActivities

);

module.exports = router;