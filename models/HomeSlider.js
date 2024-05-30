const mongoose = require('mongoose');

const HomeSliderSchema = new mongoose.Schema({
  slides: [
    {
      image: {
        type: String,
        required: true
      },
      caption: String,
      link: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('HomeSlider', HomeSliderSchema);
