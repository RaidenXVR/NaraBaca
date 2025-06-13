const express = require("express");
const cors = require("cors");
const app = express();
const leaderboardRoutes = require("./routes/leaderboardRouter");

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use("/api", leaderboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
