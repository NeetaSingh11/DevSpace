const projectService = require("../services/projectService");
const asyncHandler = require("../utils/asyncHandler");

class ProjectController {

    createProject = asyncHandler(async (req, res) => {

        const project = await projectService.createProject(
            req.user._id,
            req.params.workspaceId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });

    });

    getProjects = asyncHandler(async (req, res) => {

        const projects = await projectService.getProjects(
            req.params.workspaceId
        );

        res.status(200).json({
            success: true,
            data: projects,
        });

    });

    updateProject = asyncHandler(async (req, res) => {

        const project = await projectService.updateProject(
            req.user._id,
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            data: project,
        });

    });

    deleteProject = asyncHandler(async (req, res) => {

        await projectService.deleteProject(
            req.user._id,
            req.params.id
        );

        res.json({
            success: true,
        });

    });

}

module.exports = new ProjectController();