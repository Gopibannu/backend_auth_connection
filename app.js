const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const authRoutes = require("./routes/authRoutes.js")
const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    console.log('Connected')
})
    .catch(err => console.log("Error:",err.message))

app.use('/api',authRoutes)
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Server Running at ${PORT}`)
})