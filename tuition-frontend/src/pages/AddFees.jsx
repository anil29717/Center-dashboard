import { useState, useEffect } from "react";
import axios from "axios";
import { User, DollarSign, Calendar, CreditCard, Check, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const AddFees = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [lastPaidDate, setLastPaidDate] = useState("");
  const [month, setMonth] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Cash");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("https://center-dashboard.onrender.com/api/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to load students. Please try again later.");
      }
    };

    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://center-dashboard.onrender.com/api/students/add-fees",
        {
          studentName: selectedStudent,
          amount,
          startDate,
          lastPaidDate,
          month,
          paymentMode,
        }
      );

      // Create a toast notification
      const toastEl = document.createElement('div');
      toastEl.classList.add('fixed', 'bottom-4', 'right-4', 'bg-gradient-to-r', 'from-purple-500', 'to-pink-500', 'text-white', 'p-4', 'rounded-lg', 'shadow-lg', 'flex', 'items-center', 'z-50');
      toastEl.innerHTML = '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Fees added successfully!';
      document.body.appendChild(toastEl);
      setTimeout(() => {
        toastEl.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => document.body.removeChild(toastEl), 500);
      }, 3000);

      // Reset form
      setSelectedStudent("");
      setAmount("");
      setStartDate("");
      setLastPaidDate("");
      setMonth("");
      setPaymentMode("Cash");

    } catch (error) {
      setError(error.response ? error.response.data.message : "Failed to add fees. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-purple-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg backdrop-blur-lg bg-gray-900/60 rounded-xl shadow-2xl p-8 border border-purple-500/30"
      >
        <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-2xl font-bold mb-8">
          Fee Management
        </h2>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center text-red-300"
          >
            <AlertTriangle size={18} className="mr-2 text-red-400" />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Student Selection */}
          <div>
            <label className="block text-purple-300 font-medium mb-2 flex items-center">
              <User size={16} className="mr-2 text-purple-400" /> Student
            </label>
            <motion.div
              whileFocus="focus"
              whileBlur="blur"
              variants={inputVariants}
              className="relative"
            >
              <div className="absolute left-3 top-3 text-purple-400 pointer-events-none">
                <User size={18} />
              </div>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                required
                className="w-full pl-10 p-3 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white backdrop-blur-sm transition-all duration-300 appearance-none"
              >
                <option value="" className="bg-gray-800">Select a Student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id} className="bg-gray-800">
                    {student.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Fees Amount */}
          <div>
            <label className="block text-purple-300 font-medium mb-2 flex items-center">
              <DollarSign size={16} className="mr-2 text-purple-400" /> Amount
            </label>
            <motion.div
              whileFocus="focus"
              whileBlur="blur"
              variants={inputVariants}
              className="relative"
            >
              <div className="absolute left-3 top-3 text-purple-400 pointer-events-none">
                <DollarSign size={18} />
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="Enter Fees Amount"
                className="w-full pl-10 p-3 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-purple-300 font-medium mb-2 flex items-center">
              <Calendar size={16} className="mr-2 text-purple-400" /> Start Date
            </label>
            <motion.div
              whileFocus="focus"
              whileBlur="blur"
              variants={inputVariants}
              className="relative"
            >
              <div className="absolute left-3 top-3 text-purple-400 pointer-events-none">
                <Calendar size={18} />
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full pl-10 p-3 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* Last Paid Date */}
          <div>
            <label className="block text-purple-300 font-medium mb-2 flex items-center">
              <CreditCard size={16} className="mr-2 text-purple-400" /> Last Paid Date
            </label>
            <motion.div
              whileFocus="focus"
              whileBlur="blur"
              variants={inputVariants}
              className="relative"
            >
              <div className="absolute left-3 top-3 text-purple-400 pointer-events-none">
                <CreditCard size={18} />
              </div>
              <input
                type="date"
                value={lastPaidDate}
                onChange={(e) => setLastPaidDate(e.target.value)}
                required
                className="w-full pl-10 p-3 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
              />
            </motion.div>
          </div>

          {/* Month */}
          <div className="flex justify-between">
            <div>
              <label className="block text-purple-300 font-medium mb-2 flex items-center">
                <Check size={16} className="mr-2 text-purple-400" /> Month
              </label>
              <motion.div
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
                className="relative"
              >
                <div className="absolute left-3 top-3 text-purple-400 pointer-events-none">
                  <Check size={18} />
                </div>
                <input
                  type="text"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  required
                  placeholder="Enter Month (e.g., March 2025)"
                  className="w-full pl-10 p-3 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                />
              </motion.div>
            </div>
            <div>
              <label className="block text-purple-300 font-medium mb-2 flex items-center">
                <Check size={16} className="mr-2 text-purple-400" /> Payment Mode
              </label>
              <motion.div
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
                className="relative"
              >
                <div className="absolute left-3 top-3 text-purple-400 pointer-events-none">
                  <Check size={18} />
                </div>
                <select
                  type="text"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  required
                  placeholder="Payment Mode"
                  className="w-full p-3 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                >
                  <option value="Cash">Cash</option>
                  <option value="Online">Online</option>
                  </select>
              </motion.div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg shadow-lg transition duration-300 flex items-center justify-center backdrop-blur-sm overflow-hidden relative group mt-8"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <CreditCard size={18} className="mr-2" />
                Submit Payment
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFees;