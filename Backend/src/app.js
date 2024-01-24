const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dbConnect = require("./db/conn");
const mongoose = require("mongoose");
const router = require("./router/route");

require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

const PORT = process.env.PORT || "3000";

// API Router

app.use("/api/v1", router);

// Start Server if datbase connected
async function initializeApp() {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log("Server Started");
    });
  } catch (err) {
    console.log(err);
  }
}

initializeApp();

// Handle MongoDB connection close on application termination
process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing MongoDB connection...");

  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to application termination");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1);
  }
});
