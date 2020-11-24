const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    token: String
});

module.exports = mongoose.model('Admin', adminSchema);
