const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());

// Allow CORS only for your frontend domain
const allowedOrigins = [process.env.FRONTEND_URL]; 

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}));

const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);

const studentRoutes = require("./routes/Student");
app.use("/api/students", studentRoutes);

const TransactionsRoute = require("./routes/fees");
app.use("/api/students", TransactionsRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
