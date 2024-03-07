const express = require("express")
const cors = require("cors")
const app = express()
const connectDb = require("./database/index")
const userRoute = require("./routes/user.route")
const postRoute = require("./routes/post.route")
const interactionRoute = require("./routes/interactions.route")


app.use(cors())
app.use(express.json())
app.use('/', (req,res) => {
    res.send("Welcome to Tongue")
})
app.use('/api', userRoute)
app.use('/api', postRoute)
app.use('/api', interactionRoute)


const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server attivo alla porta ${PORT}`);
})


// connectDb.authenticate()
// .then(() => {
//     console.log("Connessione riuscita");
// }).catch((err) => {
//     console.error(err);
// }) 