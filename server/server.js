require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
connectDB()
const app = express()
const PORT = process.env.PORT || 2004
const cors = require("cors")

app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/user", require("./routes/user"))
app.use("/api/post", require("./routes/post"))
app.use("/api/todo", require("./routes/todo"))

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
mongoose.connection.on('error', err => {
    console.log(err)
})