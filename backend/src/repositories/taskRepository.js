const Task = require("../models/Task");
const BaseRepository = require("./BaseRepository");

class TaskRepository extends BaseRepository {

    constructor() {
        super(Task);
    }

    async findByProject(projectId, filters = {}) {

        const {
            page = 1,
            limit = 10,
            search,
            status,
            priority,
            sort = "-createdAt",
        } = filters;

        const query = {
            project: projectId,
            isArchived: false,
        };

        if (status) {
            query.status = status;
        }

        if (priority) {
            query.priority = priority;
        }

        if (search) {
            query.title = {
                $regex: search,
                $options: "i",
            };
        }

        const tasks = await this.model
            .find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");

        const total = await this.model.countDocuments(query);

        return {
            tasks,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
        };
    }

    async findById(taskId) {
        return await this.model.findById(taskId);
    }

    async getDashboardStats(userId) {

        const stats = await this.model.aggregate([

            {
                $match: {
                    createdBy: userId,
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

        return stats;

    }

}

module.exports = new TaskRepository();