const { User, Thought } = require("../models");

module.exports = {
    // Gets all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Gets single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findById({ _id: req.params.userId })
            .select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID!' })
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Creates a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

//    Updates user
aysnc updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            { _id: req.aparms.userId },
            { $set: req.body },
            { runValidators: true, new: true} 
        );
        if (!user) {
            return res.status(404).json({ message: "No user found with that ID!" });
        }
        res,json(user);
    } catch (err) {
        res.status(500).json(err);
    }
},

// Deletes a user
async deleteUser(req, res) {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user){
            return res.status(404).json({ message: "No user found with that ID!" })
        }
        // deletes users thoughts when user is deleted
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: "User and thoughts have been deleted." })
    } catch (err) {
        res.status(500).json(err);
    }
}, 

// Adds a friend
async addFriend(req, res){
    
}