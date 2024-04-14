const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const dotenv = require("dotenv");
const ConnectDB = require("./Database/db");
const bodyParser = require("body-parser");
const cors = require("cors");
dotenv.config();

ConnectDB();
app.get("", (req, res) => {
  return res.status(200).send({
    ok: "Ok",
  });
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

app.use("/api/user/", require("./routers/userRoutes"));
app.use("/api/chat/", require("./routers/chatRoutes"));

let ConnectedUsers = [];

const addUser = (user, id) => {
  !ConnectedUsers.some((item) => item.email === user.email) &&
    ConnectedUsers.push({ ...user, socketId: id });
};

const getUser = (Remail) => {
  return ConnectedUsers.find((item) => item.email === Remail);
};

const removeUser = (id) => {
  ConnectedUsers = ConnectedUsers.filter((item) => item.socketId !== id);
};

io.on("connection", (socket) => {
  console.log(`${socket.id} user is Connected`);

  socket.on("add-user", (user) => {
    addUser(user, socket.id);
    // console.log("add-user is Called:", user);
    // console.log("Current Users", ConnectedUsers);
  });

  socket.on("send-msg", (msg) => {
    // msg: {msg:messagetosend,toEmail:recieving mail,}
    // console.log("ConnectedUsers: ", ConnectedUsers);
    // console.log(`All server mag: ${JSON.stringify(msg)}: from`,socket.id);
    const user = getUser(msg.toEmail);
    // console.log("Sendingby", socket.id, " to: ", user);
    const sokId = user?.socketId;
    // console.log("---------------------\n");
    // console.log(sokId);
    // console.log(io.sockets);
    // console.log("--------------------");
    // const targetClient = io.sockets[user?.socketId];
    // console.log("target",targetClient)
    if (sokId) {
      io.to(sokId).emit("recieve-msg", msg);
    }
    // socket.emit('recieve-msg',msg);
    // io.(sokId).
  });

  
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log("user disconnected: ", socket.id, ConnectedUsers);
  });
});


http.listen(process.env.PORT, () => {
  console.log(`Server is Runnning on Port: ${process.env.PORT}`);
});
