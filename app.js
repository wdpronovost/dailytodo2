const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require('mongoose');
const mongoURL = require(__dirname + '/mongoURL');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect(mongoURL, {useNewUrlParser: true});

const itemsSchema = {
	todo: String
}

const Item = mongoose.model("Item", itemsSchema);

const coffee = new Item ({
	todo: "Drink Coffee"
});
const breakfast = new Item ({
	todo: "Eat Breakfast"
});
const shower = new Item ({
	todo: "Take Shower"
});

const defaultItems = [coffee, breakfast, shower];

app.set("view engine", "ejs");

app.get("/dailytodo", function(req, res) {
	const day = date();

	Item.find({}, function(err, itemsToShow) {

		if (err) {
			console.log(err)
		} else {
			if (itemsToShow.length === 0){
				Item.insertMany(defaultItems, function(err) {
					if (err) {
						console.log(err)
					} else {
						console.log("Default Items saved to DB")
					}
				});
				res.redirect('/dailytodo');
			} else {
				res.render("list", { kindOfDay: day, myListItems: itemsToShow });
			}
		}
	})	
});

app.post("/addtodo", function(req, res) {
	let item = new Item ({
		todo: req.body.newItem
	});

	if (item.todo !== "") {
		console.log(item);
		item.save((err) => console.log(err));
		res.redirect("/dailytodo");
	}

});

app.post('/removeItem', function(req,res) {
	let idToRemove = req.body._id;
	console.log(req.body._id);
	
	Item.deleteOne({_id: idToRemove}, function(error) {
		if (error) {
			console.log(error);
		} 
	});
	res.redirect('/dailytodo');
});

app.listen(80, function() {
	console.log("Server is now running on port 80");
});
