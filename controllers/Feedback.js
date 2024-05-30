const Feedback = require('../models/Feedback');
const Product = require('../models/Product');
const User = require('../models/User');

exports.createFeedback = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const feedback = new Feedback({
      productId,
      userId,
      rating,
      comment,
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getFeedbackForProduct = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ productId: req.params.productId }).populate('userId', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
