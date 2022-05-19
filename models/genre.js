var mongoose = require('mongoose');
//var Schema = mongoose.Schema; //or below is alternate way to extract Schema
const {Schema} = mongoose;
var GenreSchema  = new Schema({
    name:{type:String, required:[true, 'Why no name?'], minLength:[3, `Minimum length for name is 3 and provided is {VALUE}`], maxLength:100}
});

module.exports = mongoose.model('Genre', GenreSchema);