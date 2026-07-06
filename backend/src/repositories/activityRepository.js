const Activity = require("../models/Activity");
const BaseRepository = require("./BaseRepository");

class ActivityRepository extends BaseRepository {

    constructor() {

        super(Activity);

    }

    async findByWorkspace(workspaceId) {

        return this.model

            .find({

                workspace: workspaceId,

            })

            .populate(
                "user",
                "name email"
            )

            .sort({
                createdAt: -1,
            });

    }

}

module.exports =
    new ActivityRepository();