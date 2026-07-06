const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const workspaceRoutes = require("./routes/workspaceRoutes");
const invitationRoutes = require("./routes/invitationRoutes");
const taskRoutes = require("./routes/taskRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://YOUR-VERCEL-URL.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
const path = require("path");

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to DevSpace API 🚀",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/invitations", invitationRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/upload", uploadRoutes);
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/search", searchRoutes);

// Global Error Handler (Always Last)
app.use(errorHandler);

module.exports = app;