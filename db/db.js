const mongoose = require('mongoose');
const db = process.env.MONGODB_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected...');
	} catch (err) {
		console.error(err.message);
		// exit process on failure
		process.exit(1);
	}
};

module.exports = connectDB;
