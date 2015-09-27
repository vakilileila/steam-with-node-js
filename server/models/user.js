var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
});

module.exports = mongoose.model('user', userSchema);

