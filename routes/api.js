const express = require('express');
const router = express.Router();
const date = require("../helpers/date");
const Item = require("../models/item");


router.get('/dailytodo', function(req, res) {
  const day = date();

  const coffee = new Item ({
    todo: "Drink Coffee"
  });

  const breakfast = new Item ({
    todo: "Eat Breakfast"
  });

  const shower = new Item ({
    todo: "Take Shower"
  });

  Item.find({}, function(err, itemsToShow) {
    if (itemsToShow.length === 0) {
      Item.insertMany([coffee, breakfast, shower]);res.redirect('/dailytodo');
    }
      res.render("../views/list", {kindOfDay: day, myListItems: itemsToShow});
  })
});


router.post('/dailytodo/addItem', function(req, res) {
	let item = new Item ({
		todo: req.body.newItem
  });

	if (item.todo !== "") {
		console.log('The item we are adding is: ' + item);
		item.save((err) => console.log("The error is: " + err));
		res.redirect("/dailytodo");
	}
});

router.put('/dailytodo/updateItem', function(req, res) {
  // res.send({
  //   type: 'PUT',
  //   name: req.body.name,
  //   pet: req.body.pet
  // });
  res.redirect("/dailytodo");
});

router.post('/dailytodo/removeItem', function(req, res) {
  console.log(req.body._id);

  Item.deleteOne({_id: req.body._id}, function(error) {
		if (error) {
			console.log(error);
		} 
	});
	res.redirect('/dailytodo');
});

module.exports = router;