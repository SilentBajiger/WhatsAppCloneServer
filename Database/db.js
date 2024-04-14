const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("ATLAS CONNECTED");
  } catch (error) {
    console.log("Error in Connection");
    console.log(error);
  }
};

module.exports = ConnectDB;
