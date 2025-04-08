const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', // ha van beállítva jelszó, azt írd ide
  database: 'konzultacios_rendszer'
});

module.exports = connection;
