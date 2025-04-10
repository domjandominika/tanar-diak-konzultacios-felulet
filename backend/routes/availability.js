const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");

// Szabad időpont hozzáadása
router.post("/", availabilityController.addAvailability);

// Tanár elérhető időpontjainak lekérése
router.get("/:teacherId", availabilityController.getAvailability);

// Időpont foglalása
router.post("/book", availabilityController.bookAppointment);

// Időpont elérhetetlenné tétele
router.post("/unavailable", availabilityController.markUnavailable);

module.exports = router;
