const socket = io();
socket.on("connect", function() {
  console.log("connected to server");
  socket.on("newConnection", function(message) {
    console.log("newConnection", message);
  });
});

socket.on("disconnect", function() {
  console.log("disconnected to server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});
