const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    extremeRavineLaps: {
      type: Number,
    },
    mudGauntletLaps: {
      type: Number,
    },
    workoutPartner: {
      type: String,
    },
    text: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },

  { timestamps: true }
);

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;
