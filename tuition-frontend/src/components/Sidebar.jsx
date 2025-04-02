import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaTachometerAlt, FaUsers, FaUserPlus, FaMoneyBill, FaCalendarCheck, FaChartBar } from "react-icons/fa";
import { LiaSchoolSolid } from "react-icons/lia";

const Sidebar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  // Define menu items with icons
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Student List", path: "/students", icon: <FaUsers /> },
    { name: "Add Student", path: "/add-student", icon: <FaUserPlus /> },
    { name: "Add Fees", path: "/add-fees", icon: <FaMoneyBill /> },
    { name: "Transactions", path: "/transactions", icon: <FaChartBar /> },
    { name: "Mark Attendance", path: "/attendance", icon: <FaCalendarCheck /> },
    { name: "Attendance Report", path: "/attendance-report", icon: <FaChartBar /> },
  ];

  return (
    <div className="fixed top-0 left-0 h-screen w-72 bg-gradient-to-br from-gray-900 to-purple-900 text-white p-5 shadow-xl">
      {/* Sidebar Header */}
      <div className="text-center mb-8">
        <div className="text-3xl mb-2"><LiaSchoolSolid /></div>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-purple-100">
          Aimers Tuition Center
        </h2>
        <div className="mt-2 h-1 w-16 mx-auto bg-gradient-to-r from-violet-400 to-purple-400 rounded-full"></div>
      </div>

      {/* Navigation Links */}
      <ul className="space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={index}>
              <NavLink
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive ? "bg-violet-600 text-white font-medium" : "hover:bg-violet-800/30"
                }`}
              >
                <span className={`text-lg transition-all duration-300 ${isActive ? "text-violet-200" : "text-violet-300"}`}>
                  {item.icon}
                </span>
                <span className={`transition-all duration-300 ${isActive ? "text-white" : "text-violet-100"}`}>
                  {item.name}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
