const db = require('./config/db'); // importáljuk a db.js-t

db.connect((err) => {
  if (err) {
    console.error('❌ Adatbázis csatlakozás sikertelen:', err.message);
  } else {
    console.log('✅ Sikeres adatbázis kapcsolat!');
    db.end(); // lezárjuk a kapcsolatot
  }
});
