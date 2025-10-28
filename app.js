const express = require('express');
const cors = require('cors');

const tableRoutes = require('./routes/tableRoutes');
const orderRoutes = require('./routes/orderRoutes');
const menuRoutes = require('./routes/menuRoutes');
const chefRoutes = require('./routes/chefRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

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

module.exports = app;
