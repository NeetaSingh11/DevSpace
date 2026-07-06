const activityRepository =
require("../repositories/activityRepository");

class ActivityService {

    async createActivity(

        workspace,

        user,

        action,

        target

    ) {

        return await activityRepository.create({

            workspace,

            user,

            action,

            target,

        });

    }

    async getActivities(workspaceId) {

        return await activityRepository.findByWorkspace(
            workspaceId
        );

    }

}

module.exports =
new ActivityService();