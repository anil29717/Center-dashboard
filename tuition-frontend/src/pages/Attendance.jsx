import { useState, useEffect } from "react";
import axios from "axios";
import { User, ClipboardList, CheckCircle, XCircle } from "lucide-react";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [status, setStatus] = useState("");
  const [existingStatus, setExistingStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const fetchAttendanceStatus = async (studentId) => {
    if (!studentId) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/${studentId}/attendance`
      );

      const attendanceRecords = response.data.attendance;
      const today = new Date().toISOString().split("T")[0];

      const todayAttendance = attendanceRecords.find(
        (record) => record.date.split("T")[0] === today
      );

      if (todayAttendance) {
        setExistingStatus(todayAttendance.status);
        setStatus(todayAttendance.status); // Pre-fill the dropdown
      } else {
        setExistingStatus("Not Marked");
        setStatus(""); // Reset status selection
      }
    } catch (error) {
      console.error("Error fetching attendance status:", error);
      setExistingStatus("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/students/mark-attendance", {
        studentId: selectedStudent,
        status,
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      fetchAttendanceStatus(selectedStudent); // Refresh attendance after marking
    } catch (error) {
      console.error("Error marking attendance:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-purple-900 w-full h-screen items-center pt-30">
      <div className="relative max-w-lg mx-auto  p-8 bg-gradient-to-br from-gray-900 to-purple-900 shadow-xl rounded-xl border border-violet-700/30 backdrop-blur-md animate-fadeIn">
        {/* Glassmorphism effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-xl backdrop-blur-sm z-0"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-400/10 rounded-full filter blur-xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/10 rounded-full filter blur-xl z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-center text-violet-100 mb-8 animate-pulseLight">
            Mark Attendance
          </h2>

          {showSuccess && (
            <div className="absolute top-0 left-0 right-0 bg-green-500/80 text-white p-3 rounded-t-xl text-center animate-slideDown">
              Attendance marked successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Select Student */}
            <div className="relative transition-all duration-300 hover:translate-y-1">
              <label className="block font-medium text-violet-200 mb-2">Select Student</label>
              <div className="relative flex items-center overflow-hidden rounded-lg border border-violet-600/50 bg-violet-900/40 backdrop-blur-sm transition-all duration-300 hover:border-violet-500 focus-within:ring-2 focus-within:ring-violet-400">
                <User className="absolute left-3 text-violet-300" size={20} />
                <select
                  value={selectedStudent}
                  onChange={(e) => {
                    setSelectedStudent(e.target.value);
                    fetchAttendanceStatus(e.target.value);
                  }}
                  required
                  className="w-full p-3 pl-10 bg-transparent text-violet-100 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="bg-violet-900 text-violet-100">Select a Student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id} className="bg-violet-900 text-violet-100">
                      {student.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Existing Attendance Status */}
            {selectedStudent && (
              <div className="relative transition-all duration-300 animate-fadeIn">
                <label className="block font-medium text-violet-200 mb-2">Existing Status</label>
                <div className="flex items-center p-3 rounded-lg bg-violet-800/40 border border-violet-600/50 backdrop-blur-sm">
                  <ClipboardList className="mr-2 text-violet-300" size={20} />
                  <span className={`
                  ${existingStatus === "Present" ? "text-green-300" :
                      existingStatus === "Absent" ? "text-red-300" : "text-violet-200"}
                `}>
                    {isLoading ?
                      <span className="inline-flex items-center">
                        <svg className="animate-spin mr-2 h-4 w-4 text-violet-300" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                      </span> :
                      existingStatus
                    }
                  </span>
                </div>
              </div>
            )}

            {/* Attendance Status Dropdown */}
            <div className="relative transition-all duration-300 hover:translate-y-1">
              <label className="block font-medium text-violet-200 mb-2">Attendance Status</label>
              <div className="relative flex items-center overflow-hidden rounded-lg border border-violet-600/50 bg-violet-900/40 backdrop-blur-sm transition-all duration-300 hover:border-violet-500 focus-within:ring-2 focus-within:ring-violet-400">
                {status === "Present" ? (
                  <CheckCircle className="absolute left-3 text-green-400" size={20} />
                ) : status === "Absent" ? (
                  <XCircle className="absolute left-3 text-red-400" size={20} />
                ) : (
                  <ClipboardList className="absolute left-3 text-violet-300" size={20} />
                )}
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                  className="w-full p-3 pl-10 bg-transparent text-violet-100 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="" className="bg-violet-900 text-violet-100">Select Status</option>
                  <option value="Present" className="bg-violet-900 text-violet-100">Present</option>
                  <option value="Absent" className="bg-violet-900 text-violet-100">Absent</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="h-5 w-5 text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white p-3 rounded-lg font-medium hover:from-violet-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center shadow-lg shadow-purple-700/30 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden relative"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-400/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700 ease-out"></span>
              <ClipboardList size={20} className="mr-2" />
              {isLoading ?
                <span className="flex items-center">
                  <svg className="animate-spin mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span> :
                "Mark Attendance"
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Add these CSS keyframes and utility classes to your global CSS or tailwind config
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes pulseLight { 0%, 100% { opacity: 1; } 50% { opacity: 0.8; } }
// @keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }
// .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
// .animate-pulseLight { animation: pulseLight 3s infinite; }
// .animate-slideDown { animation: slideDown 0.3s ease-out; }

export default Attendance;