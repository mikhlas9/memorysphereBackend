const mongoose = require("mongoose")

const userQuestionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    total: {
        type: Number,
     },
    correct: {
        type: Number,
     },
     wrong: {
        type: Number,
     },
     answered:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Question"
      },
     ],
     bookmarked:[
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Question"
      },
     ]

    
});

const UserQuestion = mongoose.model("UserQuestion", userQuestionSchema);

module.exports = UserQuestion;


