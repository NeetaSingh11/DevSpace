const activityService =
require("../services/activityService");

const asyncHandler =
require("../utils/asyncHandler");

class ActivityController {

    getActivities =
    asyncHandler(async (req, res) => {

        const activities =
        await activityService.getActivities(

            req.params.workspaceId

        );

        res.status(200).json({

            success: true,

            data: activities,

        });

    });

}

module.exports =
new ActivityController();