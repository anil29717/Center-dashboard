const Student = require("../models/Student");


// Mark Attendance
exports.markAttendance = async (req, res) => {
    try {
      const { studentId, status } = req.body;
  
      const student = await Student.findById(studentId);

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      if (!Array.isArray(student.attendance)) {
        student.attendance = []; // Initialize if it's undefined
      }
  
      // Add attendance record
      const date = new Date();
      student.attendance.push({ date, status });
      await student.save();
  
      res.status(200).json({ message: "Attendance marked successfully", student });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  // Get Attendance Report
  exports.getAttendanceReport = async (req, res) => {
    try {
      const students = await Student.find().select("name attendance");
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
