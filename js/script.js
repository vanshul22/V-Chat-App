// Client side js file 

// Here we connect with Server
const socket = io("http://localhost:8000");

// GET DOMS element in respctive JS variables
const form = document.getElementById("send-container");
const messageInput = document.getElementById("message-inp");
const messageContainer = document.querySelector(".container");

// It play audio while receiving messages
const audio = new Audio("ting.mp3");

// Append the messages with their required fields in container
const append = (message, position) => {
    const messageElement = document.createElement("div");
    // adding message in element
    messageElement.innerText = message;
    // adding classes in our new element 
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == "left") {
        audio.play();
    }
}

// Taking User Name and let the server knows
const name = prompt("Enter Your Name to Join");
socket.emit("new-user-joined", name);

// If new users joins, receive the event from server
socket.on("user-joined", name => {
    append(`${name} Joined the Chat`, "right")
});

// If server sends a message server receive it
socket.on("receive", data => {
    append(`${data.name}: ${data.message}`, "left");
});

// If a users leaves the chat, append the info to the container
socket.on("left", name => {
    append(`${name} left the chat`, "right");
});

// if the form get submitted send message to server
form.addEventListener("submit", (e) => {
    // page doesnot load from this preventdefault.
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "right");
    // telling node server that i am sending message 
    socket.emit("send", message);
    // clearing text area 
    messageInput.value = "";
})