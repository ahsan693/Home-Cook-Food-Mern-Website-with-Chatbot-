const connectDB = require('./db');
const mongoose = require('mongoose');

// Test MongoDB Connection
const testConnection = async () => {
    try {
        await connectDB();
        console.log('Successfully connected to MongoDB.');
        
        // Test creating a collection
        const testCollection = mongoose.connection.collection('test');
        await testCollection.insertOne({ test: 'data', timestamp: new Date() });
        console.log('Successfully inserted test document.');
        
        // Read the test document
        const testDoc = await testCollection.findOne({ test: 'data' });
        console.log('Successfully read test document:', testDoc);
        
        // Clean up
        await testCollection.deleteMany({ test: 'data' });
        console.log('Successfully cleaned up test data.');
        
        // Close connection
        await mongoose.connection.close();
        console.log('Connection closed successfully.');
        
    } catch (error) {
        console.error('Database test failed:', error);
    } finally {
        process.exit();
    }
};

testConnection();
