var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
  name:    { type: String },
  lastText:     { type: String },
  face:  { type: String }
});

module.exports = mongoose.model('User', userSchema);