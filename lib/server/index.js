const express = require("express");
const http = require("http");

const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const ip = require("ip");
const { Server } = require("socket.io");
const bindUser = require("./middlewares/bindUser");

const port = process.env.PORT || 2306;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);


app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// calling defined routes

const authRoutes = require("./routes/auth.routes")


// applying routes called to the app

app.use("/api",authRoutes)








// server config
app.all("*", (req, res) => {
  res.status(404).json({
    statusCode: 404,
    httpStatus: "",
    message: "Sorry but the route was not found",
    result: [],
  });
});

dotenv.config({ path: path.join(__dirname, "./.env") });

const server = http.createServer(app);

const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("join", (data) => {
    console.log(data.userType, data.userId, "Connect to a socket");
    socket.join(data.userId);
  });
});
io.on("disconnect", () => {
  console.log("user disconnected");
});
app.io = io;

server.listen(port, async () => {
  console.log(
    `${process.env.NODE_ENV?.toUpperCase()} - Server is running on : http://${ip.address()}:${port}/`
  );
});
