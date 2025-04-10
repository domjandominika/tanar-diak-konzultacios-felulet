const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
app.use(cors()); // CORS engedélyezése - lehetővé teszi, hogy a frontend és a backend különböző portokon kommunikáljon

// Middleware a JSON feldolgozáshoz
app.use(express.json());

// Routes
const teacherRoutes = require("./routes/teachers");
app.use("/api/teachers", teacherRoutes);

const availabilityRoutes = require("./routes/availability");
app.use("/api/availability", availabilityRoutes);
// Szerver indítása
app.listen(PORT, () => {
  console.log(`Szerver fut: http://localhost:${PORT}`);
});


