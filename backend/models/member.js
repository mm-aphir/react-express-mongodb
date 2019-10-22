const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: { 
        type: String, 
        required: true 
    },
    lastname: { 
        type: String, 
        required: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    sex: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Genders', 
        required: true 
    },
});

module.exports = mongoose.model('Members', memberSchema);