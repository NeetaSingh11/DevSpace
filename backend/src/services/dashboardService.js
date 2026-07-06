const Workspace = require("../models/Workspace");
const Project = require("../models/Project");
const Task = require("../models/Task");
const Activity = require("../models/Activity");
const User = require("../models/User");

class DashboardService {

    async getDashboard(userId) {

        const workspaces = await Workspace.countDocuments({
            "members.user": userId,
            isArchived: false,
        });

        const projects = await Project.countDocuments({
            isArchived: false,
        });

        const tasks = await Task.countDocuments({
            isArchived: false,
        });

        const status = await Task.aggregate([
            {
                $match: {
                    isArchived: false,
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        const priority = await Task.aggregate([
            {
                $match: {
                    isArchived: false,
                },
            },
            {
                $group: {
                    _id: "$priority",
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        const activities = await Activity
            .find()
            .populate("user", "name")
            .sort({ createdAt: -1 })
            .limit(5);

        return {

            workspaces,

            projects,

            tasks,

            status,

            priority,

            activities,

        };

    }

}

module.exports = new DashboardService();