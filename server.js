const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors()); // ✅ Properly enabled CORS
app.use(express.json()); // ✅ Supports JSON body parsing

let marketData = {
  banknifty: null,
  nifty: null,
  sensex: null,
  finnifty: null,
  midcapnifty: null,
};

// 🔄 Function to Fetch Market Data Every 3 Seconds
const fetchMarketData = async () => {
  try {
    console.log("Fetching market data...");

    const endpoints = {
      banknifty: "%5ENSEBANK",
      nifty: "%5ENSEI",
      sensex: "%5EBSESN",
      finnifty: "NIFTY_FIN_SERVICE.NS",
      midcapnifty: "NIFTY_MID_SELECT.NS",
    };

    for (const [key, symbol] of Object.entries(endpoints)) {
      const response = await axios.get(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1m`
      );
      marketData[key] = response.data;
    }

    console.log("✅ Market data updated successfully!");
  } catch (error) {
    console.error("❌ Error fetching market data:", error.response?.data || error.message);
  }
};

// 🔄 Fetch Immediately on Startup & Every 3 Seconds
setInterval(fetchMarketData, 3000);
fetchMarketData();


// ✅ Root route to indicate server status
app.get("/", (req, res) => {
  res.send("🚀 Server is up and running!");
});

// ✅ Dynamic API Route for Any Market Data
app.get("/api/:market", (req, res) => {
  const market = req.params.market.toLowerCase(); // ✅ Fixed the error
  if (!marketData[market]) {
    return res.status(503).json({ error: "Fetching data, please try again in a few seconds." });
  }
  res.json(marketData[market]);
});



// 🌍 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

