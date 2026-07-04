require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Connect Database
        await connectDB();

        // Start Server
        app.listen(PORT, () => {
            console.log("=================================");
            console.log(`🚀 DevSpace Server Running`);
            console.log(`🌐 http://localhost:${PORT}`);
            console.log("=================================");
        });
    } catch (error) {
        console.error("❌ Failed to start server");
        process.exit(1);
    }
};

startServer();