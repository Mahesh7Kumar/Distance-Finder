import User from "../models/User.js";
import { calculateDistance } from "../utils/distance.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create user
export const createUser = async (req, res) => {
  const { name, latitude, longitude } = req.body;
  try {
    const user = new User({ name, latitude, longitude });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Calculate distances from current user
export const calculateUserDistances = async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const users = await User.find();
    const distances = users.map((u) => ({
      _id: u._id,
      name: u.name,
      latitude: u.latitude,
      longitude: u.longitude,
      distance: calculateDistance(latitude, longitude, u.latitude, u.longitude).toFixed(2),
    }));
    res.json(distances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
