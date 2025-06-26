const mongoose = require("mongoose");

const ChocolateLogSchema = new mongoose.Schema({
  member: {
    type: String,
    enum: ['younger brother', 'elder brother', 'mother', 'father', 'grandma'],
    required: true
  },
  type: {
    type: String,
    enum: ['orange', 'classic', 'butter scotch', 'sea salt', 'almond', 'coffee crisp'],
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ChocolateLog", ChocolateLogSchema);