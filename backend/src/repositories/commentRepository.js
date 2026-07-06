const Comment = require("../models/Comment");
const BaseRepository = require("./BaseRepository");

class CommentRepository extends BaseRepository {

    constructor() {
        super(Comment);
    }

    async findByTask(taskId) {

        return this.model
            .find({ task: taskId })
            .populate("user", "name email")
            .sort("createdAt");

    }

}

module.exports = new CommentRepository();