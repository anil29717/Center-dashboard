import React, { useEffect, useState } from "react";
import { fetchStudents, toggleStudentStatus, deleteStudent } from "../api/studentApi";
import { 
  Users, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  School, 
  GraduationCap, 
  Circle, 
  DollarSign, 
  Info
} from "lucide-react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await fetchStudents();
      setStudents(data || []);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching students:", error);
      setIsLoaded(true);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleStudentStatus(id);
      loadStudents();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(selectedStudent?._id === student._id ? null : student);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950 text-gray-100 p-6">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-fuchsia-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Content container */}
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center mb-6">
          <div className="p-3 bg-violet-800 bg-opacity-30 rounded-lg backdrop-blur-sm mr-4">
            <Users className="h-6 w-6 text-violet-300" />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-200">
            Student List
          </h2>
        </div>

        <div className="backdrop-blur-md bg-violet-800 bg-opacity-20 rounded-xl shadow-xl p-6 border border-violet-500 border-opacity-30">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-violet-500 border-opacity-30">
                  <th className="p-3 text-left text-violet-300 font-semibold">Image</th>
                  <th className="p-3 text-left text-violet-300 font-semibold">Name</th>
                  <th className="p-3 text-left text-violet-300 font-semibold">Phone</th>
                  <th className="p-3 text-left text-violet-300 font-semibold">Class</th>
                  <th className="p-3 text-left text-violet-300 font-semibold">School</th>
                  <th className="p-3 text-left text-violet-300 font-semibold">Status</th>
                  <th className="p-3 text-left text-violet-300 font-semibold">Monthly Fees</th>
                  <th className="p-3 text-left text-violet-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((student) => (
                    <React.Fragment key={student._id}>
                      {/* Student Row */}
                      <tr
                        className={`border-b border-violet-500 border-opacity-20 cursor-pointer transition-colors hover:bg-violet-700 hover:bg-opacity-20 ${
                          selectedStudent?._id === student._id ? "bg-violet-700 bg-opacity-20" : ""
                        }`}
                        onClick={() => handleStudentClick(student)}
                      >
                        <td className="p-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-violet-400 border-opacity-30">
                            <img
                              src={student.image || "https://via.placeholder.com/40"}
                              alt={student.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="p-3 font-medium">{student.name}</td>
                        <td className="p-3">{student.phone}</td>
                        <td className="p-3">{student.class}</td>
                        <td className="p-3">{student.school}</td>
                        <td className="p-3">
                          <button
                            className={`px-3 py-1 text-white rounded-full flex items-center ${
                              student.status === "active" 
                                ? "bg-gradient-to-r from-green-500 to-emerald-600" 
                                : "bg-gradient-to-r from-red-500 to-pink-600"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStatus(student._id);
                            }}
                          >
                            <Circle className="h-3 w-3 mr-1" fill={student.status === "active" ? "#10b981" : "#ef4444"} stroke="none" />
                            <span>{student.status === "active" ? "Active" : "Inactive"}</span>
                          </button>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1 text-violet-300" />
                            <span>₹{student.fee}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <button
                              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white p-2 rounded-lg transition-all duration-300 flex items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(student._id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button
                              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white p-2 rounded-lg transition-all duration-300 flex items-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStudentClick(student);
                              }}
                            >
                              {selectedStudent?._id === student._id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Student Details Row */}
                      {selectedStudent?._id === student._id && (
                        <tr className="bg-indigo-800 bg-opacity-20">
                          <td colSpan="8" className="p-4">
                            <div className="rounded-lg bg-indigo-900 bg-opacity-30 p-4 backdrop-blur-sm border border-indigo-500 border-opacity-30">
                              <h3 className="text-lg font-bold text-indigo-200 mb-3 flex items-center">
                                <Info className="h-5 w-5 mr-2" />
                                Student Details
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center">
                                  <Phone className="h-4 w-4 mr-2 text-indigo-300" />
                                  <span className="text-indigo-100 font-medium">Phone:</span>
                                  <span className="ml-2">{student.phone}</span>
                                </div>
                                <div className="flex items-center">
                                  <GraduationCap className="h-4 w-4 mr-2 text-indigo-300" />
                                  <span className="text-indigo-100 font-medium">Class:</span>
                                  <span className="ml-2">{student.class}</span>
                                </div>
                                <div className="flex items-center">
                                  <School className="h-4 w-4 mr-2 text-indigo-300" />
                                  <span className="text-indigo-100 font-medium">School:</span>
                                  <span className="ml-2">{student.school}</span>
                                </div>
                                <div className="flex items-center">
                                  <Circle 
                                    className="h-4 w-4 mr-2" 
                                    fill={student.status === "active" ? "#10b981" : "#ef4444"} 
                                    stroke="none" 
                                  />
                                  <span className="text-indigo-100 font-medium">Status:</span>
                                  <span className="ml-2 capitalize">{student.status}</span>
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2 text-indigo-300" />
                                  <span className="text-indigo-100 font-medium">Monthly Fee:</span>
                                  <span className="ml-2">₹{student.fee}</span>
                                </div>
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2 text-indigo-300" />
                                  <span className="text-indigo-100 font-medium">Total Fees Received:</span>
                                  <span className="ml-2">₹{student.fees?.reduce((total, record) => total + (record.amount || 0), 0) || 0}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-4 text-center">
                      <div className="flex flex-col items-center justify-center py-8 text-violet-300">
                        <Users className="h-12 w-12 mb-3 opacity-50" />
                        <p>No students found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;