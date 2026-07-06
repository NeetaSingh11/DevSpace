const taskService = require("../services/taskService");
const asyncHandler = require("../utils/asyncHandler");

class TaskController {

    createTask = asyncHandler(async (req, res) => {

        const task = await taskService.createTask(
            req.user._id,
            req.params.workspaceId,
            req.params.projectId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });

    });

    getTasks = asyncHandler(async (req, res) => {

        const tasks = await taskService.getTasks(
            req.params.projectId,
            req.query
        );

        res.status(200).json({
            success: true,
            data: tasks,
        });

    });

    assignTask = asyncHandler(async (req, res) => {

        const task = await taskService.assignTask(
            req.user._id,
            req.params.taskId,
            req.body.assigneeId
        );

        res.status(200).json({
            success: true,
            message: "Task assigned successfully",
            data: task,
        });

    });

    updateTaskStatus = asyncHandler(async (req, res) => {

        const task = await taskService.updateTaskStatus(
            req.user._id,
            req.params.taskId,
            req.body.status
        );

        res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            data: task,
        });

    });

    dashboardStats = asyncHandler(async(req,res)=>{

        const stats = await taskService.getDashboardStats(
            req.user._id
        );

        res.status(200).json({
            success:true,
            data:stats
        });

    });

    updateTask = asyncHandler(async (req, res) => {

        const task = await taskService.updateTask(
            req.params.taskId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });

    });

    deleteTask = asyncHandler(async (req, res) => {

        await taskService.deleteTask(
            req.params.taskId
        );

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
        });

    });

}

module.exports = new TaskController();