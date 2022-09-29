const renderList = (item) => {
  const tr = item
    .map(
      (it) => `
    <tr>
        <td>${it.title}</td>
        <td>${it.price}</td>
        <td><img src=${it.thumbnail} alt=""></td>
    </tr>`
    )
    .join("");
  document.getElementById("tbody").innerHTML = tr;
};

const renderChat = (chat) => {
  const li = chat
    .map(
      (msg) => `
    <li>
    <div classname='msg'>
      <div class='boldtxt'>${msg.autor}</div>
      [${msg.time}]:${msg.message}
    </div>
    </li>`
    )
    .join("");
  document.getElementById("messages").innerHTML = li;
};

const sendMessage = (e) => {
  const name = document.getElementById("mailInput").value;
  const msg = document.getElementById("messageInput").value;
  const time = new Date().toLocaleString();
  document.getElementById("messageInput").value = "";
  msg.length > 0 &&
    socket.emit("new_msg", { autor: name, message: msg, time: time });
  return false;
};

const socket = io.connect();

socket.on("products", (item) => {
  renderList(item);
});
socket.on("chat-messages", (msg) => {
  renderChat(msg);
});
