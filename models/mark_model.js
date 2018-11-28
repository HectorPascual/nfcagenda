const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const MarkSchema = mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  uid : Number,
  subject: String,
  name: String,
  mark: Number,
  __v: {type: Number, select: false}
});

module.exports = mongoose.model('Mark', MarkSchema,'marks');
