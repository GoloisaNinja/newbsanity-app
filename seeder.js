const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./db/db');
const Obstacle = require('./models/Obstacle');
const Advice = require('./models/Advice');
const obstacles = require('./ObstacleObject');
const allAdvice = require('./AdviceObject');

connectDB();

const importData = async () => {
  try {
    await Obstacle.deleteMany();
    await Advice.deleteMany();

    await Obstacle.insertMany(obstacles);
    await Advice.insertMany(allAdvice);
    console.log('data imported');
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Obstacle.deleteMany();
    await Advice.deleteMany();

    console.log('data destroyed');
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
