const Product = require('../models/Product');

// Search Controller
const searchProducts = async (req, res) => {
  try {
    const { query, category, brand, minPrice, maxPrice, sortField, sortOrder } = req.body;
    
    let searchQuery = {};

    if (query) {
      searchQuery.$text = { $search: query };
    }

    if (category) {
      searchQuery.category = category;
    }

    if (brand) {
      searchQuery.brand = { $in: brand };
    }


    if (minPrice !== undefined || maxPrice !== undefined) {
      searchQuery.price = {};
      if (minPrice !== undefined) {
        searchQuery.price.$gte = minPrice;
      }
      if (maxPrice !== undefined) {
        searchQuery.price.$lte = maxPrice;
      }
    }

    // Default sorting by name if no sortField is provided
    let sortOptions = { name: 1 }; // Default sort by name in ascending order
    if (sortField && sortOrder) {
      sortOptions = { [sortField]: sortOrder === 'asc' ? 1 : -1 };
    }

    const totalProducts = await Product.find(searchQuery);
    const totalDocs = totalProducts.length
    const perPage = req.query.pageSize || 10;
    const page = req.query.page || 1;
    const totalPages = Math.ceil(totalDocs / perPage);

  


    const products = await Product.find(searchQuery).sort(sortOptions)
    .skip((perPage * page) - perPage).limit(perPage)

    res.json({data:products, totalItems: totalDocs});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchProducts
};
