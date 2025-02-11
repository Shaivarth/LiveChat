const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // ✅ Add CORS

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",  // ✅ Allow all origins (you can restrict it later)
        methods: ["GET", "POST"]
    }
});

app.use(cors());  // ✅ Apply CORS middleware
app.use(express.static(__dirname));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.on("message", (data) => {
        io.emit("message", data); // Broadcast message with username
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = process.env.PORT || 3000;  // ✅ Use environment PORT if available
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
