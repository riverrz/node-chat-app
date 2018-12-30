const socket = io();

socket.on("newMessage", function(message) {
  var li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);

  jQuery("#messages").append(li);
});

$("#message-form").on("submit", function(e) {
  e.preventDefault();
  socket.emit(
    "createMessage",
    {
      from: "User",
      text: $("[name=message]").val()
    },
    function() {}
  );
});
