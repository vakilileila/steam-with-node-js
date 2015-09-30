var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeroShema = new Schema({
    name: String,
    imageUrl: String
});


module.exports = mongoose.model('HeroCategory', HeroShema);
