const dns = require("dns");
dns.setServers(["8.8.8.8"]);

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Using DNS:", dns.getServers());

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error);

        process.exit(1);
    }
};

module.exports = connectDB;