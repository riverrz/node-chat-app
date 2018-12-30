const socket = io();
socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("disconnected to server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});

socket.emit(
  "createMessage",
  {
    from: "Frank@example.com",
    text: "Hi"
  },
  function(reply) {
    console.log("Got it!" + reply);
  }
);
