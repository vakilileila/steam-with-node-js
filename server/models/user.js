var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    dropbox: {},
    shoppingCart: []
});

module.exports = mongoose.model('user', userSchema);

