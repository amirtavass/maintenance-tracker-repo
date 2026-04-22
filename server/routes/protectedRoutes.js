const express = require("express");
const protect = require("../middleware/authMiddleware");
const verifyRole = require("../middleware/verifyRole");
const User = require("../models/User");

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
        blockNumber: req.user.blockNumber,
        accommodation: req.user.accommodation,
        phone: req.user.phone,
      },
    },
  });
});

router.put("/profile", protect, async (req, res, next) => {
  try {
    const { phone, roomNumber, blockNumber, accommodation } = req.body;
    const updates = {
      ...(phone !== undefined && { phone: phone?.trim() }),
      ...(roomNumber !== undefined && { roomNumber: roomNumber?.trim() }),
      ...(blockNumber !== undefined && { blockNumber: blockNumber?.trim() }),
      ...(accommodation !== undefined && { accommodation: accommodation?.trim() }),
    };

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
      context: "query",
    }).select("-password");

    res.status(200).json({
      status: "success",
      data: { user: updatedUser },
    });
  } catch (error) {
    next(error);
  }
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
