const express = require("express");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");

// MongoDB connection string
const mongoURI = "mongodb+srv://mora78606:Nz5NC8F3kKZbLsbT@cluster0.jltmw7l.mongodb.net/?appName=Cluster0";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Schema and Model
const messageSchema = new mongoose.Schema({
  chatId: String,
  text: String,
  sender: String,
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/create", async (req, res) => {
  const { name, active, age } = req.body;
  const newUser = { name, active, age };
  const database = mongoose.connection.db;
  const collection = database.collection("users");
  const result = await collection.insertOne(newUser);
  res.send(result);
});

app.get("/Data", async (req, res) => {
  const database = mongoose.connection.db;
  const collection = database.collection("Data");
  const result = await collection.find({}).toArray();
  res.send(result);
});

app.post("/login-data", async (req, res) => {
  const { username, password } = req.body;
  const database = mongoose.connection.db;
  const collection = database.collection("Login-Data");
  const result = await collection.findOne({ username, password });
  if (result) {
    res.send(result);
  } else {
    res.status(404).send({ error: "Invalid username or password" });
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const database = mongoose.connection.db;
  const collection = database.collection("Login-Data");
  const result = await collection.findOne({ _id: new mongoose.Types.ObjectId(id) });
  res.send(result);
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
  });

  socket.on('sendMessage', async (data) => {
    const { chatId, text, sender } = data;
    const message = new Message({ chatId, text, sender });
    await message.save();
    io.to(chatId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
