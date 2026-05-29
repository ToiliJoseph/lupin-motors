const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  contactMethod: { type: String, enum: ['phone', 'email', 'text'], default: 'email' },
  vehicleInterest: { type: String, default: 'General Inquiry' },
  vehicleId: { type: String, default: null },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ['new', 'contacted', 'in-progress', 'closed', 'converted'], default: 'new' },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

inquirySchema.index({ createdAt: -1 });
inquirySchema.index({ status: 1 });
inquirySchema.index({ email: 1 });

module.exports = mongoose.model('Inquiry', inquirySchema);