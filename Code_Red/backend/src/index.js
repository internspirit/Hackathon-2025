import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/index.js";
import authMiddleware from "./middlewares/auth.middlewares.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Fix CORS issue
app.use(
  cors({

  })
);

// Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());



// Routes
import authRoutes from "./routes/auth.routes.js";
app.use("/api/auth", authRoutes);
app.use(authMiddleware);


import vendorRoutes from "./routes/vendor.routes.js";
app.use("/api/vendor", vendorRoutes);

import adminRoutes from "./routes/admin.routes.js";
app.use("/api/admin", adminRoutes);

import userRoutes from "./routes/user.routes.js";
app.use("/api/user", userRoutes);



// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });