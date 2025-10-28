const express = require('express');
const cors = require('cors');

// Import your existing route files
const tableRoutes = require('./routes/tableRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const chefRoutes = require('./routes/chefRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const clientRoutes = require('./routes/clientRoutes');

// New userRoutes
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route to avoid "Cannot GET /" error
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// API routes
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/clients', clientRoutes);

// New /api/users route
app.use('/api/users', userRoutes);

module.exports = app;
