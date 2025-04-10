const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const verifyToken = require("../middlewares/verifyToken");

// Tanár regisztráció végpont
router.post("/register", teacherController.registerTeacher);
router.post("/login", teacherController.loginTeacher);

// 🔐 Védett route – csak tokennel lehet elérni
router.get("/profile", verifyToken, (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email
  });
});
module.exports = router;
