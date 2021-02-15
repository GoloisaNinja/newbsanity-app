const mongoose = require('mongoose');

const AdviceSchema = new mongoose.Schema({
  theme: {
    type: String,
    required: true,
  },
  advice: {
    type: String,
    required: true,
  },
});
const Advice = mongoose.model('Advice', AdviceSchema);
module.exports = Advice;
