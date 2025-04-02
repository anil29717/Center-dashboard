const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// Get All Fee Transactions
router.get("/transactions", async (req, res) => {
  try {
    const students = await Student.find({}, "name phone fees");

    const transactions = students.flatMap(student =>
      student.fees.map(fee => ({
        studentId: student._id,
        name: student.name,
        phone: student.phone,
        amount: fee.amount,
        month: fee.month,
        paymentMode: fee.paymentMode,
        date: fee.date,
      }))
    );

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions" });
  }
});

module.exports = router;
