const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    status: {
        type: String,
        default: "Available"
    },

    favorite: {
    type: Boolean,
    default: false,
    },

    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},
}, {
    timestamps: true
});

module.exports = mongoose.model("Book", bookSchema);