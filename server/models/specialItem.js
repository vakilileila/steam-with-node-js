var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var specialItem = Schema({
    name: String,
    imageUrl: String,
    category: String,
    price: Number,
    title: String,
    discount:{
        isOnDiscount:Boolean,
        price: Number,
        rate:Number
        //endDate:
    }
})

module.exports = mongoose.model('Special', specialItem);