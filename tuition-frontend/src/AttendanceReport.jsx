import { useState, useEffect } from "react";
import axios from "axios";
import { CalendarDays, CheckCircle, XCircle, Minus, Loader } from "lucide-react";

const AttendanceReport = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/students/attendance-report")
      .then((response) => {
        setAttendanceData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching attendance report:", error);
        setLoading(false);
      });
  }, []);

  const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

  return (
    <div className="bg-gradient-to-br from-gray-900 to-purple-900 w-full h-screen pt-30 pb-20">
      <div className="relative max-w-3xl mx-auto  p-6 bg-gradient-to-br from-gray-900 to-purple-900 w-full h-full shadow-xl rounded-xl border border-violet-700/30 backdrop-blur-md animate-fadeIn overflow-hidden">
        {/* Glassmorphism effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/5 rounded-xl backdrop-blur-sm z-0"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-400/10 rounded-full filter blur-xl z-0"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full filter blur-xl z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-center text-violet-100 mb-8 flex items-center justify-center gap-2 animate-pulseLight">
            <CalendarDays size={24} className="text-violet-300" />
            Attendance Report
          </h2>

          {/* Month Selector */}
          <div className="mb-8 flex items-center justify-center gap-3 animate-fadeIn">
            <label className="font-medium text-violet-200">Select Month:</label>
            <div className="relative overflow-hidden rounded-lg border border-violet-600/50 bg-violet-900/40 backdrop-blur-sm transition-all duration-300 hover:border-violet-500 focus-within:ring-2 focus-within:ring-violet-400">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="border-none py-2 px-4 bg-transparent text-violet-100 focus:outline-none appearance-none cursor-pointer pr-10"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1} className="bg-violet-900 text-violet-100">
                    {new Date(2024, i).toLocaleString("default", { month: "long" })}
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

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center">
                <Loader className="h-8 w-8 text-violet-300 animate-spin" />
                <p className="mt-4 text-violet-200">Loading attendance data...</p>
              </div>
            </div>
          ) : attendanceData.length === 0 ? (
            <div className="text-center py-10 text-violet-200">
              No attendance data available
            </div>
          ) : (
            <div className="space-y-6">
              {attendanceData.map((student) => {
                const year = new Date().getFullYear();
                const daysInMonth = getDaysInMonth(selectedMonth, year);

                const attendanceMap = {};
                student.attendance.forEach((record) => {
                  const date = new Date(record.date);
                  if (date.getMonth() + 1 === selectedMonth) {
                    attendanceMap[date.getDate()] = record.status;
                  }
                });

                return (
                  <div
                    key={student._id}
                    className="mb-6 p-4 rounded-lg bg-violet-800/30 border border-violet-600/30 backdrop-blur-sm shadow-lg transition-all duration-300 hover:bg-violet-800/40 animate-fadeIn"
                  >
                    <h3 className="font-semibold text-lg text-violet-100 mb-4 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-violet-400 mr-2"></div>
                      {student.name}
                    </h3>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                      {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = i + 1;
                        const status = attendanceMap[day];

                        let bgColor = "bg-violet-900/30";
                        let statusComponent = <Minus className="text-violet-400/60" size={18} />;

                        if (status === "Present") {
                          bgColor = "bg-green-900/20";
                          statusComponent = <CheckCircle className="text-green-400" size={18} />;
                        } else if (status === "Absent") {
                          bgColor = "bg-red-900/20";
                          statusComponent = <XCircle className="text-red-400" size={18} />;
                        }

                        return (
                          <div
                            key={day}
                            className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg ${bgColor} border border-violet-700/30 backdrop-blur-sm shadow-sm hover:scale-105 transition-all duration-300 transform group`}
                          >
                            <span className="text-xs font-medium text-violet-200">{day}</span>
                            <div className="transition-transform duration-300 group-hover:scale-110">
                              {statusComponent}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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

export default AttendanceReport;