const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// إعداد اتصال MySQL
const db = mysql.createConnection({
  host: "haumea-shared.dzsecurity.net",
  user: "swisli54_am",
  password: "YOUR_PASSWORD",
  database: "DATABASE_NAME",
  port: 3360, // تأكد من استخدام المنفذ الصحيح
});

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
