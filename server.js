const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // ✅ Properly enabled CORS
app.use(express.json()); // ✅ Supports JSON body parsing


app.get("/hello", (req, res) => {
  res.send("Hello from your GST invoice server on Vercel!");
});


// ✅ Root route to indicate server status
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});





// 🌍 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

