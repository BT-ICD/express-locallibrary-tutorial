var mongoose = require('mongoose');
const {Schema} = mongoose;

var EmployeeSchema = new Schema({
    fullName:{type:String,required:[true,'Full name is required'], minLength:[3,'Minimum length for full name is 3' ], maxLength:[100,'Maximum length for full name is 100']},
    email:{type:String},
    mobileNumber:{type:String},
    dateOfJoining:{type:Date}
});
module.exports = mongoose.model('employee',EmployeeSchema);

