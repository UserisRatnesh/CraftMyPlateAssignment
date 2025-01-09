import express from "express";
import authenticateJwt from "../middleware/auth.js"
import { User, MenuItem, Order } from "../DB/schema.js";



const router = express.Router();

// Place an order with selected menu items and quantities
router.post("/addItem/:itemId", authenticateJwt, async (req, res) => {

    try {
        const username = req.user.username;
        const password = req.user.password;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const userId = user._id;

        const itemId = req.params.itemId;
        let quantity = 2;
        const item = await MenuItem.findById({ _id: itemId });
        console.log("THIS IS ITEM ", item);

        // Find that order which is pending
        // since new will be added to pending one
        // If there is no pending then create one
        const order = await Order.findOne({ userId });
        console.log(order);
        if (!order) {
            // create one
            let items = [{ itemId, quantity }];
            let totalAmount = item.price * quantity;
            const newOrder = new Order({
                userId,
                items,
                totalAmount,
                status: 'pending'
            });
            await newOrder.save();
            return res.json({ msg: "Order created successfully", newOrder });
        }


        let totalAmount = order.totalAmount;
        totalAmount += item.price * quantity;
        order.items.push({ itemId, quantity });
        order.totalAmount = totalAmount;
        await order.save();
        res.json({ msg: "Item added successfully", order });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error in creating order" });
    }

}); // This router is working


// Called when all the items are already added to the cart and
// after opening cart there is option to complete payment or say place order.
// Then this api is called
// So basically it just needs to update the order status from pending to completed
router.post("/submit", authenticateJwt, async (req, res) => {
    try {
        const username = req.user.username;
        const password = req.user.password;
        const user = await User.findOne({ username, password });
        if (!user) {
            res.status(404).json({ msg: "User not found" });
        }
        const userId = user._id;

        const order = await Order.findOne({ userId });
        if (!order) {
            res.json({ msg: "Order not found" });
        }
        order.status = 'completed';
        await order.save();

        res.status(200).json({ msg: "Order updated successfully", order });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error in creating order" });
    }
});

// Fetch all orders of logged in User
router.get("/", authenticateJwt, async (req, res) => {

    // This fetching router also works
    try {
        const username = req.user.username;
        const password = req.user.password;
        const user = await User.findOne({ username, password });
        if (!user) {
            res.status(404).json({ msg: "User not found" });
        }
        const userId = user._id;
        const order = await Order.find({ userId });
        if (!order) {
            res.json({ msg: "Unable to fetch user orders" });
        }
        res.status(200).json({ msg: "Fetching successfull", order });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Erroe in fetching all order" });
    }

});



export default router;
