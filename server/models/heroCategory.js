var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var paginate = require('mongoose-paginate');

var HeroShema = new Schema({
    name: String,
    imageUrl: String
});

HeroShema.plugin(paginate);

module.exports = mongoose.model('HeroCategory', HeroShema);
