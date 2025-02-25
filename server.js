const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// إعداد اتصال MySQL
const db = mysql.createPool({
  host: "haumea-shared.dzsecurity.net",
  user: "swisli54_am",
  password: "ovUsGt&R(E3W",
  database: "swisli54_an",
  port: 3360,
  connectTimeout: 10000, // 10 ثوانٍ
});
// تأكد من استخدام المنفذ الصحيح


db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// إنشاء API لاسترجاع بيانات المستخدمين
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
