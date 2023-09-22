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

    