var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeroItemShema = new Schema({
    name: String,
    imageUrl: String,
    price: Number
});



