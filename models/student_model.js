const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const StudentSchema = mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  uid : String,
  name: String
});

module.exports = mongoose.model('Student', StudentSchema, 'students');
