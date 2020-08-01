const express = require("express");
const app = express()
const methodOverride = require("method-override")
require('dotenv').config()
const authRoutes = require('./routes/auth-routes.js')
const dashboardRoutes = require("./routes/dashboard-routes.js")
const passport = require("passport")
const passportSetup = require('./config/passport-setup.js')
const mongoose = require('mongoose');
const cookieSession = require("cookie-session")


// App configuration
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(methodOverride("_method"))
app.use(cookieSession({
    maxAge: 48 * 60 * 60 * 1000,
    keys: [process.env.SESSION_KEY]
}))

// Initializing Passport
app.use(passport.initialize())
app.use(passport.session())

// Configuring Database
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}, () => {
    console.log("Connected to Database")
}).catch(error => handleError(error));

// Routes
app.use('/auth', authRoutes)

app.use("/dashboard", dashboardRoutes)

app.get("/", (req, res) => {
    if (req.user) {
        res.redirect("/dashboard/")
    }
    res.render("home", {user: req.user, javascript: null})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});