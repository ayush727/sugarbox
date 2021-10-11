const mongoose = require('mongoose');

var users = new mongoose.Schema({
    'email': {
        type: String
    },
    'password': {
        type: String
    },
    'tasks': {
        type: []
    }
});

module.exports = {
    users: mongoose.model("users", users)
}

