const invitationService=require("../services/invitationService");
const asyncHandler=require("../utils/asyncHandler");

class InvitationController{

    getPendingInvitations=asyncHandler(async(req,res)=>{

        const invitations=
        await invitationService.getPendingInvitations(
            req.user._id
        );

        res.status(200).json({
            success:true,
            data:invitations
        });

    });

    inviteMember = asyncHandler(async (req, res) => {

        console.log("========== INVITE REQUEST ==========");
        console.log("workspaceId:", req.params.workspaceId);
        console.log("owner:", req.user._id);
        console.log("body:", req.body);

        const invitation = await invitationService.inviteMember(

            req.params.workspaceId,

            req.user._id,

            req.body.username,

            req.body.role

        );

        res.status(201).json({

            success: true,

            message: "Invitation sent successfully",

            data: invitation

        });

    });

    acceptInvitation = asyncHandler(async(req,res)=>{

        const result =
        await invitationService.acceptInvitation(

            req.params.invitationId,

            req.user._id

        );

        res.status(200).json({

            success:true,

            ...result

        });

    });

}

module.exports=new InvitationController();