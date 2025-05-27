const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const {
      name, email, password, phone,
      gender, dateOfBirth, pincode, city, state, country
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      dateOfBirth,
      pincode,
      city,
      state,
      country
    });

    await user.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // ✅ Generate JWT token
    const payload = { user: { id: user._id } };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });


    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await User.countDocuments();
    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .select("-password");

    res.status(200).json({
      totalUsers: total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      users
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");
    if (!updatedUser) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ msg: "User updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ msg: "User not found" });
    res.status(200).json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Search/filter users (e.g. by city or email)
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query; // Example: /api/auth/search?city=Delhi
    const users = await User.find(query).select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
