// brandController.js

const Brand = require('../models/Brand');

// Create a new brand
exports.createBrand = async (req, res) => {
  try {
    const { name, description, logo } = req.body;

    const brand = new Brand({ name, description, logo });
    await brand.save();

    res.status(201).json({ success: true, data: brand });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json({ success: true, data: brands });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a brand by ID
exports.getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);

    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a brand by ID
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, logo } = req.body;

    const brand = await Brand.findByIdAndUpdate(id, { name, description, logo }, { new: true, runValidators: true });

    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    res.status(200).json({ success: true, message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
