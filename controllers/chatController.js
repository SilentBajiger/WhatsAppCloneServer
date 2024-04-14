const Chat = require("../models/chats");

const saveChatController = async (req, res) => {
  try {
    const { fromEmail, toEmail, msgId, msg, photo } = req.body;
    // const newChat = new Chat({
    //     fromEmail:"ok",toEmail:"nok",msgId:"ok",msg:"plp"
    // });
    console.log("SavingChat");
    const newChat = new Chat({
      fromEmail,
      toEmail,
      msgId,
      msg,
      photo,
    });
    await newChat.save();
    console.log("Chat Saved");
    return res.status(200).send({
      success: true,
      msg: "Chat Save Successfully",
      newChat,
    });
  } catch (error) {
    // console.log("Error in saveChatController");
    console.log(error);
    return res.status(400).send({
      success: false,
      msg: "Error in saveChat Api",
      error,
    });
  }
};

const getAllChatsController = async (req, res) => {
  try {
    // console.log("Getting All Chats from Server in Controller");
    const { fromEmail, toEmail } = req.body;
    // console.log("FromEmail", fromEmail, "ToEmail:", toEmail);
    const allChats = await Chat.find({
      msgId: { $in: [fromEmail + toEmail, toEmail + fromEmail] },
    });
    return res.status(200).send({
      success: 200,
      msg: "All Chat Recieved Successfully",
      allChats,
    });
  } catch (error) {
    // console.log("Error in Get All Chat Controller");
    console.log(error);
    return res.status(400).send({
      success: false,
      msg: "Error in Get  All Chat Api",
      error,
    });
  }
};

module.exports = { saveChatController, getAllChatsController };
