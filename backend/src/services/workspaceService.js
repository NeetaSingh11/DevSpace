const workspaceRepository = require("../repositories/workspaceRepository");
const AppError = require("../utils/AppError");
const activityService =
require("./activityService");

class WorkspaceService {

    async createWorkspace(userId, workspaceData) {

        const workspace = await workspaceRepository.create({
            ...workspaceData,
            owner: userId,
            members: [
                {
                    user: userId,
                    role: "Owner",
                },
            ],
        });

        await activityService.createActivity(

            workspace._id,

            userId,

            "Created Workspace",

            workspace.name

        );

        return workspace;
    }

    async getMyWorkspaces(userId) {

        return await workspaceRepository.findByOwner(userId);

    }

    async getWorkspaceById(userId, workspaceId) {

        const workspace = await workspaceRepository.findMember(
            workspaceId,
            userId
        );

        if (!workspace) {
            throw new AppError("Workspace not found", 404);
        }

        return workspace;

    }

    async updateWorkspace(userId, workspaceId, workspaceData) {

        const workspace = await workspaceRepository.findByIdAndOwner(
            workspaceId,
            userId
        );

        if (!workspace) {
            throw new AppError("Workspace not found", 404);
        }

        workspace.name =
            workspaceData.name ?? workspace.name;

        workspace.description =
            workspaceData.description ?? workspace.description;

        await workspace.save();

        return workspace;
    }

    async deleteWorkspace(userId, workspaceId) {

        const workspace =
            await workspaceRepository.findByIdAndOwner(
                workspaceId,
                userId
            );

        if (!workspace) {
            throw new AppError("Workspace not found",404);
        }

        workspace.isArchived = true;

        await workspace.save();

        return;
    }

}

module.exports = new WorkspaceService();