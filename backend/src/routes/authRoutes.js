const express = require("express");

const authController = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const {
    registerValidator,
    loginValidator,
} = require("../validators/authValidator");

const router = express.Router();

// Register
router.post(
    "/register",
    registerValidator,
    authController.register
);

// Login
router.post(
    "/login",
    loginValidator,
    authController.login
);

router.get(
    "/profile",
    protect,
    authController.profile
);

module.exports = router;