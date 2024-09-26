const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static("public"));

// Handle video stream data
io.on("connection", (socket) => {
  console.log("Client connected");
  console.log("meowmewo");

  // Receive the video stream from the phone
  socket.on("video-stream", (data) => {
    socket.broadcast.emit("video-feed", data); // Use broadcast instead of io.emit
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
