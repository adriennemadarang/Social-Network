const { Thought, User } = require('../models');

module.exports = {
    // Gets all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Gets one thought
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findById({ _id:req.params.courseId })
            .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID!" });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}