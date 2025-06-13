const leaderboardModel = require("../models/leaderboardModel");

const getLeaderboards = async (req, res) => {
  try {
    const leaderboards = await leaderboardModel.getAllLeaderboards();
    res.status(200).json({
      status: "success",
      data: leaderboards,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Gagal mengambil data leaderboard",
    });
  }
};

const createLeaderboard = async (req, res) => {
  try {
    const { name, score, base_score } = req.body;

    if (!name || !score || base_score === undefined) {
      return res.status(400).json({
        status: "error",
        message: "name, score, dan base_score wajib diisi",
      });
    }

    const newLeaderboard = await leaderboardModel.createLeaderboard({
      name,
      score,
      base_score,
      date: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: newLeaderboard,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Gagal membuat data leaderboard",
    });
  }
};

const updateLeaderboard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLeaderboard = await leaderboardModel.updateLeaderboard(
      id,
      req.body
    );

    if (!updatedLeaderboard) {
      return res.status(404).json({
        status: "error",
        message: "Data leaderboard tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      data: updatedLeaderboard,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Gagal memperbarui data leaderboard",
    });
  }
};

const deleteLeaderboard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLeaderboard = await leaderboardModel.deleteLeaderboard(id);

    if (!deletedLeaderboard) {
      return res.status(404).json({
        status: "error",
        message: "Data leaderboard tidak ditemukan",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Data leaderboard berhasil dihapus",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "Gagal menghapus data leaderboard",
    });
  }
};

module.exports = {
  getLeaderboards,
  createLeaderboard,
  updateLeaderboard,
  deleteLeaderboard,
};
