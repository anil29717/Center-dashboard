const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  image: { type: String, required: true }, // Cloudinary URL
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  fee: { type: Number, required: true }, // Monthly fees
  class: { type: String, required: true },
  school: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  fees: [{
    amount: { type: Number },
    month: { type: String },
    date: { type: Date },
    startDate: { type: Date },
    lastPaidDate: { type: Date },
    paymentMode: { type: String, enum: ["Cash", "Online"], required: true },
  }],
  
  attendance: [
    {
      date: { type: Date, required: true },
      status: { type: String, enum: ["Present", "Absent"], required: true }
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model("Student", StudentSchema);
