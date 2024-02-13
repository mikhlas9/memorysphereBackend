const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    category: {
        type: String,
     },
     question: {
        type: String,
        required: true,
     },
     options: [
        {
        type: String,
        required: true
        },
     ],
     answer: {
        type: String,
        required: true
     }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;