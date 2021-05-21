const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
    {
    name: {
        type: String,
        required: [true, "{PATH} is required."],
        minlength: [3, "{PATH} must be at least {MINLENGTH} characters."],
    },
    type: {
        type: String,
        required: [true, "{PATH} is required."],
        minlength: [3, "{PATH} must be at least {MINLENGTH} characters."],
    },
    description: {
        type: String,
        required: [true, "{PATH} is required."],
        minlength: [3, "{PATH} must be at least {MINLENGTH} characters."],
    },
    skill_1: {
        type: String,
        required: [false]
    },
    skill_2: {
        type: String,
        required: [false]
    },
    skill_3: {
        type: String,
        required: [false]
    },
    },
    { timestamps: true }
);

module.exports.Pet = mongoose.model('Pet', PetSchema);