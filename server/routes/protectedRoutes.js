const express = require("express");
const protect = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/verifyRole");

const router = express.Router();

router.get(
  "/student",
  protect,
  verifyRole("student", "staff", "admin"),
  (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Student area accessed.",
      data: { user: req.user },
    });
  },
);

router.get(
  "/staff",
  protect,
  verifyRole("staff", "admin"),
  (req, res) => {
    res.status(200).json({
      status: "success",
      message: "Staff area accessed.",
      data: { user: req.user },
    });
  },
);

router.get("/admin", protect, verifyRole("admin"), (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Admin area accessed.",
    data: { user: req.user },
  });
});

module.exports = router;
