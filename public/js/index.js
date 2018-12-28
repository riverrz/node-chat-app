const socket = io();
socket.on("connect", function() {
  console.log("connected to server");

  socket.emit("createMessage", {
    from: "sari@example.com",
    text: "Hey"
  });
});

socket.on("disconnect", function() {
  console.log("disconnected to server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});
