const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Submit new inquiry (from contact form)
router.post('/submit', async (req, res) => {
  try {
    console.log('Received inquiry:', req.body);

    // Basic validation
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone || !req.body.message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Create new inquiry
    const inquiry = new Inquiry({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      contactMethod: req.body.contactMethod || 'email',
      vehicleInterest: req.body.vehicleInterest || 'General Inquiry',
      vehicleId: req.body.vehicleId || null,
      message: req.body.message
    });

    await inquiry.save();
    console.log('Inquiry saved:', inquiry._id);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! We will contact you soon.',
      inquiryId: inquiry._id
    });

  } catch (error) {
    console.error('Error saving inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
});

// Admin login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ success: true, token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Verify admin token middleware
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Get all inquiries (admin only)
router.get('/admin/all', verifyAdmin, async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;
    let query = {};
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
    const total = await Inquiry.countDocuments(query);
    res.json({
      success: true,
      inquiries,
      pagination: { currentPage: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)), totalInquiries: total }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get single inquiry (admin only)
router.get('/admin/:id', verifyAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update inquiry status (admin only)
router.patch('/admin/:id/status', verifyAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status, updatedAt: new Date() }, { new: true });
    if (!inquiry) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, inquiry, message: 'Updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete inquiry (admin only)
router.delete('/admin/:id', verifyAdmin, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get statistics (admin only)
router.get('/admin/stats/overview', verifyAdmin, async (req, res) => {
  try {
    const total = await Inquiry.countDocuments();
    const newInquiries = await Inquiry.countDocuments({ status: 'new' });
    const contacted = await Inquiry.countDocuments({ status: 'contacted' });
    const converted = await Inquiry.countDocuments({ status: 'converted' });
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const todayCount = await Inquiry.countDocuments({ createdAt: { $gte: today } });
    res.json({ success: true, stats: { total, new: newInquiries, contacted, converted, today: todayCount } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;