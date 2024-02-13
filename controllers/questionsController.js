const Question = require("../models/questionsModel")
const UserQuestion = require("../models/userQuestionModel")
const asyncHandler = require("express-async-handler");

const accessQuestions = asyncHandler(async (req, res) => {
    const { category } = req.body;
    try {

        let allQuestions = await Question.find({ category });

        const userId = req.user._id;
        const userquestions = await UserQuestion.findOne({ user: userId });

        // If user's information is found, filter out the answered questions
        if (userquestions) {
            const answeredQuestions = userquestions.answered;
            allQuestions = allQuestions.filter(question => !answeredQuestions.includes(question._id));
        }

        res.status(200).json({ allQuestions });
    } catch (error) {
        console.error("Error fetching quesiotn:", error);
        res.status(500).json({ message: "Error fetching quesions" });
    }

});

const addQuestions = asyncHandler(async (req, res) => {
    const { category, question, options, answer } = req.body;

    try {
        const addquestion = await Question.create({
            category,
            question,
            options,
            answer
        });

        // Send a success response with the newly added question data
        res.status(201).json({ success: true, data: addquestion });
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).json({ message: "Failed to add question" });
    }
});


module.exports = { accessQuestions, addQuestions }