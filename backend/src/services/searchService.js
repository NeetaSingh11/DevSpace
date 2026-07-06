const Workspace = require("../models/Workspace");
const Project = require("../models/Project");
const Task = require("../models/Task");

class SearchService {

    async globalSearch(query, userId) {

        const regex = new RegExp(query, "i");

        const workspaces = await Workspace.find({
            isArchived: false,
            "members.user": userId,
            $or: [
                { name: regex },
                { description: regex },
            ],
        }).select("name description");

        const projects = await Project.find({
            isArchived: false,
            $or: [
                { name: regex },
                { description: regex },
            ],
        }).select("name description");

        const tasks = await Task.find({
            isArchived: false,
            $or: [
                { title: regex },
                { description: regex },
            ],
        }).select("title description status priority");

        return {

            workspaces,

            projects,

            tasks,

        };

    }

}

module.exports = new SearchService();