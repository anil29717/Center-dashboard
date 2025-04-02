import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [totalStudents, setTotalStudents] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [inactiveStudents, setInactiveStudents] = useState(0);
  const [totalFeesPerMonth, setTotalFeesPerMonth] = useState(0);
  const [totalFeesReceived, setTotalFeesReceived] = useState(0);
  const [animatedTotalStudents, setAnimatedTotalStudents] = useState(0);
  const [animatedActiveStudents, setAnimatedActiveStudents] = useState(0);
  const [animatedInactiveStudents, setAnimatedInactiveStudents] = useState(0);
  const [animatedTotalFees, setAnimatedTotalFees] = useState(0);
  const [animatedFeesReceived, setAnimatedFeesReceived] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        const { totalStudents, activeStudents, inactiveStudents, totalFeesPerMonth, totalFeesReceived } = response.data;
  
        setTotalStudents(totalStudents);
        setActiveStudents(activeStudents);
        setInactiveStudents(inactiveStudents);
        setTotalFeesPerMonth(totalFeesPerMonth);
        setTotalFeesReceived(totalFeesReceived);
  
        // Initialize animated counters to zero
        setAnimatedTotalStudents(0);
        setAnimatedActiveStudents(0);
        setAnimatedInactiveStudents(0);
        setAnimatedTotalFees(0);
        setAnimatedFeesReceived(0);
        
        setIsLoaded(true);
        
        // Start animation after a brief delay
        setTimeout(() => {
          animateNumbers(totalStudents, activeStudents, inactiveStudents, totalFeesPerMonth, totalFeesReceived);
        }, 500);
  
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setIsLoaded(true);
      }
    };
  
    fetchDashboardData();
  }, []);
  
  const animateNumbers = (students, active, inactive, fees, received) => {
    const duration = 2000; // animation duration in ms
    const steps = 60; // number of steps (increased for smoother animation)
    const interval = duration / steps;
    
    let currentStep = 0;
    
    const easeOutQuad = t => t * (2 - t); // Easing function for more natural animation
    
    const timer = setInterval(() => {
      currentStep++;
      const progress = easeOutQuad(currentStep / steps);
      
      setAnimatedTotalStudents(Math.floor(students * progress));
      setAnimatedActiveStudents(Math.floor(active * progress));
      setAnimatedInactiveStudents(Math.floor(inactive * progress));
      setAnimatedTotalFees(Math.floor(fees * progress));
      setAnimatedFeesReceived(Math.floor(received * progress));
      
      if (currentStep === steps) {
        clearInterval(timer);
        // Set final values
        setAnimatedTotalStudents(students);
        setAnimatedActiveStudents(active);
        setAnimatedInactiveStudents(inactive);
        setAnimatedTotalFees(fees);
        setAnimatedFeesReceived(received);
      }
    }, interval);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-gray-100 p-6">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-indigo-500 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-fuchsia-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Content container */}
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div className="mr-4 p-3 bg-violet-800 bg-opacity-30 rounded-lg backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-200">
              Center Dashboard  
            </h1>
          </div>
          <button 
            className="bg-gradient-to-r from-violet-700 to-purple-600 hover:from-violet-800 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center backdrop-blur-sm border border-violet-500 border-opacity-30"
            onClick={handleLogout}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="backdrop-blur-md bg-violet-800 bg-opacity-20 rounded-xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border border-violet-500 border-opacity-30">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-violet-600 bg-opacity-40 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-violet-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-3 text-violet-100">Total Students</h2>
              <p className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-violet-200">
                {animatedTotalStudents}
              </p>
              <div className="flex space-x-8 text-sm">
                <div className="flex flex-col items-center">
                  <span className="font-medium text-violet-200 mb-1">Active</span>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                    <span className="text-xl font-bold">{animatedActiveStudents}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-medium text-violet-200 mb-1">Inactive</span>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <span className="text-xl font-bold">{animatedInactiveStudents}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-violet-800 bg-opacity-20 rounded-xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border border-violet-500 border-opacity-30">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-indigo-600 bg-opacity-40 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-3 text-indigo-100">Total Monthly Fees</h2>
              <div className="flex items-baseline">
                <span className="text-2xl mr-1 text-indigo-200">₹</span>
                <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-blue-200">
                  {animatedTotalFees.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center mt-4 text-indigo-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <p className="text-sm">Expected monthly revenue</p>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-md bg-violet-800 bg-opacity-20 rounded-xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border border-violet-500 border-opacity-30">
            <div className="flex flex-col items-center">
              <div className="p-3 bg-fuchsia-600 bg-opacity-40 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-fuchsia-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-3 text-fuchsia-100">Total Fees Received</h2>
              <div className="flex items-baseline">
                <span className="text-2xl mr-1 text-fuchsia-200">₹</span>
                <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-200 to-pink-200">
                  {animatedFeesReceived.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center mt-4 text-fuchsia-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">Current collection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="flex flex-wrap gap-4 mb-8">
          <h2 className="w-full text-xl font-semibold mb-2 text-violet-200">Quick Actions</h2>
          <button
            className="flex-1 bg-gradient-to-r from-violet-700 to-indigo-700 hover:from-violet-800 hover:to-indigo-800 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 font-medium flex items-center justify-center backdrop-blur-sm border border-violet-500 border-opacity-30"
            onClick={() => navigate("/add-student")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Add Student
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-800 hover:to-blue-800 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 font-medium flex items-center justify-center backdrop-blur-sm border border-indigo-500 border-opacity-30"
            onClick={() => navigate("/add-fees")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Manage Fees
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-fuchsia-700 to-purple-700 hover:from-fuchsia-800 hover:to-purple-800 text-white px-4 py-3 rounded-lg shadow-lg transition-all duration-300 font-medium flex items-center justify-center backdrop-blur-sm border border-fuchsia-500 border-opacity-30"
            onClick={() => navigate("/attendance-reports")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Attendance Reports
          </button>
        </div>

        

        
      </div>
    </div>
  );
};

export default Dashboard;