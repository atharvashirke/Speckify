const express = require("express");
const app = express()
require('dotenv').config()

// App configuration
app.set("view engine", "ejs")
app.set()
app.use(express.static("public"))

// Routes
app.get("/", (req, res) => {
    res.render("index")
})

app.listen(process.env.SERVER_PORT, process.env.SERVER_IP, () => {
    console.log("Server has started on port:" + process.env.SERVER_PORT + " ip: " + process.env.SERVER_IP)
})