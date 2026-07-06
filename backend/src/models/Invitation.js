const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
{
    workspace:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Workspace",
        required:true
    },

    invitedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    invitedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    role:{
        type:String,
        enum:[
            "Admin",
            "Member",
            "Viewer"
        ],
        default:"Member"
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Accepted",
            "Rejected"
        ],
        default:"Pending"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model(
    "Invitation",
    invitationSchema
);