var mongoose = require(mongoose);
var Schema = mongoose.Schema;
var specialItem = Schema({
    name: String,
    imageUrl: String,
    category: {},
    price: Number,
    discount:Number
})

module.exports = mongoose.model('Special', specialItem);