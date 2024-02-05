// app.js (or your main server file)

const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

// Connect to MongoDB
connectToMongo();

// Create an instance of Express
const app = express();
app.use(cors());

// Middleware for parsing JSON requests
app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/trip", require("./routes/tripRoutes"));
// app.use("/api/comment", require("./routes/CommentRoutes"));
app.use("/api/comment", require("./routes/CommentRoutes"));


// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
