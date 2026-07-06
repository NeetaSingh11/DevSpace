const commentRepository = require("../repositories/commentRepository");

class CommentService {

    async createComment(userId, taskId, content) {

        return await commentRepository.create({
            task: taskId,
            user: userId,
            content,
        });

    }

    async getComments(taskId) {

        return await commentRepository.findByTask(taskId);

    }

}

module.exports = new CommentService();