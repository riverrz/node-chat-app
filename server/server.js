const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, "../public");
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
  socket.on("createMessage", message => {
    console.log("create message", message);
    io.emit("newMessage", {
      ...message,
      createdAt: new Date().getTime()
    });
  });
});

server.listen(PORT, () => {
  console.log("Sever has started");
});
