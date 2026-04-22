const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// Register a new user and return public user data only
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role, roomNumber, accommodation, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Name, email, and password are required.",
      });
    }

    // Validate role if provided
    const validRoles = ["student", "staff", "admin"];
    const userRole = role && validRoles.includes(role) ? role : "student";

    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "A user with that email already exists.",
      });
    }

    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: userRole,
      roomNumber: roomNumber?.trim(),
      accommodation: accommodation?.trim(),
      phone: phone?.trim(),
    });

    await user.save();

    res.status(201).json({
      status: "success",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          roomNumber: user.roomNumber,
          accommodation: user.accommodation,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Authenticate a user and return a JWT token plus public user data
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password.",
      });
    }

    const token = generateToken(user);

    res.status(200).json({
      status: "success",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          roomNumber: user.roomNumber,
          accommodation: user.accommodation,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
