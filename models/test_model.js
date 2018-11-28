const mongoose = require('mongoose');
const config = require('../config/database');
// User Schema
const TestSchema = mongoose.Schema ({
  _id: mongoose.Schema.Types.ObjectId,
  user: String
});

module.exports = mongoose.model('Test', TestSchema,'tests');

/*module.exports.getTest = function(id, callback) {
  Test.findById(id, callback);
}*/
