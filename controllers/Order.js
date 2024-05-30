// orderController.js

const Order = require('../models/Order');


// Create a new order for a specific user
exports.createOrder = async (req, res) => {
  try {
    const { userId, products, totalAmount, status, paymentDetails, shippingAddress } = req.body;

    const order = await Order.create({
      user: userId,
      products,
      totalAmount,
      status,
      paymentDetails,
      shippingAddress
    });

    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all orders for a specific user
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const orders = await Order.find({ user: userId });

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;

 

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a specific order by ID
exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
      runValidators: true
    });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a specific order by ID
// exports.deleteOrder = async (req, res) => {
//   try {
//     const orderId = req.params.orderId;

//     const order = await Order.findByIdAndDelete(orderId);

//     if (!order) {
//       return res.status(404).json({ success: false, message: 'Order not found' });
//     }

//     res.status(200).json({ success: true, message: 'Order deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

