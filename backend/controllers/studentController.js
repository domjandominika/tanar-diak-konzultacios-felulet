const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root', // vagy amilyen jelszót beállítottál
  database: 'konzultacios_rendszer',
};

const JWT_SECRET = process.env.JWT_SECRET || 'valamiTitkosKulcs';

// Bejelentkezés (login)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Hiányzó adatok!' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM students WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Nincs ilyen felhasználó!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Hibás jelszó!' });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ message: 'Sikeres bejelentkezés!', token, name: user.name, email: user.email });
  } catch (error) {
    console.error('Bejelentkezési hiba:', error);
    res.status(500).json({ message: 'Szerverhiba!' });
  }
};

// Regisztráció
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Minden mező kitöltése kötelező.' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    // Ellenőrizzük, van-e már ilyen email
    const [existing] = await connection.execute('SELECT id FROM students WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Ez az email már használatban van.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await connection.execute('INSERT INTO students (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: 'Sikeres regisztráció!' });
  } catch (error) {
    console.error('Adatbázis hiba:', error);
    res.status(500).json({ message: 'Szerverhiba!' });
  }
};
