var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
    first: {
        type: String,
        default: ''
    },
	address: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        default: ''
    },
    dob: {
        type: String,
        default: ''
    }
});