var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Hero = mongoose.model('Hero', {
    name: String,
    imageUrl: String,
    itemName: String
});


module.exports = mongoose.model('category', categorySchema);