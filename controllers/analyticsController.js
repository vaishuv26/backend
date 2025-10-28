const Order = require('../models/Order');
const Table = require('../models/Table');
const Client = require('../models/Client');
const Chef = require('../models/Chef');

exports.getOrderSummary = async (req, res) => {
  try {
    const { filter } = req.query;
    const dateFilter = getDateFilter(filter);

    const served = await Order.countDocuments({ status: 'SERVED', createdAt: dateFilter });
    const dineIn = await Order.countDocuments({ type: 'DINE_IN', createdAt: dateFilter });
    const takeaway = await Order.countDocuments({ type: 'TAKEAWAY', createdAt: dateFilter });

    res.json({ served, dineIn, takeaway });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRevenue = async (req, res) => {
  try {
    const { filter } = req.query;
    const dateFilter = getDateFilter(filter);

    const orders = await Order.find({ createdAt: dateFilter });
    let revenue = 0;
    orders.forEach(o => { revenue += (o.amountPaid || 0); });

    res.json({ revenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGraphData = async (req, res) => {
  try {
    const { filter } = req.query;
    const dateFilter = getDateFilter(filter);

    // Aggregate orders by date
    const orders = await Order.aggregate([
      { $match: { createdAt: dateFilter } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$amountPaid" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const graphData = orders.map(item => ({
      date: item._id,
      revenue: item.revenue || 0
    }));

    res.json(graphData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to get date filter based on period
function getDateFilter(filter) {
  const now = new Date();
  let startDate;

  switch (filter) {
    case 'Daily':
      startDate = new Date(now.setHours(0, 0, 0, 0));
      break;
    case 'Weekly':
      startDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'Monthly':
      startDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
    default:
      startDate = new Date(0); // All time
  }

  return { $gte: startDate };
}


exports.getStats = async (req, res) => {
  const chefs = await Chef.countDocuments();
  const totalOrders = await Order.countDocuments();
  const clients = await Client.countDocuments();
  res.json({ chefs, totalOrders, clients });
};
