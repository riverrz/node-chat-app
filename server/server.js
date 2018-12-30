const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3000;

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isRealString } = require("./utils/validation");

app.use(express.static(publicPath));

io.on("connection", socket => {
  socket.on("join", function(params, callback) {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback("Name and Room name are required");
    }
    callback();
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "newMessage",
      generateMessage("Admin", "User left the chat")
    );
  });

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  socket.on("createMessage", (message, callback) => {
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback();
  });
  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });
});

server.listen(PORT, () => {
  console.log("Sever has started");
});
