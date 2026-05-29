require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Error:', err.message);
    process.exit(1);
  });

app.use('/api/inquiries', require('./routes/inquiries'));
app.use(express.static(path.join(__dirname, '..')));
app.use(express.static('C:\\Users\\PC\\web'));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected' });
});

const PORT = process.env.PORT || 5000;
// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.htm'));
});
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
  console.log('Admin: http://localhost:' + PORT + '/admin/login.html');
});