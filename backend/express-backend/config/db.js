// db.js
const { Pool } = require("pg");
require("dotenv").config();
const { parse } = require("pg-connection-string");

// Parsing DATABASE_URL agar bisa menambahkan ssl config
const config = parse(process.env.DATABASE_URL);

// Tambahkan opsi SSL
const pool = new Pool({
  ...config,
  ssl: {
    rejectUnauthorized: false, // Menerima self-signed certificate
  },
});

// Tes koneksi saat aplikasi dijalankan
pool
  .connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL database");
    client.release();
  })
  .catch((err) => {
    console.error("❌ Failed to connect to PostgreSQL database:", err.message);
  });

module.exports = pool;
