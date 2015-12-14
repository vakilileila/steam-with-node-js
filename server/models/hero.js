var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HeroShema = new Schema({
    name: String,
    imageUrl: String,
    category: {},
    price: String,
    discount:{
        isOnDiscount:Boolean,
        priceDiscount: String,
        rate:String
        //endDate:
    },


});


module.exports = mongoose.model('Hero', HeroShema);