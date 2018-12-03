const mongoose = require('mongoose');
const config = require('../config/database');

const TaskSchema = mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  uid: String,
  date: String,
  subject: String,
  name: String,
  __v: {type: Number, select: false}
});

module.exports = mongoose.model('Task', TaskSchema,'tasks');
