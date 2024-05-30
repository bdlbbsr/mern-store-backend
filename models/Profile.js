// profileModel.js

const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    unique: true,
    required: true
  },
  addresses: [
    {
      name: {
        type: String,
        required: true,
      },
      mobile: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      }
      

    }
  ],
  gender: String,
  state: String,
  country:String
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
