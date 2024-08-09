import mongoose from "mongoose";
const Employee = "Employee";

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Normal", "Low"],
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: Employee },
});

export default mongoose.model("Project", ProjectSchema);
