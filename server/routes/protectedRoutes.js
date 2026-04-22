const express = require("express");
const protect = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/verifyRole");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        roomNumber: req.user.roomNumber,
        accommodation: req.user.accommodation,
        phone: req.user.phone,
      },
    },
  });
});

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
