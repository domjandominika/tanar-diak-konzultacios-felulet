const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");

// Szabad időpont hozzáadása
router.post("/", availabilityController.addAvailability);

// Tanár elérhető időpontjainak lekérése
router.get("/:teacherId", availabilityController.getAvailability);

module.exports = router;
