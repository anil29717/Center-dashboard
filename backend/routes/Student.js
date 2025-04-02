const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Student = require("../models/Student");
const { markAttendance, getAttendanceReport  } = require("../controllers/studentControllers");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route   POST /api/students
 * @desc    Add a new student
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "students" },
      async (error, cloudinaryResult) => {
        if (error) return res.status(500).json({ error: "Image upload failed" });

        // Create new student
        const newStudent = new Student({
          image: cloudinaryResult.secure_url,
          name: req.body.name,
          age: req.body.age,
          phone: req.body.phone,
          address: req.body.address,
          fee: req.body.fee,
          class: req.body.class,
          school: req.body.school,
          status: "active",
          fees: [],
          attendance: [],
        });

        await newStudent.save();
        res.status(201).json({ success: true, student: newStudent });
      }
    );

    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
});

/**
 * @route   GET /api/students
 * @desc    Get all students
 */
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

/**
 * @route   PUT /api/students/:id/status
 * @desc    Update student status (Active/Inactive)
 */
router.put("/:id/status", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    student.status = student.status === "active" ? "inactive" : "active";
    await student.save();
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ error: "Failed to update student status" });
  }
});

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete a student
 */
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

router.post("/add-fees", async (req, res) => {
    const { studentName, amount, startDate, lastPaidDate, month, paymentMode } = req.body;
  
    try {
      // Find the student by name
      const student = await Student.findById(studentName);

  
      if (!student) {
       
        return res.status(404).json({ message: "Student not found" });
      }
  
      // Ensure that fees is an array (it may have been set incorrectly before)
      if (!Array.isArray(student.fees)) {
        student.fees = [];  // Convert fees to an empty array if it's not
      }
  
      // Add new fee to the fees array
      const newFee = {
        amount,
        month,
        startDate: new Date(startDate),
        lastPaidDate: new Date(lastPaidDate),
        date: new Date(),
        paymentMode,  
      };
  
      // Push the new fee to the fees array
      student.fees.push(newFee);
  
      // Save the student document with the updated fees
      await student.save();
  
      res.status(200).json({ message: "Fees added successfully", student });
  
    } catch (error) {
      console.error("Error adding fees:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  

  router.get("/:id/attendance", async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.status(200).json({ attendance: student.attendance });
    } catch (error) {
      console.error("Error fetching attendance:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  


router.post("/mark-attendance", markAttendance);
router.get("/attendance-report", getAttendanceReport);

module.exports = router;
