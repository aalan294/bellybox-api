const mongoose  = require('mongoose')

const menuSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    name: {
        type : String,
        required : true,
        unique : true
    },
    price: {
        type : Number,
        required : true
    },
    type:{
        type : String,
        require : true
    }
})

module.exports = mongoose.model('menu',menuSchema)