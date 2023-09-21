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
    // Creates a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Deletes a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: "No thought found with that ID!" });
            }
            const user = await User.findByIdAndUpdate({ _id: { $in: thought.users } });
            res.json({ message: "User and thought deleted." });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Updates a thought

}