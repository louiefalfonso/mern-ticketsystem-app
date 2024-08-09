import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  number: {
    type: String,
  },
  position: {
    type: String,
  },
  department: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Active", "In Active"],
  },
});

export default mongoose.model("Employee", EmployeeSchema);
