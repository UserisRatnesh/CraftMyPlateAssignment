import express from "express";
import authenticateJwt from "../middleware/auth.js"
import { MenuItem } from "../DB/schema.js";



const router = express.Router();

// Get all the menu items
router.get("/", authenticateJwt, async (req, res) => {
    try {
        const menuItems = await MenuItem.find({});
        res.json({ menuItems });
    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({ msg: "Error in fetching menu items" });
    }
});

// ADD a new menu item 
router.post("/", authenticateJwt, async (req, res) => {

    try {
        const item = new MenuItem(req.body);
        await item.save();
        res.json({ msg: "Item added successfully", item });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(401).json({ msg: "Error adding new item" });
    }

});

// Update a menu item
router.put("/:itemId", authenticateJwt, async (req, res) => {

    try {
        console.log(req.params.itemId);
        const item = await MenuItem.findByIdAndUpdate(req.params.itemId, req.body, { new: true });
        if (!item) {
            return res.status(404).json({ msg: "Menu item not found" });
        }
        res.json({ msg: "Menu item updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error updating the menu item" });
    }
});


// Delete a menu item
router.delete('/:itemId', authenticateJwt, async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.itemId);
        if (!item) {
            return res.status(404).json({ msg: "Item not found" });

        }
        res.json({ msg: "Item deleted successfully", item });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error deleting menu item" });
    }

});

export default router;
