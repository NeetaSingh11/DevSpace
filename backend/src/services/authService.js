const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");
const generateToken = require("../utils/jwt");

class AuthService {
    async register(userData) {
        const { name, username, email, password } = userData;

        const existingEmail = await userRepository.findByEmail(email);

        if (existingEmail) {
            throw new Error("Email already exists");
        }

        const existingUsername = await userRepository.findByUsername(username);

        if (existingUsername) {
            throw new Error("Username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userRepository.createUser({
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
            throw new Error("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid email or password");
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