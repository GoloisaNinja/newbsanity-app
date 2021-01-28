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
    age: {
      type: Number,
    },
    gender: {
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
    personalwebsite: {
      type: String,
    },
    registeredEvents: [
      {
        event: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Event',
        },
        eventName: {
          type: String,
          required: true,
        },
        text: {
          type: String,
        },
        eventDate: {
          type: Date,
        },
        eventTime: {
          type: String,
        },
      },
    ],
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
