import axios from "axios";

const API_URL = "https://center-dashboard.onrender.com/api/students"; // Update if backend URL changes

// Fetch all students
export const fetchStudents = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Toggle Active/Inactive status
export const toggleStudentStatus = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/status`);
  return response.data;
};

// Delete a student
export const deleteStudent = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};


// Add a new student
export const addStudent = async (formData) => {
    const response = await axios.post(`${API_URL}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  };
  