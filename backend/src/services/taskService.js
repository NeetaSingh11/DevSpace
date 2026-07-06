const taskRepository = require("../repositories/taskRepository");
const projectRepository = require("../repositories/projectRepository");
const AppError = require("../utils/AppError");
const activityService = require("./activityService");

class TaskService {

    async createTask(userId, workspaceId, projectId, taskData) {

        const project = await projectRepository.findById(projectId);

        if (!project || project.workspace.toString() !== workspaceId) {
            throw new AppError("Project not found", 404);
        }

        const task = await taskRepository.create({

            title: taskData.title,

            description: taskData.description,

            priority: taskData.priority,

            status: taskData.status,
            
            dueDate: taskData.dueDate,

            workspace: workspaceId,

            project: projectId,

            createdBy: userId,

            attachments: taskData.attachments || [],

        });

        // await activityService.logActivity({
        //     workspace: workspaceId,
        //     project: projectId,
        //     task: task._id,
        //     user: userId,
        //     action: "CREATE_TASK",
        //     message: `Created task "${task.title}"`,
        // });

        await activityService.createActivity(

            workspaceId,

            userId,

            "Created Task",

            task.title

        );

        return task;
    }

    async getTasks(projectId, filters) {

        return await taskRepository.findByProject(
            projectId,
            filters
        );

    }

    async assignTask(userId, taskId, assigneeId) {

        const task = await taskRepository.findById(taskId);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        task.assignedTo = assigneeId;

        await task.save();

        await activityService.logActivity({
            workspace: task.workspace,
            project: task.project,
            task: task._id,
            user: userId,
            action: "TASK_ASSIGNED",
            message: "Assigned task",
        });

        return task;
    }

    async updateTaskStatus(userId, taskId, status) {

        const task = await taskRepository.findById(taskId);

        if (!task) {
            throw new AppError("Task not found",404);
        }

        task.status = status;

        await task.save();

        await activityService.logActivity({
            workspace: task.workspace,
            project: task.project,
            task: task._id,
            user: userId,
            action: "STATUS_UPDATED",
            message: `Changed task status to ${task.status}`,
        });

        return task;
    }

    async getDashboardStats(userId) {

        const result = await taskRepository.getDashboardStats(userId);

        const stats = {
            total: 0,
            todo: 0,
            inProgress: 0,
            review: 0,
            done: 0,
        };

        result.forEach((item) => {

            stats.total += item.count;

            if (item._id === "Todo")
                stats.todo = item.count;

            if (item._id === "In Progress")
                stats.inProgress = item.count;

            if (item._id === "Review")
                stats.review = item.count;

            if (item._id === "Done")
                stats.done = item.count;

        });

        return stats;
    }

    async updateTask(taskId, data) {

        const task = await taskRepository.findById(taskId);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        task.title = data.title ?? task.title;
        task.description = data.description ?? task.description;
        task.priority = data.priority ?? task.priority;
        task.dueDate = data.dueDate ?? task.dueDate;

        if (data.attachments) {

            task.attachments = data.attachments;

        }

        await task.save();

        return task;
    }

    async deleteTask(taskId) {

        const task = await taskRepository.findById(taskId);

        if (!task) {
            throw new AppError("Task not found", 404);
        }

        task.isArchived = true;

        await task.save();
    }

}

module.exports = new TaskService();