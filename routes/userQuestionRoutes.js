const express = require("express")
const {userInfo,correctAnswer,wrongAnswer,getUniqueCategories, addbookmarkedQuestions, getbookmarkedQuestion, deleteBookmarkedQuestion} = require("../controllers//userQuestionController")
const { protect } = require("../middleware/authMiddleware");


const router = express.Router()

router.route("/info").get(protect, userInfo)
router.route("/correct").post(protect, correctAnswer)
router.route("/wrong").post(protect, wrongAnswer)
router.route("/category").get(getUniqueCategories)
router.route("/bookmarkedQuestions").post(protect, addbookmarkedQuestions).get(protect, getbookmarkedQuestion)
router.route("/bookmarkedQuestions/:id").delete(protect, deleteBookmarkedQuestion)
module.exports = router