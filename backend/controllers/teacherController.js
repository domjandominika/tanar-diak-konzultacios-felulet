const db = require("../config/db");

exports.registerTeacher = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Minden mező kitöltése kötelező." });
  }

  const sql = "INSERT INTO teachers (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error("Hiba az adatbázisban:", err);
      return res.status(500).json({ message: "Adatbázis hiba." });
    }

    res
      .status(201)
      .json({ message: "Sikeres regisztráció!", teacherId: result.insertId });
  });
};

const jwt = require("jsonwebtoken");

// titkos kulcs (biztonságos környezetben ENV változó legyen)
const JWT_SECRET = "titkoskulcs123";
exports.loginTeacher = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM teachers WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "Adatbázis hiba." });

    if (results.length === 0) {
      return res.status(401).json({ message: "Hibás email vagy jelszó." });
    }

    const teacher = results[0];

    // Token generálása (ID + név alapján)
    const token = jwt.sign(
      { id: teacher.id, name: teacher.name, email: teacher.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Sikeres bejelentkezés!",
      token,
      name: teacher.name,
      email: teacher.email,
    });
  });
};
