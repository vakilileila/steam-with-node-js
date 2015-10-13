var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HeroShema = new Schema({
    name: String,
    imageUrl: String,
    category: {},
    price: Number,
    items: []
});


module.exports = mongoose.model('Hero', HeroShema);