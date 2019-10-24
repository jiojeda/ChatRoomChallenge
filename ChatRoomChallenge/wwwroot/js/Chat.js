"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

var userName
do {
    userName = prompt("Insert your userName:");
} while (userName == null || userName == "");

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var list = document.getElementById("messagesList");

    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");

    if (list.getElementsByTagName("li").length == 50)
        list.removeChild(list.childNodes[0]);

    li.textContent = encodedMsg;
    list.appendChild(li);
});

connection.start().then(function () {

    connection.invoke("Connect", userName);
    document.getElementById("sendButton").disabled = false;

}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {

    var message = document.getElementById("messageInput").value;

    connection.invoke("SendMessage", message).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("messageInput").value = "";
    event.preventDefault();
});

connection.on("UpdateUsers", function (usersConnected, usersList) {
    var usersCount = usersConnected;

    document.getElementById("userCount").innerHTML  = "Users Connected " + usersCount;

    usersList.forEach(function (userName) {
        var list = document.getElementById("usersList");
        var li = document.createElement("li");
        li.textContent = userName;
        list.appendChild(li);
    });
});

var textInput = document.getElementById("messageInput");

textInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("sendButton").click();
    }
});