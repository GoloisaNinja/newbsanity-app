const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    careerfield: {
      type: String,
    },
    currentfitnesslevel: {
      type: String,
    },
    goalfitnesslevel: {
      type: String,
    },
    hobbies: {
      type: [String],
      default: undefined,
    },
    peronsalwebsite: {
      type: String,
    },
    social: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      reddit: {
        type: String,
      },
      twitter: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      youtube: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
