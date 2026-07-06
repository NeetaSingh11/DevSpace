const authService = require("../services/authService");
const asyncHandler = require("../utils/asyncHandler");

class AuthController {

    register = asyncHandler(async (req, res) => {

        const user = await authService.register(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    });

    login = asyncHandler(async (req, res) => {

        const { email, password } = req.body;

        const data = await authService.login(email, password);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data,
        });

    });

    profile = asyncHandler(async (req, res) => {

        const profile = await authService.getProfile(req.user._id);

        res.status(200).json({
            success: true,
            data: profile,
        });

    });

}

module.exports = new AuthController();