const workspaceService = require("../services/workspaceService");
const asyncHandler = require("../utils/asyncHandler");

class WorkspaceController {

    createWorkspace = asyncHandler(async (req, res) => {

        const workspace = await workspaceService.createWorkspace(
            req.user._id,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Workspace created successfully",
            data: workspace,
        });

    });

    getMyWorkspaces = asyncHandler(async (req, res) => {

        const workspaces = await workspaceService.getMyWorkspaces(
            req.user._id
        );

        res.status(200).json({
            success: true,
            data: workspaces,
        });

    });

    getWorkspaceById = asyncHandler(async (req, res) => {

        const workspace =
            await workspaceService.getWorkspaceById(
                req.user._id,
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: workspace,
        });

    });

    updateWorkspace = asyncHandler(async (req, res) => {

        const workspace =
            await workspaceService.updateWorkspace(
                req.user._id,
                req.params.id,
                req.body
            );

        res.status(200).json({
            success: true,
            message: "Workspace updated successfully",
            data: workspace,
        });

    });

    deleteWorkspace = asyncHandler(async(req,res)=>{

        await workspaceService.deleteWorkspace(
            req.user._id,
            req.params.id
        );

        res.status(200).json({
            success:true,
            message:"Workspace archived successfully"
        });

    });
    
}

module.exports = new WorkspaceController();