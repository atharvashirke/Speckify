const express = require("express");
const app = express()
require('dotenv').config()
const authRoutes = require('./routes/auth-routes.js')
const passportSetup = require('./config/passport-setup.js')
const mongoose = require('mongoose');


// App configuration
app.set("view engine", "ejs")
app.set()
app.use(express.static("public"))

// Configuring Database
mongoose.connect(process.env.DB_URI, () => {
    console.log("Connected to Database")
})

// Routes
app.use('/auth', authRoutes)

app.get("/", (req, res) => {
    res.render("home")
})

app.listen(process.env.SERVER_PORT, process.env.SERVER_IP, () => {
    console.log("Server has started on port: " + process.env.SERVER_PORT + " ip: " + process.env.SERVER_IP)
})