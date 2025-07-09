const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    items: [{
        dish: {
            name: String,
            price: Number,
            image: String
        },
        quantity: Number
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    }
});

module.exports = mongoose.model('Bill', billSchema);
