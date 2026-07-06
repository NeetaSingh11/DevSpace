const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");
const generateToken = require("../utils/jwt");
const AppError = require("../utils/AppError");

class AuthService {
    async register(userData) {
        const { name, username, email, password } = userData;

        const existingEmail = await userRepository.findByEmail(email);

        if (existingEmail) {
            throw new AppError("Email already exists", 400);
        }

        const existingUsername = await userRepository.findByUsername(username);

        if (existingUsername) {
            throw new AppError("Username already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.create({
            name,
            username,
            email,
            password: hashedPassword,
        });

        return {
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
            },
            token: generateToken(user._id),
        };
    }

    async login(email, password) {

        const user = await userRepository.findByEmailWithPassword(email);

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new AppError("Invalid email or password", 401);
        }

        user.lastLogin = new Date();
        await user.save();

        return {
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
            },
            token: generateToken(user._id),
        };
    }

    async getProfile(userId) {

        const user = await userRepository.findById(userId);

        return {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            bio: user.bio,
            isVerified: user.isVerified,
            lastLogin: user.lastLogin,
            createdAt: user.createdAt,
        };
    }
}

module.exports = new AuthService();