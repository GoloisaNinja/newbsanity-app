const mongoose = require('mongoose');

const TrophySchema = new mongoose.Schema(
  {
    serial: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Trophy = mongoose.model('Trophy', TrophySchema);
module.exports = Trophy;
