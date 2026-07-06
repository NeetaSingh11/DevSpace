const Workspace = require("../models/Workspace");
const BaseRepository = require("./BaseRepository");

class WorkspaceRepository extends BaseRepository {

    constructor() {
        super(Workspace);
    }

    async findByOwner(userId) {

        return await this.model.find({

            isArchived: false,

            $or: [

                { owner: userId },

                { "members.user": userId }

            ]

        });

    }

    async findByIdAndOwner(workspaceId, ownerId) {
        return await this.findOne({
            _id: workspaceId,
            owner: ownerId,
            isArchived: false,
        });
    }

    async findById(id){

        return await this.model
            .findById(id)
            .populate(
                "members.user",
                "name email username"
            )
            .populate(
                "owner",
                "name email"
            );

    }

    async findMember(workspaceId, userId) {

        return await this.model
            .findOne({
                _id: workspaceId,
                "members.user": userId,
                isArchived: false,
            })
            .populate(
                "members.user",
                "name email username"
            )
            .populate(
                "owner",
                "name email username"
            );

    }

    async addMember(workspaceId,userId,role){

        return await this.model.findByIdAndUpdate(

            workspaceId,

            {
                $push:{
                    members:{
                        user:userId,
                        role
                    }
                }
            },

            {
                new:true
            }

        );

    }

}

module.exports = new WorkspaceRepository();