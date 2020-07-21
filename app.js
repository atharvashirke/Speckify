const express = require("express");
const app = express()
require('dotenv').config()
const authRoutes = require('./routes/auth-routes.js')
const dashboardRoutes = require("./routes/dashboard-routes.js")
const passport = require("passport")
const passportSetup = require('./config/passport-setup.js')
const mongoose = require('mongoose');
const cookieSession = require("cookie-session")

// App configuration
app.set("view engine", "ejs")
app.set()
app.use(express.static("public"))
app.use(cookieSession({
    maxAge: 48 * 60 * 60 * 1000,
    keys: [process.env.SESSION_KEY]
}))

// Initializing Passport
app.use(passport.initialize())
app.use(passport.session())

// Configuring Database
mongoose.connect(process.env.DB_URI, () => {
    console.log("Connected to Database")
})

// Routes
app.use('/auth', authRoutes)

app.use("/dashboard", dashboardRoutes)

app.get("/", (req, res) => {
    res.render("home", {user: req.user})
})

app.listen(process.env.SERVER_PORT, process.env.SERVER_IP, () => {
    console.log("Server has started on port: " + process.env.SERVER_PORT + " ip: " + process.env.SERVER_IP)
})