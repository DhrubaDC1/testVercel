let PORT = 8080
var express = require("express"),
  path = require("path"),
  app = express(),
  http = require("http")
const { Server } = require("socket.io");

app.use(express.static("."));
const server = http.createServer(app);
const io = new Server(server);

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
})

server.listen(PORT, () => {
  console.log(`Served at http://localhost:${PORT}`);
});
