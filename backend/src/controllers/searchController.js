const asyncHandler = require("../utils/asyncHandler");
const searchService = require("../services/searchService");

class SearchController {

    search = asyncHandler(async (req, res) => {

        const query = req.query.q || "";

        const result = await searchService.globalSearch(

            query,

            req.user._id

        );

        res.status(200).json({

            success: true,

            data: result,

        });

    });

}

module.exports = new SearchController();