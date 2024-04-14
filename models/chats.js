const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    fromEmail: {
      type: String,
      required: [true, "Please Provide Sender Email"],
    },
    toEmail: {
      type: String,
      required: [true, "Please Provide Reciever Email"],
    },
    msgId: {
      type: String,
      required: [true, "please Give ID Combine sender and reciver email"],
    },
    msg: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Chat", chatSchema);
