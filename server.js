const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// إنشاء اتصال MySQL باستخدام createPool
const db = mysql.createPool({
  host: "haumea-shared.dzsecurity.net",
  user: "swisli54_am",
  password: "ovUsGt&R(E3W",
  database: "swisli54_an",
  port: 3360,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// API لاسترجاع المستخدمين
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

// API لفحص الاتصال بقاعدة البيانات
app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      res.status(500).json({ error: "Database connection failed" });
    } else {
      res.json({ message: "Database connected successfully!" });
    }
  });
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
