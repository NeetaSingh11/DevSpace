const invitationRepository = require("../repositories/invitationRepository");
const workspaceRepository = require("../repositories/workspaceRepository");
const userRepository = require("../repositories/userRepository");
const AppError = require("../utils/AppError");
const activityService =
require("./activityService");

class InvitationService {

    async inviteMember(workspaceId, ownerId, username, role) {

        const workspace = await workspaceRepository.findById(workspaceId);
        console.log("Workspace:", workspace);

        if (!workspace) {
            throw new AppError("Workspace not found", 404);
        }

        // Check Owner/Admin
        const member = workspace.members.find(
            m => m.user._id.toString() === ownerId.toString()
        );
        console.log("Member:", member);

        if (!member) {
            throw new AppError("You are not a workspace member", 403);
        }

        if (!["Owner", "Admin"].includes(member.role)) {
            throw new AppError("Permission denied", 403);
        }

        const user = await userRepository.findByUsername(username);
        console.log("User:", user);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const alreadyMember = workspace.members.some(
            m => m.user._id.toString() === user._id.toString()
        );

        if (alreadyMember) {
            throw new AppError("User is already a member", 400);
        }

        const invitation = await invitationRepository.create({

            workspace: workspaceId,

            invitedBy: ownerId,

            invitedUser: user._id,

            role,

            status: "Pending",

        });

        await activityService.createActivity(

            workspaceId,

            ownerId,

            "Invited Member",

            username

        );

        return invitation;
    }

    async getPendingInvitations(userId) {

        return await invitationRepository.findPending(userId);

    }

    async acceptInvitation(invitationId,userId){

        const invitation =
        await invitationRepository.findPendingById(
            invitationId
        );

        if(!invitation){
            throw new AppError(
                "Invitation not found",
                404
            );
        }

        if(
            invitation.invitedUser.toString() !==
            userId.toString()
        ){
            throw new AppError(
                "Unauthorized",
                403
            );
        }

        await workspaceRepository.addMember(

            invitation.workspace,

            userId,

            invitation.role

        );

        await invitationRepository.updateStatus(
            invitationId,
            "Accepted"
        );

        await activityService.createActivity(

            invitation.workspace,

            userId,

            "Accepted Invitation",

            ""

        );

        return {

            message:

            "Invitation accepted successfully"

        };

    }

}

module.exports = new InvitationService();