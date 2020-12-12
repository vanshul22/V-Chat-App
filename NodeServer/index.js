// Server side js file
// Node Server which will handle socket io connections.

// nodemon C:\Users\Vanshul\PythonProjects\Web_Development\5_MongoDB\102\NodeServer\index.js

// Importing socket.io and gave port number.
const io = require("socket.io")(8000);

// Handling users
const users = {};

io.on("connection", socket => {

    // if any users joins, let other users connected to the server knows.
    socket.on("new-user-joined", name => {
        // console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    });

    // if someone sends a message broadcast to other peoples
    socket.on("send", message => {
        socket.broadcast.emit("receive", { message: message, name: users[socket.id] });
    });

    // if someone leaves the chat let others know(disconnect is a built-in event)
    socket.on("disconnect", message => {
        socket.broadcast.emit("left", users[socket.id]);
        delete users[socket.id];
    });
});
