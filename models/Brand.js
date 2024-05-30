// brandModel.js

const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Brand name is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  logo: {
    type: String, // URL to the brand logo
    required: [true, 'Brand logo is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
