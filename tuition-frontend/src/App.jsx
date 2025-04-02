import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import AddStudent from "./pages/AddStudent";
import AddFees from "./pages/AddFees";
import Attendance from "./pages/Attendance";
import AttendanceReport from "./AttendanceReport";
import Transactions from "./pages/Transactions";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar should only be visible when logged in */}
        {localStorage.getItem("user") && <Sidebar />}

        {/* Main Content */}
        <div className={`flex-1 ${localStorage.getItem("user") ? "ml-72" : ""}`}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
            <Route path="/students" element={<PrivateRoute element={<StudentList />} />} />
            <Route path="/add-student" element={<PrivateRoute element={<AddStudent />} />} />
            <Route path="/add-fees" element={<PrivateRoute element={<AddFees />} />} />
            <Route path="/attendance" element={<PrivateRoute element={<Attendance />} />} />
            <Route path="/attendance-report" element={<PrivateRoute element={<AttendanceReport />} />} />
            <Route path="/transactions" element={<PrivateRoute element={<Transactions />} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
