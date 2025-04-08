const db = require('../config/db');

exports.registerTeacher = (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Minden mező kitöltése kötelező.' });
  }

  const sql = 'INSERT INTO teachers (name, email, password) VALUES (?, ?, ?)';

  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      console.error('Hiba az adatbázisban:', err);
      return res.status(500).json({ message: 'Adatbázis hiba.' });
    }

    res.status(201).json({ message: 'Sikeres regisztráció!', teacherId: result.insertId });
  });
};

exports.loginTeacher = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email és jelszó megadása kötelező.' });
    }
  
    const sql = 'SELECT * FROM teachers WHERE email = ?';
  
    db.query(sql, [email], (err, results) => {
      if (err) {
        console.error('Adatbázis hiba:', err);
        return res.status(500).json({ message: 'Adatbázis hiba.' });
      }
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Nincs ilyen email cím.' });
      }
  
      const user = results[0];
  
      // Egyszerű jelszóellenőrzés (később bcrypt-tel fogjuk)
      if (user.password !== password) {
        return res.status(401).json({ message: 'Hibás jelszó.' });
      }
  
      // Sikeres bejelentkezés
      res.json({ message: 'Sikeres bejelentkezés!', teacherId: user.id });
    });
  };
  
