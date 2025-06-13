// filepath: backend-narabaca/routes/leaderboardRouter.js
const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

// Get all leaderboard entries
router.get("/leaderboards", leaderboardController.getLeaderboards);

// Create new leaderboard entry
router.post("/leaderboards", leaderboardController.createLeaderboard);

// Update leaderboard entry
router.put("/leaderboards/:id", leaderboardController.updateLeaderboard);

// Delete leaderboard entry
router.delete("/leaderboards/:id", leaderboardController.deleteLeaderboard);

module.exports = router;
