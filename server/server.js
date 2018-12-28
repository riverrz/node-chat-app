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
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.emit("newConnection", {
    from: "Admin",
    text: "Welcome User",
    createdAt: new Date().getTime()
  });
  socket.broadcast.emit("newConnection", {
    from: "Admin",
    text: "New User joined",
    createdAt: new Date().getTime()
  });

  socket.on("createMessage", message => {
    console.log("create message", message);
    io.emit("newMessage", {
      ...message,
      createdAt: new Date().getTime()
    });

    // emit the event to everyone connected except this socket
    // socket.broadcast.emit("newMessage", {
    //   ...message,
    //   createdAt: new Date().getTime()
    // });
  });
});

server.listen(PORT, () => {
  console.log("Sever has started");
});
