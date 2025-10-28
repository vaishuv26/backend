const app = require('./app');  // Import your Express app (from app.js or similar)
const mongoose = require('mongoose');  // Import mongoose for MongoDB connection
require('dotenv').config();  // Import dotenv to load environment variables from .env file

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Once MongoDB is connected, start the server
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);  // Log server startup
    });
  })
  .catch(err => {
    // Log any MongoDB connection errors
    console.error('MongoDB connection error:', err);  // Log connection errors
  });
