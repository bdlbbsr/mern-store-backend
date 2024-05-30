const mongoose = require('mongoose');
const productSchema = require('../models/Product');

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    products: [
      {
        name: {
          type: String,
          required: [true, 'Product name is required'],
          trim: true
        },
        price: {
          type: Number,
          required: [true, 'Product price is required'],
          min: [0, 'Price cannot be less than 0']
        },
        description: {
          type: String,
          trim: true
        },
        category: {
          type: String,
          required: [true, 'Product category is required'],
          trim: true
        },
        brand: {
          type: String,
          required: true
        },
        thumbnail: {
          type: String,
          required: true
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ['Pending', 'Processed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending'
    },

    paymentDetails: {
      paymentMethod: {
        type: String
      },
      paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending'
      },
      transactionId: {
        type: String
      }
    },
    shippingAddress: {
      name: {
        type: String,
        required: true
      },
      mobile: {
        type: String,
        required: true
      },
      postalCode: {
        type: String,
        required: true
      },
      street: {
        type: String,
        required: true
      }
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
