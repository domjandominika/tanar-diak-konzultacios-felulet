const db = require("../config/db");

// 👉 Szabad időpont hozzáadása
exports.addAvailability = (req, res) => {
  const { teacher_id, date, time, status = "available" } = req.body; // Alapértelmezetten 'available'

  if (!teacher_id || !date || !time) {
    return res.status(400).json({ message: "Minden mező kötelező!" });
  }

  const sql = `
    INSERT INTO availability (teacher_id, date, time, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [teacher_id, date, time, status], (err, result) => {
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
// 👉 Időpont foglalása (status = 'booked')
exports.bookAppointment = (req, res) => {
  const { teacher_id, date, time, student_name, student_class } = req.body;

  if (!teacher_id || !date || !time || !student_name || !student_class) {
    return res.status(400).json({ message: "Minden mező kitöltése kötelező!" });
  }

  // Ellenőrizzük, hogy az időpont szabad-e
  const checkAvailabilitySql = `
      SELECT * FROM availability
      WHERE teacher_id = ? AND date = ? AND time = ? AND status = 'available'
    `;

  db.query(checkAvailabilitySql, [teacher_id, date, time], (err, results) => {
    if (err) {
      console.error("Adatbázis hiba:", err.message);
      return res.status(500).json({ message: err.message });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Ez az időpont már nem szabad!" });
    }

    // Ha szabad, módosítjuk a státuszt 'booked'-ra és hozzáadjuk a diák nevét és osztályát
    const updateStatusSql = `
        UPDATE availability
        SET status = 'booked', student_name = ?, student_class = ?
        WHERE teacher_id = ? AND date = ? AND time = ?
      `;

    db.query(
      updateStatusSql,
      [student_name, student_class, teacher_id, date, time],
      (err, result) => {
        if (err) {
          console.error("Adatbázis hiba:", err.message);
          return res.status(500).json({ message: err.message });
        }

        res.status(200).json({ message: "Időpont foglalva!" });
      }
    );
  });
};

// 👉 Időpont elérhetőség módosítása (status = 'unavailable')
exports.markUnavailable = (req, res) => {
  const { teacher_id, date, time } = req.body;

  const sql = `
      UPDATE availability
      SET status = 'unavailable'
      WHERE teacher_id = ? AND date = ? AND time = ?
    `;

  db.query(sql, [teacher_id, date, time], (err, result) => {
    if (err) {
      console.error("Adatbázis hiba:", err.message);
      return res.status(500).json({ message: err.message });
    }

    res.status(200).json({ message: "Időpont nem elérhetővé téve!" });
  });
};
