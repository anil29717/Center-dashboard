import { useState } from "react";
import { addStudent } from "../api/studentApi";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Phone, MapPin, DollarSign, BookOpen, School, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    address: "",
    fee: "",
    class: "",
    school: "",
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ 
        ...formData, 
        image: file,
        imagePreview: URL.createObjectURL(file) 
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    for (const key in formData) {
      if (key !== "imagePreview") {
        formDataObj.append(key, formData[key]);
      }
    }

    try {
      await addStudent(formDataObj);
      // Create a toast notification instead of alert
      const toastEl = document.createElement('div');
      toastEl.classList.add('fixed', 'bottom-4', 'right-4', 'bg-purple-500', 'text-white', 'p-4', 'rounded-lg', 'shadow-lg', 'flex', 'items-center', 'z-50');
      toastEl.innerHTML = '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Student added successfully!';
      document.body.appendChild(toastEl);
      setTimeout(() => {
        toastEl.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => document.body.removeChild(toastEl), 500);
      }, 3000);
      
      navigate("/students"); // Redirect to student list page
    } catch (error) {
      console.error("Error adding student:", error);
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
        className="w-full max-w-2xl backdrop-blur-lg bg-gray-900/60 rounded-xl shadow-2xl p-8 border border-purple-500/30"
      >
        <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-2xl font-bold mb-8">Student Registration</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image Upload */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center"
          >
            <label className="block text-purple-300 font-medium mb-2 flex items-center">
              <ImageIcon size={20} className="mr-2 text-purple-400" /> Profile Image
            </label>
            <div className="relative w-32 h-32 border-2 border-purple-500/50 rounded-full flex items-center justify-center overflow-hidden group backdrop-blur-sm bg-purple-900/30">
              {formData.imagePreview ? (
                <img src={formData.imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <User size={50} className="text-purple-300" />
              )}
              <div className="absolute inset-0 bg-purple-800/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ImageIcon size={24} className="text-white" />
              </div>
              <input 
                type="file" 
                name="image" 
                onChange={handleFileChange} 
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
            </div>
          </motion.div>

          {/* Name & Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-purple-300 font-medium mb-1 flex items-center">
                <User size={16} className="mr-2 text-purple-400" /> Full Name
              </label>
              <motion.div
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                  placeholder="John Doe"
                  required
                />
              </motion.div>
            </div>
            
            <div>
              <label className="block text-purple-300 font-medium mb-1 flex items-center">
                <Calendar size={16} className="mr-2 text-purple-400" /> Age
              </label>
              <motion.div
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
              >
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter Your Age"
                  required
                />
              </motion.div>
            </div>
          </div>

          {/* Contact Number */}
          <div>
  <label className="block text-purple-300 font-medium mb-1 flex items-center">
    <Phone size={16} className="mr-2 text-purple-400" /> Contact Number
  </label>
  <motion.div whileFocus="focus" whileBlur="blur" variants={inputVariants}>
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={(e) => {
        const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
        handleChange({ target: { name: "phone", value } });
      }}
      className="w-full px-4 py-2 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
      placeholder="(123) 456-7890"
      maxLength="10"
      pattern="\d*" // Allows only digits
      required
    />
  </motion.div>
</div>


          {/* Address */}
          <div>
            <label className="block text-purple-300 font-medium mb-1 flex items-center">
              <MapPin size={16} className="mr-2 text-purple-400" /> Address
            </label>
            <motion.div
              whileFocus="focus"
              whileBlur="blur"
              variants={inputVariants}
            >
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="w-full px-4 py-2 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                placeholder="123 Main St, City, State"
                required
              ></textarea>
            </motion.div>
          </div>

          {/* Fee, Class, and School */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-purple-300 font-medium mb-1 flex items-center">
                <DollarSign size={16} className="mr-2 text-purple-400" /> Fee
              </label>
              <motion.div
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
              >
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                  placeholder="1000"
                  required
                />
              </motion.div>
            </div>
            
            <div>
              <label className="block text-purple-300 font-medium mb-1 flex items-center">
                <BookOpen size={16} className="mr-2 text-purple-400" /> Class
              </label>
              <motion.div
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
              >
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                  placeholder="10th Grade"
                  required
                />
              </motion.div>
            </div>
            
            <div>
              <label className="block text-purple-300 font-medium mb-1 flex items-center">
                <School size={16} className="mr-2 text-purple-400" /> School
              </label>
              <motion.div
                whileFocus="focus"
                whileBlur="blur"
                variants={inputVariants}
              >
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800/60 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                  placeholder="Lincoln High"
                  required
                />
              </motion.div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg shadow-lg transition duration-300 flex items-center justify-center backdrop-blur-sm overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <User size={18} className="mr-2" /> Register Student
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddStudent;