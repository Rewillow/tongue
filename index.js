require('dotenv').config()
const express = require("express")
const cors = require("cors")
const app = express()
const userRoute = require("./routes/user.route")
const postRoute = require("./routes/post.route")
const interactionRoute = require("./routes/interactions.route")


app.use(cors())
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get('/', (req,res) => {
    res.send("Welcome to Tongue")
})
app.use('/api', userRoute)
app.use('/api', postRoute)
app.use('/api', interactionRoute)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`Server attivo alla porta ${PORT}`);
})