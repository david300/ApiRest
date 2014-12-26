var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var chatSchema = new Schema({
  name:    { type: String },
  lastText:     { type: String },
  face:  { type: String }
});

module.exports = mongoose.model('Chat', chatSchema);