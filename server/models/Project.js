import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  name: { 
    type: String, 
  },
  description: { 
    type: String, 
  },
  date: { 
    type: Date, 
    default: new Date() },
  priority: {
    type: String,
    enum: ["High", "Medium", "Normal", "Low"],
  },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
  },
});

export default mongoose.model("Project", ProjectSchema);
