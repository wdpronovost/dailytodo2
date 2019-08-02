const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const mongoURL = require('./helpers/mongodb');

const app = express();

mongoose.connect(mongoURL(), {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: true }));

app.use ('/', require('./routes/api'));


app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(process.env.port ||3000, function() {
	console.log("Server is now running on port 3000 or production port.");
});
