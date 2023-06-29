const express = require('express');
const cors = require('cors');
// const logger = require("morgan");

//router import
const playsRouter = require('./routes/plays')

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Welcome to 'A Play Today' api");
    res.json({
        title: "Snack Rankings",
        description: "Find and rate the best snacks ever!"
    })
})

//route connect to api
app.use("/plays", playsRouter);


module.exports = api;
