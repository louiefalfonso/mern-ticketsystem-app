import mongoose from "mongoose";
const Employee = "Employee";
const Project = "Project";

const TicketSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  priority: {
    type: String,
    enum: ["High", "Medium", "Normal", "Low"],
  },
  type: {
    type: String,
    enum: [
      "Service Request",
      "Incident Report",
      "Problem Issues",
      "Replacement Request",
      "Other Changes",
    ],
  },
  status: {
    type: String,
    enum: [
      "Assigned",
      "In Progress",
      "In Review",
      "Blocked",
      "Closed (Won't Fix)",
      "Closed (Fix)",
    ],
  },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: Project },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: Employee },
});

export default mongoose.model("Ticket", TicketSchema);
