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
            const thoughts = await Thought.findById({ _id: req.params.courseId })
                .select('-__v');

            if (!thoughts) {
                return res.status(404).json({ message: "No thought found with that ID!" });
            }
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Creates a thought
    async createThought(req, res) {
        try {
            const thoughts = await Thought.create(req.body);
            res.json(thoughts);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thoughts._id } },
                { runValidators: true, new: true }
            );
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Deletes a thought
    async deleteThought(req, res) {
        try {
            const thoughts = await Thought.findByIdAndDelete({ _id: req.params.thoughtsId });
            if (!thoughts) {
                return res.status(404).json({ message: "No thought found with that ID!" });
            }
            const user = await User.findByIdAndUpdate({ _id: { $in: thoughts.users } });
            res.json({ message: "User and thought deleted." });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Updates a thought
    async updateThought(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.courseId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with this ID! ' });
            }
            res.json(course);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Adds a reaction
    async addReaction(req, res) {
        try {
        const thoughts = await Thought.findByIdAndUpdate(req.params.thoughtsId,
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true },
        )
        if (!thoughts) {
            return res.status(404).json({ message: 'No user with this ID!' });
        }
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
},

    // Deletes a reaction
    async deleteReaction(req, res) {
    try {
        const thoughts = await Thought.findOneAndDelete(
            { _id: req.params.thoughtsId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        );

        if (!thoughts) {
            return res.status(404).json({ message: 'No thought found with that ID!' });
        }
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
        }
    }
};