const asyncHandler = require("../utils/asyncHandler");

class UploadController {

    uploadFile = asyncHandler(async (req, res) => {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });

        }

        res.status(200).json({

            success: true,

            data: {

                fileName: req.file.originalname,

                fileUrl: `/uploads/${req.file.filename}`

            }

        });

    });

}

module.exports = new UploadController();