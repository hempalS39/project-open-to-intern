const mongoose = require('mongoose');

// { name: {mandatory}, email: {mandatory, valid email, unique}, mobile: {mandatory, valid mobile number, unique}, 
// collegeId: {ObjectId, ref to college model, isDeleted: {boolean, default: false}}
const internSchema = new mongoose.Schema({
     name: {
        type : String,
        require : true,
        trim : true
     },
      email: {
        type : String,
        require : true,
        unique : true,
        trim : true
    },
     mobile: {
        type : String,
        require : true,
        unique : true
    }, 
    collegeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'College'
    },
    isDeleted : {
        type : Boolean,
        default : false
    }

},{timestamps : true});

module.exports = mongoose.model('Intern' , internSchema);