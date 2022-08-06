require('dotenv').config()
const express = require("express")
const app = express()
const cors = require("cors")
const errorHandler = require("./handlers/error")
const authRoutes = require("./routes/auth")
const messagesRoutes = require("./routes/messages")


const PORT = 8081

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoutes)
app.use("/api/users/:id/messages", messagesRoutes)

app.use((req, res, next)=>{
    let err = new Error("Not found");
    err.status = 404
    next(err)
})

app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`Server starting on port ${PORT}`)
})