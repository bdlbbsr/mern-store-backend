const express = require('express');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/User');
const { sendActivationEmail } = require('../utils/sendEmail');
const { jwtOptions } = require('../utils/constants');

exports.Activation = async (req, res) => {
    try {
      const { token } = req.params;
  
      // Verify and decode the activation token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Check if the token is still valid
      const user = await User.findOne({ email: decoded.email, activationToken: token, activationExpires: { $gt: new Date() } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired activation link.' });
      }
  
      // Activate the user account
      user.isActive = true;
      user.activationToken = undefined;
      user.activationExpires = undefined;
      user.activatedAt = new Date(Date.now()),
      await user.save();
  
      res.status(200).json({ message: 'Account activated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

exports.ResendActivation = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Validate email
      if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
      }
      
      // Find the user in the database
      const user = await User.findOne({ email });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if the account is already activated
      if (user.isActive) {
        return res.status(400).json({ message: 'Account is already activated.' });
      }
  
      // Generate a new activation token and update it in the database
      const newActivationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: jwtOptions.activationExpires });
      user.activationToken = newActivationToken;
      user.activationExpires = new Date(Date.now() + jwtOptions.activationDuration); // 24 hours
      await user.save();
  
      // Send the new activation email
      sendActivationEmail(user.email, newActivationToken);
  
      res.status(200).json({ message: 'Activation link resent successfully. Please check your email for activation.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };