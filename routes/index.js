const express = require('express');
const router = express.Router();
const productController = require('../controllers/Product');
const accountController = require('../controllers/Auth');
const activationController = require('../controllers/Acctivation');
const passwordController = require('../controllers/ResetPassword');
const userController = require('../controllers/User');
const feedbackController = require('../controllers/Feedback');
const cartController = require('../controllers/Cart');
const aboutPageController = require('../controllers/About');
const orderController = require('../controllers/Order')
const profileController = require('../controllers/Profile');
const sliderController = require('../controllers/HomeSlider');
const categoryController = require('../controllers/Category');
const brandController = require('../controllers/Brand');
const uploadController = require('../controllers/ImageUpload');
const SearchController = require("../controllers/Search")

const { authenticateUser } = require('../middleware/auth');

router.post('/upload', uploadController.uploadImage);

// Import individual route modules
const indexRoute = require('./indexRoute');

// Use the individual route modules
router.use('/', indexRoute);
router.post('/search', SearchController.searchProducts);
router.post('/auth/register', accountController.Registration);
router.get('/auth/activate/:token', activationController.Activation);
router.post('/auth/resend-activation', activationController.ResendActivation);
router.post('/auth/login', accountController.Login);
router.post('/auth/logout', accountController.Logout);
router.post('/auth/reset-password-request', passwordController.ForgotPassword);
router.post('/auth/reset-password/', passwordController.ResetPassword);

router.get('/profile', authenticateUser, profileController.getUserProfile);
router.patch('/profile', authenticateUser, profileController.updateUserProfile);
router.post('/saveAddress', authenticateUser, profileController.addAddress);

router.get('/home-slider', sliderController.getAllSlides);
router.post('/home-slider', authenticateUser, sliderController.createSlide);
router.patch('/home-slider/:index', authenticateUser, sliderController.updateSlide);
router.delete('/home-slider/:index', authenticateUser, sliderController.deleteSlide);

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', authenticateUser, productController.createProduct);
router.put('/products/:id', authenticateUser, productController.replaceProduct);
router.patch('/products/:id', authenticateUser, productController.updateProduct);
router.delete('/products/:id', authenticateUser, productController.deleteProduct);
router.get('/product/:name', productController.getProductByName);
router.get('/productsByCategory/:catName', productController.getProductsByCategoryName);

router.post('/feedback', authenticateUser, feedbackController.createFeedback);
router.get('/feedback/:productId', feedbackController.getFeedbackForProduct);

router.get('/cart', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/remove', cartController.removeFromCart);

router.post('/order', orderController.createOrder);
router.get('/order/:userId', orderController.getOrdersByUser);
router.get('/orderDeatsil/:orderId', orderController.getOrderById);
router.put('/order/:orderId', orderController.updateOrder);

router.get('/about', aboutPageController.getAboutPage);
router.patch('/about', aboutPageController.updateAboutPage);

router.post('/category', authenticateUser, categoryController.createCategory);
router.get('/category', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.patch('/category/:id', authenticateUser, categoryController.updateCategory);
router.delete('/category/:id', authenticateUser, categoryController.deleteCategory);

router.post('/brand', authenticateUser, brandController.createBrand);
router.get('/brand', brandController.getAllBrands);
router.get('/brand/:id', brandController.getBrandById);
router.patch('/brand/:id', authenticateUser, brandController.updateBrand);
router.delete('/brand/:id', authenticateUser, brandController.deleteBrand);





// Catch-all route for 404 errors
router.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

module.exports = router;