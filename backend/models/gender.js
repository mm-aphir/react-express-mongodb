const mongoose = require('mongoose');

const genderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    gendername: { 
        type: String, 
        required: true 
    },
    
});

module.exports = mongoose.model('Genders', genderSchema);