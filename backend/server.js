const express = require('express');
const app = express();
const PORT = 3001;

// Middleware a JSON feldolgozáshoz
app.use(express.json());

// Routes
const teacherRoutes = require('./routes/teachers');
app.use('/api/teachers', teacherRoutes);

// Szerver indítása
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});
  
