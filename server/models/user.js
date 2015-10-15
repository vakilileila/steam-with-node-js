var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    dropbox: {}
});

module.exports = mongoose.model('user', userSchema);

