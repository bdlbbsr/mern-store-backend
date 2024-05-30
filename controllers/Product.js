const Product = require('../models/Product')

exports.createProduct = async (req, res) => {
  const { name, price, description, category, brand, thumbnail, images, stock } = req.body;

  const newProduct = new Product({
    name,
    price,
    description,
    category,
    brand,
    thumbnail,
    images,
    stock,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json({ success: true, data: savedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductByName = async (req, res) => {
  try {
    const productName = req.params.name.replace(/-/g, ' ');
    const product = await Product.findOne({ name: productName });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductsByCategoryName = async (req, res) => {
  let condition = {}
  const categoryName = req.params.catName.replace(/_/g, ' ');
  // const query = req.query;
  //const products = await Product.find({ category: categoryName });
  const { price, brands, isAvailable, sort } = req.query
  let query = Product.find(condition);

  query = Product.find({ category: { $in: [categoryName] } });


  if (brands) {
    const brandsArray = brands.split(',');
    query = query.find({ brand: { $in: brandsArray } });
  } else {

  }





  if (sort == '1') {
    query = query.sort({ price: 1 });
  } else if (sort == '2') {
    query = query.sort({ price: -1 });
  } else {
    query = query.sort({ createdAt: -1 });
  }



  const availavleLogic = { stock: isAvailable == 'available' ? { $gt: 0 } : { $gte: 0 } };

  if (isAvailable) {
    query = query.find(availavleLogic);
  }

  const queryabc = {
    price: { $gte: 1, $lte: price }
  };

  if (price != undefined) {
    query = query.find(queryabc);
  }

  try {
    const products = await query.exec();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(400).json(err);
  }







  // Product.aggregate([
  //   {
  //     $match:
  //     {
  //       'category': categoryName
  //     }
  //   },
  // ])
  //   // .exec()
  //   //.then((orderStatuses) => { orderStatuses.forEach(orderStatus => console.log(orderStatus)) })            
  //   //.then((orderStatuses) => { res.send({ orderStatuses }) })
  //   .then((products) => {
  //     res.status(200).json({ success: true, data: products })
  //   })
  //   .catch((err) => {
  //     res.send(err)
  //     //throw err;
  //   });



  //try {

  //const products = await Product.find({ category: categoryName });

  // const filteredProducts = products.filter(product => {
  //   //console.log('Product:', product);
  //   return Object.keys(query).every(key => {
  //     console.log('Query:', key, 'Key-',query[key]);
  //     const includes = product[key] && product[key].toString().includes(query[key]);
  //     console.log('Includes:', includes, 'prdkey', product[key]);
  //     return includes;
  //   });
  // });

  // const filteredProducts = products.filter(product => {
  //   return Object.keys(query).every(key => {
  //     if (product[key] === undefined) {
  //       return false; // If the product does not have the key, exclude it
  //     }
  //     return product[key].toString().toLowerCase().includes(query[key].toLowerCase());
  //   });
  // });

  //console.log('filteredProducts:', filteredProducts);

  //   if (!products) {
  //     return res.status(404).json({ success: false, message: 'Product not found' });
  //   }

  //   res.status(200).json({ success: true, data: products });
  // } catch (error) {
  //   res.status(500).json({ success: false, message: error.message });
  // }
};



exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};















// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
//         if (!product) return res.status(404).json({ message: 'Product not found' });
//         res.json(product);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// exports.createProduct = async (req, res) => {
//     const product = new Product(req.body);
//     try {
//         const newProduct = await product.save();
//         res.status(201).json(newProduct);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// exports.updateProduct = async (req, res) => {
//     try {
//         const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
//         res.json(updatedProduct);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// exports.deleteProduct = async (req, res) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         if (!product) return res.status(404).json({ message: 'Product not found' });
//         res.json({ message: 'Product deleted' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await Product.findOneAndReplace({ _id: id }, req.body, { new: true })
    res.status(201).json(doc);
  }
  catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

