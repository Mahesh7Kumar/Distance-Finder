import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'https://distance-finder-inky.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// DB connection
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/users", userRoutes);

// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
