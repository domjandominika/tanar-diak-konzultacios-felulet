const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/studentRoutes');  // A studentRoutes importálása

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json()); // JSON requestek kezelésére

// A route-ok csatlakoztatása a controllerhez
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
