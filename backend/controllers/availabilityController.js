const db = require("../config/db");

// 👉 Szabad időpont hozzáadása
exports.addAvailability = (req, res) => {
  const { teacher_id, date, time } = req.body;

  if (!teacher_id || !date || !time) {
    return res.status(400).json({ message: "Minden mező kötelező!" });
  }

  const sql = `
    INSERT INTO availability (teacher_id, date, time)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [teacher_id, date, time], (err, result) => {
    if (err) {
      console.error("Adatbázis hiba:", err.message);
      return res.status(500).json({ message: err.message });
    }

    res.status(201).json({ message: "Szabad időpont elmentve!" });
  });
};

// 👉 Szabad időpontok lekérése adott tanárhoz
exports.getAvailability = (req, res) => {
  const teacherId = req.params.teacherId;

  const sql = `
    SELECT * FROM availability
    WHERE teacher_id = ?
    ORDER BY date ASC, time ASC
  `;

  db.query(sql, [teacherId], (err, results) => {
    if (err) {
      console.error("Lekérési hiba:", err.message);
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json(results);
  });
};
