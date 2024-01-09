const socket = io();

document.querySelector("#form").onsubmit = function (e) {
  e.preventDefault();
  const input = e.target.input;
  const user = e.target.getAttribute("data-user");
  if (input.value) {
    socket.emit("addMessage", { user, message: input.value });
    input.value = "";
  }
};

socket.on("getMessages", function (messages) {
  if (messages.length > 0) {
    document.querySelector("#messages").innerHTML = "";

    messages.forEach((msg) => {
      const item = document.createElement("li");
      item.textContent = `${msg.user}: ${msg.message}`;
      document.querySelector("#messages").appendChild(item);
    });
    window.scrollTo(0, document.body.scrollHeight);
  } else {
    console.log("Not messages");
  }
});
