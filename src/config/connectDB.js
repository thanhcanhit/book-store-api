const mongoose = require('mongoose');

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(process.env.DATABASE_URL);
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log('Couldn\'t connect to MongoDB, Error: ', err.message)
    }
  }
}