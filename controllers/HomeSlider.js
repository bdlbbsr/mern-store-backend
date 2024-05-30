const Slider = require('../models/HomeSlider');

// Get all slides
exports.getAllSlides = async (req, res) => {
  try {
    const slider = await Slider.findOne();
    if (!slider) {
      return res.status(404).json({ success: false, message: 'Slider not found' });
    }
    res.status(200).json({ success: true, data: slider.slides });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create a new slide
exports.createSlide = async (req, res) => {
  try {
    const { image, caption, link } = req.body;

    const slider = await Slider.findOne();

    if (!slider) {
      const newSlider = new Slider({
        slides: [{ image, caption, link }]
      });
      await newSlider.save();
      return res.status(201).json({ success: true, data: newSlider.slides });
    }

    slider.slides.push({ image, caption, link });
    await slider.save();

    res.status(201).json({ success: true, data: slider.slides });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a slide by index
exports.updateSlide = async (req, res) => {
  try {
    const { index } = req.params;
    const { image, caption, link } = req.body;

    const slider = await Slider.findOne();

    if (!slider || !slider.slides[index]) {
      return res.status(404).json({ success: false, message: 'Slide not found' });
    }

    slider.slides[index] = { image, caption, link };
    await slider.save();

    res.status(200).json({ success: true, data: slider.slides });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a slide by index
exports.deleteSlide = async (req, res) => {
  try {
    const { index } = req.params;

    const slider = await Slider.findOne();

    if (!slider || !slider.slides[index]) {
      return res.status(404).json({ success: false, message: 'Slide not found' });
    }

    slider.slides.splice(index, 1);
    await slider.save();

    res.status(200).json({ success: true, data: slider.slides });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
