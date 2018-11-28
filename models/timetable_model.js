const mongoose = require('mongoose');
const config = require('../config/database');
// User Schema
const TimetableSchema = mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  day : Number,
  hour : Number,
  subject : String,
  room : String,
  __v: {type: Number, select: false}
});

module.exports = mongoose.model('Timetable', TimetableSchema, 'timetables');

/*module.exports.getTest = function(id, callback) {
  Test.findById(id, callback);
}*/
