import mongoose from "mongoose";
const User = "User";
const Project = "Project";

const TicketSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  date: { type: Date, default: new Date() },
  priority: {
    type: String,
    enum: ["High", "Medium", "Normal", "Low"],
  },
  type: {
    type: String,
    enum: [
      "Service Request",
      "Incident Ticket",
      "Problem Ticket",
      "Change Request Ticket",
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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
});

export default mongoose.model("Ticket", TicketSchema);
