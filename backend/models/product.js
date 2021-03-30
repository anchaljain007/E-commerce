const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name :{
        type: String,
        required : true,
        max: 100
    },
    price :{
        type: String,
        required : true,
        min:1,
        max: 60
    },
    image: 
    { 
        data: Buffer, 
        contentType: String 
    },

    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product',productSchema);