const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3000;

const { generateMessage } = require("./utils/message");

app.use(express.static(publicPath));

io.on("connection", socket => {
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  socket.on("createMessage", message => {
    console.log("create message", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
  });
});

server.listen(PORT, () => {
  console.log("Sever has started");
});
