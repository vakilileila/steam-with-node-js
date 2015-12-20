var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HeroShema = new Schema({
    name: String,
    imageUrl: String,
    category: {},
    rarity:String,
    price: Number,
    discount:{
        isOnDiscount:Boolean,
        priceDiscount: Number,
        rate:Number
        //endDate:
    }


});


module.exports = mongoose.model('Hero', HeroShema);