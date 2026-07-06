const Invitation = require("../models/Invitation");
const BaseRepository = require("./BaseRepository");

class InvitationRepository extends BaseRepository{

    constructor(){
        super(Invitation);
    }

    async findPending(userId){

        return this.model
        .find({
            invitedUser:userId,
            status:"Pending"
        })
        .populate("workspace","name")
        .populate("invitedBy","name email");

    }

    async findPendingById(invitationId){

        return await this.model.findOne({
            _id: invitationId,
            status:"Pending"
        });

    }

    async updateStatus(invitationId,status){

        return await this.model.findByIdAndUpdate(
            invitationId,
            {
                status
            },
            {
                new:true
            }
        );

    }

}

module.exports=new InvitationRepository();