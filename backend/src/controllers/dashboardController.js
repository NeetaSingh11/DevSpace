const asyncHandler = require("../utils/asyncHandler");
const dashboardService = require("../services/dashboardService");

class DashboardController {

    getDashboard = asyncHandler(async (req, res) => {

        const data = await dashboardService.getDashboard(
            req.user._id
        );

        res.status(200).json({

            success: true,

            data,

        });

    });

}

module.exports = new DashboardController();