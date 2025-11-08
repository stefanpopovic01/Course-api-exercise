const mongoose = require("mongoose");
const manufacturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: String,
    yearEstablished: {
        type: Number,
        max: new Date().getFullYear()
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]

}, { timestamps: true } );

module.exports = mongoose.model("Manufacturer", manufacturerSchema);