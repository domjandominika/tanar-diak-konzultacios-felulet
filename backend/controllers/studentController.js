const db = require('../config/db');

exports.registerStudent = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Minden mező kitöltése kötelező.' });
  }

  const sql = 'INSERT INTO students (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Adatbázis hiba:', err);
      return res.status(500).json({ message: 'Adatbázis hiba.' });
    }

    res.status(201).json({ message: 'Sikeres regisztráció!', studentId: result.insertId });
  });
};