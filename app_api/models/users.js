var mongoose = require( 'mongoose' );

var userSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String
});

var userDb = mongoose.model('users', userSchema);