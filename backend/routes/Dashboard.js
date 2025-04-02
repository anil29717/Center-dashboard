const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Get Dashboard Stats
router.get("/", async (req, res) => {
  try {
    // Count Total Students
    const totalStudents = await Student.countDocuments();

    // Count Active and Inactive Students
    const activeStudents = await Student.countDocuments({ status: "active" });
    const inactiveStudents = totalStudents - activeStudents;

    // Fetch all active students
    const students = await Student.find({ status: "active" });

    // Calculate Total Monthly Fees from Active Students
    const totalFeesPerMonth = students.reduce(
      (sum, student) => sum + (student.fee || 0), // Use `fee` from schema
      0
    );

    // Calculate Total Fees Received from All Students
    const allStudents = await Student.find();
    const totalFeesReceived = allStudents.reduce(
      (sum, student) =>
        sum +
        (student.fees
          ? student.fees.reduce((subSum, fee) => subSum + (fee.amount || 0), 0)
          : 0),
      0
    );

    // Send Response with All Data
    res.json({
      totalStudents,
      activeStudents,
      inactiveStudents,
      totalFeesPerMonth,
      totalFeesReceived,
    });

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
});

module.exports = router;
