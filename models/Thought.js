const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const ReactionSchema = require();

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            timestamps: true,
            get: (createdAt) =>
                moment(createdAt).format("MM DD, YY [at] hh:mm a"),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
