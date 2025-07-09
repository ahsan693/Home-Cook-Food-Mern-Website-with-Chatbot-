const Bill = require('./models/Bill');
const Dish = require('./models/Dish');

// Get all cart items (dishes)
const getCartItems = async () => {
    try {
        const dishes = await Dish.find().sort('-addedAt');
        return dishes;
    } catch (error) {
        throw error;
    }
};

// Get all bills
const getAllBills = async () => {
    try {
        const bills = await Bill.find().sort('-orderDate');
        return bills;
    } catch (error) {
        throw error;
    }
};

// Add item to cart
const addToCart = async (dishData) => {
    try {
        const dish = new Dish(dishData);
        await dish.save();
        return dish;
    } catch (error) {
        throw error;
    }
};

// Update cart item quantity
const updateCartItem = async (id, quantity) => {
    try {
        const dish = await Dish.findById(id);
        if (!dish) {
            throw new Error('Dish not found');
        }
        dish.quantity = quantity;
        await dish.save();
        return dish;
    } catch (error) {
        throw error;
    }
};

// Remove item from cart
const removeFromCart = async (id) => {
    try {
        await Dish.findByIdAndDelete(id);
        return { success: true };
    } catch (error) {
        throw error;
    }
};

// Create a new bill
const createBill = async (orderData) => {
    try {
        const { items, totalAmount, deliveryTime } = orderData;
        
        // Convert deliveryTime string to Date object
        const deliveryDateTime = new Date(deliveryTime);
        const now = new Date();

        // Calculate the time difference in hours
        const timeDifferenceInHours = (deliveryDateTime - now) / (1000 * 60 * 60);

        if (timeDifferenceInHours < 5) {
            throw new Error('Delivery time must be at least 5 hours from now');
        }

        const bill = new Bill({
            items: items.map(item => ({
                dish: {
                    name: item.name,
                    price: item.price,
                    image: item.image
                },
                quantity: item.quantity
            })),
            totalAmount,
            deliveryTime: deliveryDateTime
        });

        await bill.save();
        
        // Clear the cart after successful order
        await Dish.deleteMany({});
        
        return bill;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCartItems,
    getAllBills,
    addToCart,
    updateCartItem,
    removeFromCart,
    createBill
};
