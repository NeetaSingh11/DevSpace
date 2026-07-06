const Project = require("../models/Project");
const BaseRepository = require("./BaseRepository");

class ProjectRepository extends BaseRepository {

    constructor() {
        super(Project);
    }

    async findByWorkspace(workspaceId) {
        return this.find({
            workspace: workspaceId,
            isArchived: false,
        });
    }

    async findById(id){
        return this.model.findById(id);
    }
    
}

module.exports = new ProjectRepository();