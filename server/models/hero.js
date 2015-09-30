var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Item = require('heroItem');

var HeroShema = new Schema({
    name: String,
    imageUrl: String,
    category: {},
    price: Number,
    items: [Item]
});


module.exports = mongoose.model('Hero', HeroShema);