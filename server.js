const express = require('express');
const compression = require('compression');
const cors = require('cors');
const multer = require('multer');
var path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');
const connection = require('./config/dbConfig');
// const helmet = require('helmet');
const app = express();
app.use(compression());
 



// // Enable Content Security Policy
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", 'trusted-scripts.com'],
//     styleSrc: ["'self'", 'trusted-styles.com'],
//     imgSrc: ["'self'", ''],
//     connectSrc: ["'self'", ''],
//     // ... other directives
//   },
// }));

app.use(cors());
//app.use(cors({ origin: 'https://mern-store-gray.vercel.app/' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connection();




// Use routes from the 'routes' directory
app.use('/api', routes);

 

// Custom error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
