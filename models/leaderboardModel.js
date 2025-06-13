const pool = require("../config/db");

const getAllLeaderboards = async () => {
  const query = "SELECT * FROM leaderboard ORDER BY score DESC";
  const { rows } = await pool.query(query);
  return rows;
};

const createLeaderboard = async (data) => {
  const query = `
    INSERT INTO leaderboard (name, score, base_score, date)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [
    data.name,
    data.score,
    data.base_score,
    data.date || new Date(),
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const updateLeaderboard = async (id, data) => {
  const query = `
    UPDATE leaderboard 
    SET name = $1, score = $2, base_score = $3, date = $4
    WHERE id = $5
    RETURNING *
  `;
  const values = [data.name, data.score, data.base_score, data.date, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

const deleteLeaderboard = async (id) => {
  const query = "DELETE FROM leaderboard WHERE id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  getAllLeaderboards,
  createLeaderboard,
  updateLeaderboard,
  deleteLeaderboard,
};
