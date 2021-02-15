const mongoose = require('mongoose');

const ObstacleSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  name1: {
    type: String,
    required: true,
  },
  name2: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});
const Obstacle = mongoose.model('Obstacle', ObstacleSchema);
module.exports = Obstacle;
