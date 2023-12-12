const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
 name: {
    type: String,
    required: true
 },
 price: {
    type: Number,
    required: true
 },
 quantity: {
    type: Number,
    required: true
 },
 totalAmount: {
    type: Number,
    required: true
 }
});

const orderSchema = new Schema({
 table: {
    type: Number,
    required: true
 },
 items: {
    type: [ItemSchema],
    required: true
 }
},{
   timestamps:true
});

module.exports = mongoose.model('order', orderSchema);