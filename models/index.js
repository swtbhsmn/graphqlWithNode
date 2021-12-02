var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    firstName: {

        type: String,
        default: ''

    },
    lastName: {

        type: String,
        default: ''

    },
    email: {

        type: String,
        default: '',
        unique:true

    },
    password: {

        type: String,
        default: ''

    }
}, { timestamps: true });


module.exports = mongoose.model('User', User);