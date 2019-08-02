const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemsSchema = new Schema({
  todo: String
});

const Item = mongoose.model("Item", ItemsSchema);

// Initial Items

// const coffee = new Item ({
// 	todo: "Drink Coffee"
// });
// const breakfast = new Item ({
// 	todo: "Eat Breakfast"
// });
// const shower = new Item ({
// 	todo: "Take Shower"
// });

// const defaultItems = [coffee, breakfast, shower];

module.exports = Item;