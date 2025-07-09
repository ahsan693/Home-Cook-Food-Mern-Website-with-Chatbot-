const axios = require('axios');

const testDishesEndpoint = async () => {
    try {
        // First, let's add a test dish
        const testDish = {
            name: "Test Pizza",
            price: 12.99,
            quantity: 1
        };

        console.log('Adding a test dish...');
        const postResponse = await axios.post('http://localhost:5000/api/dishes', testDish);
        console.log('Successfully added dish:', postResponse.data);

        console.log('\nFetching all dishes...');
        const getResponse = await axios.get('http://localhost:5000/api/dishes');
        console.log('All dishes:', getResponse.data);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

testDishesEndpoint();
