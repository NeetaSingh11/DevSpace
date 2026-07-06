const projectRepository = require("../repositories/projectRepository");

const workspaceRepository = require("../repositories/workspaceRepository");

const AppError = require("../utils/AppError");
const activityService = require("./activityService");

class ProjectService {

    async createProject(userId, workspaceId, data) {

        const workspace =
            await workspaceRepository.findByIdAndOwner(
                workspaceId,
                userId
            );

        if (!workspace) {
            throw new AppError(
                "Workspace not found",
                404
            );
        }

        const project =
            await projectRepository.create({

                ...data,

                workspace: workspaceId,

                owner: userId,

            });

        await activityService.createActivity(

            workspaceId,

            ownerId,

            "Created Project",

            project.name

        );

        return project;
    }

    async getProjects(workspaceId) {

        return await projectRepository.findByWorkspace(
            workspaceId
        );

    }

    async updateProject(userId, projectId, data) {

        const project = await projectRepository.findById(projectId);

        if (!project)
            throw new AppError("Project not found",404);

        project.name = data.name ?? project.name;
        project.description = data.description ?? project.description;

        await project.save();

        return project;
    }

    async deleteProject(userId, projectId){

        const project = await projectRepository.findById(projectId);

        if(!project)
            throw new AppError("Project not found",404);

        project.isArchived = true;

        await project.save();
    }

}

module.exports = new ProjectService();