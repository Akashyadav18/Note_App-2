const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please add the Title..."]
    },
    body:{
        type: String,
        required: [true, "Please add the body..."]
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Note", noteSchema);