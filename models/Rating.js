const mongoose = require("mongoose");
const ratingSchema = new mongoose.Schema({
    score: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    comment: {
        type: String,
        default: ""
    },
    user: String,
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }

}, { timestamps: true } )

module.exports = mongoose.model("Rating", ratingSchema);