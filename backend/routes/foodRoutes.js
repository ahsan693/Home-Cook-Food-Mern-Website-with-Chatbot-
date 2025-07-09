const express = require('express');
const router = express.Router();
const {
    getCartItems,
    getAllBills,
    addToCart,
    updateCartItem,
    removeFromCart,
    createBill
} = require('../datastored');

// Get cart items
router.get('/cart', async (req, res) => {
    try {
        const items = await getCartItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add item to cart
router.post('/cart', async (req, res) => {
    try {
        const item = await addToCart(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update cart item quantity
router.put('/cart/:id', async (req, res) => {
    try {
        const item = await updateCartItem(req.params.id, req.body.quantity);
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove item from cart
router.delete('/cart/:id', async (req, res) => {
    try {
        const result = await removeFromCart(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all bills
router.get('/bills', async (req, res) => {
    try {
        const bills = await getAllBills();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new bill from cart
router.post('/bills', async (req, res) => {
    try {
        const bill = await createBill(req.body.cartItems);
        res.status(201).json(bill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
