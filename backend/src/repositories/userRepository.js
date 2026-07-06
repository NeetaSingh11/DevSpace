const User = require("../models/User");
const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {

    constructor() {
        super(User);
    }

    async findByEmail(email) {
        return this.findOne({ email });
    }

    async findByEmailWithPassword(email) {
        return await this.model
            .findOne({ email })
            .select("+password");
    }

    async findByUsername(username) {
        return this.findOne({ username });
    }

}

module.exports = new UserRepository();