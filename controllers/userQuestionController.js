const Question = require("../models/questionsModel");
const User = require("../models/userModel");
const UserQuestion = require("../models/userQuestionModel")
const asyncHandler = require("express-async-handler");

const userInfo = asyncHandler(async (req, res) => {

    try {
        const userId = req.user._id;

        const userInfo = await UserQuestion.findOne({ user: userId });

        if (userInfo) {
            res.status(200).json({ userInfo });
        } else {

            const userInfo = await UserQuestion.create({
                user: userId,
                total: 0,
                correct: 0,
                wrong: 0,
            })
            res.status(200).json({ userInfo });
        }
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Problem fetching User Info" });
    }



});

const correctAnswer = asyncHandler(async (req, res) => {

    try {
        const { id } = req.body;
        const userId = req.user._id;
        await UserQuestion.findOneAndUpdate(
            { user: userId }, // Filter the document by its ID
            {
                $push: { answered: id }, // Use $push to append the questionId to the 'answered' array
                $inc: { total: 1, correct: 1 } // Use $inc to increment 'total' and 'correct' by 1
            },
            { new: true }
        );

    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }


});

const wrongAnswer = asyncHandler(async (req, res) => {
  
    try {
        const userId = req.user._id;
        await UserQuestion.findOneAndUpdate(
            { user: userId }, // Filter the document by its ID
            {
                $inc: { total: 1, wrong: 1 } // Use $inc to increment 'total' and 'correct' by 1
            },
            { new: true }
        );

    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }

});

const getUniqueCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Question.distinct("category");
        const categoriesWithCount = await Promise.all(categories.map(async (category) => {
            const count = await Question.countDocuments({ category });
            return { category, count };
        }));
        res.status(200).json({ categories: categoriesWithCount });
    } catch (error) {
        console.error("Error fetching unique categories:", error);
        res.status(500).json({ message: "Error fetching unique categories" });
    }
});

const addbookmarkedQuestions = asyncHandler(async (req, res) => {
    
    try {
        const { id } = req.body;
    const userId = req.user._id;
        await UserQuestion.updateOne(
            { user: userId, bookmarked: { $ne: id } }, // Filter by user ID and check if the questionId is not already present
            {
                $addToSet: { bookmarked: id } // Add the questionId to the 'bookmarked' array if it doesn't already exist
            }
        );
        res.status(201).json({ success: true });

    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Problem fetching User Info" });
    }
});

const getbookmarkedQuestion = asyncHandler(async (req, res) => {
    
    try {
        const userId = req.user._id;
        const userBookmark = await UserQuestion.findOne({ user: userId }).populate('bookmarked');
        if (userBookmark) {
            res.status(200).json({ userBookmark });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting bookmarked questions" });
    }

});

const deleteBookmarkedQuestion = asyncHandler(async (req, res) => {
    
    try {
        const { id } = req.params; // Assuming the ID is passed as a URL parameter
        const userId = req.user._id;

        const userBookmark = await UserQuestion.findOne({ user: userId });

        if (!userBookmark) {
            return res.status(404).json({ message: "User information not found" });
        }

        // Remove the bookmarked question ID from the array
        userBookmark.bookmarked = userBookmark.bookmarked.filter((bookmark) => bookmark.toString() !== id);

        // Save the updated user information
        await userBookmark.save();

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting Bookmarked question" });
    }
});


module.exports = { userInfo, correctAnswer, wrongAnswer, getUniqueCategories, addbookmarkedQuestions, getbookmarkedQuestion, deleteBookmarkedQuestion }