const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const questionsRoutes = require("./routes/questionsRoutes")
const userQuestionRoutes  = require("./routes/userQuestionRoutes")



dotenv.config()

PORT = process.env.PORT || 5000;
connectDB();

const app = express()

app.use(express.json())
app.use(cors({
    origin: 'https://memorysphere.vercel.app'
  }));


app.get("/", (req,res) => {
    res.send("hello")
})

app.use("/", userRoutes)
app.use("/", questionsRoutes)
app.use("/", userQuestionRoutes)

app.listen(PORT, (req,res)=> {
    console.log("server running at Port 5000");
})
