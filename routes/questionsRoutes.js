const express = require("express")
const {accessQuestions, addQuestions} = require("../controllers/questionsController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.route("/questions").post(protect, accessQuestions)
router.route("/addQuestions").post(addQuestions)

module.exports = router