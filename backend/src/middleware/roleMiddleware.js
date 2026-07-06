const workspaceRepository = require("../repositories/workspaceRepository");

const authorize = (...roles) => {

    return async (req, res, next) => {

        const workspace =
            await workspaceRepository.findMember(
                req.params.workspaceId,
                req.user._id
            );

        if (!workspace) {

            return res.status(403).json({

                success: false,

                message: "Access denied",

            });

        }

        const member = workspace.members.find(
            m => m.user._id.toString() === req.user._id.toString()
        );

        if (!member) {

            return res.status(403).json({

                success: false,

                message: "You are not a workspace member",

            });

        }

        if (!roles.includes(member.role)) {

            return res.status(403).json({

                success: false,

                message: "Permission denied",

            });

        }

        next();

    };

};

module.exports = authorize;