import mongoose from "mongoose";


const userModel = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

const menuModel = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true }
});

const orderModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Array of menu items ( menu id and quantity)
    items: {
        menuId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            required: true
        },
        quantity: { type: Number, required: true }
    },

    // calculated total price
    totalAmount: { type: Number, required: true },


    // pending or completed
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },

    // auto generated time stamp
    createdAt: { type: Date, default: Date.now() }
});


const User = mongoose.model('User', userModel);
const Menu = mongoose.model('Menu', menuModel);
const Order = mongoose.model('Order', orderModel);


export { User, Menu, Order };
