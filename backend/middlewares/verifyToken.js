const jwt = require('jsonwebtoken');
const JWT_SECRET = 'titkoskulcs123'; // ezt majd .env-ből is olvashatod

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Token hiányzik.' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer token"

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Érvénytelen token.' });
    }

    req.user = user; // a tokenben lévő adatokat átadjuk
    next();
  });
};
