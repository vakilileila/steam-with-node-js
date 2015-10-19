var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SlideshowShema = new Schema({
    name: String,
    imageUrl: String,
   description: String,
    price: Number
});


module.exports = mongoose.model('Slide', SlideshowShema);