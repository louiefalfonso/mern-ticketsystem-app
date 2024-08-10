import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} from "graphql";

//mongoose models
import Ticket from "../models/Ticket.js";
import Project from "../models/Project.js";
import Employee from "../models/Employee.js";

// Types
const EmployeeType = new GraphQLObjectType({
  name: "Employee",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    number: { type: GraphQLString },
    position: { type: GraphQLString },
    department: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    priority: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    employee: {
      type: EmployeeType,
      resolve: (parent, args) => {
        return Employee.findById(parent.employeeId);
      },
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      number: { type: GraphQLString },
      position: { type: GraphQLString },
      department: { type: GraphQLString },
      status: { type: GraphQLString },
    },
  }),
});

const TicketType = new GraphQLObjectType({
  name: "Ticket",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    priority: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
    project: { 
      type: ProjectType,
      resolve: (parent, args) => {
        return Project.findById(parent.projectId);
      },
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      priority: { type: GraphQLString },
      status: { type: GraphQLString },
    },
    employee: {
      type: EmployeeType,
      resolve: (parent, args) => {
        return Employee.findById(parent.employeeId);
      },
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      number: { type: GraphQLString },
      position: { type: GraphQLString },
      department: { type: GraphQLString },
      status: { type: GraphQLString },
    },
  }),
});

//Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    employee: {
      type: EmployeeType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Employee.findById(args.id);
      },
    },
    employees: {
      type: new GraphQLList(EmployeeType),
      resolve: (parent, args) => {
        return Employee.find();
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Project.findById(args.id);
      },
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve: (parent, args) => {
        return Project.find();
      },
    },
    ticket: {
      type: TicketType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Ticket.findById(args.id);
      },
    },
    tickets: {
      type: new GraphQLList(TicketType),
      resolve: (parent, args) => {
        return Ticket.find();
      },
    },
  },
});

//Enums
const EmployeeStatusEnum = new GraphQLEnumType({
  name: "EmployeeStatus",
  values: {
    ACTIVE: { value: "Active" },
    INACTIVE: { value: "In Active" },
  },
});

const ProjectStatusEnum = new GraphQLEnumType({
  name: "ProjectStatus",
  values: {
    NEW: { value: "Not Started" },
    PROGRESS: { value: "In Progress" },
    COMPLETED: { value: "Completed" },
  },
});

const ProjectPriorityEnum = new GraphQLEnumType({
  name: "ProjectPriority",
  values: {
    LOW: { value: "Low" },
    NORMAL: { value: "Normal" },
    MEDIUM: { value: "Medium" },
    HIGH: { value: "High" },
  },
});

const TicketPriorityEnum = new GraphQLEnumType({
  name: "TicketPriority",
  values: {
    LOW: { value: "Low" },
    NORMAL: { value: "Normal" },
    MEDIUM: { value: "Medium" },
    HIGH: { value: "High" },
  },
});

const TicketTypeEnum = new GraphQLEnumType({
  name: "TicketType",
  values: {
    SERVICE: { value: "Service Request" },
    INCIDENT: { value: "Incident Report" },
    PROBLEM: { value: "Problem Issues" },
    REPLACEMENT: { value: "Replacement Request" },
    CHANGE: { value: "Other Changes" },
  },
});

const TicketStatusEnum = new GraphQLEnumType({
  name: "TicketStatus",
  values: {
    ASSIGNED: { value: "Assigned" },
    INPROGRESS: { value: "In Progress" },
    INREVIEW: { value: "In Review" },
    CLOSEDWFX: { value: "Closed (Won't Fix)" },
    CLOSED: { value: "Closed" },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: ProjectStatusEnum,
          defaultValue: "NEW",
        },
        priority: {
          type: ProjectPriorityEnum,
          defaultValue: "NORMAL",
        },
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          priority: args.priority,
          employeeId: args.employeeId,
        });
        return project.save();
      },
    },
    deleteProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Project.findByIdAndDelete(args.id);
      },
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: ProjectStatusEnum,
          defaultValue: "NEW",
        },
        priority: {
          type: ProjectPriorityEnum,
          defaultValue: "NORMAL",
        },
        employeeId: { type: GraphQLID },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
              priority: args.priority,
              employeeId: args.employeeId,
            },
          },
          { new: true }
        );
      },
    },
    addTicket: {
      type: TicketType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        priority: {
          type: TicketPriorityEnum,
          defaultValue: "NORMAL",
        },
        type: {
          type: TicketTypeEnum,
          defaultValue: "SERVICE",
        },
        status: {
          type: TicketStatusEnum,
          defaultValue: "ASSIGNED",
        },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const ticket = new Ticket({
          name: args.name,
          description: args.description,
          priority: args.priority,
          type: args.type,
          status: args.status,
          projectId: args.projectId,
          employeeId: args.employeeId,
        });
        return ticket.save();
      },
    },
    deleteTicket: {
      type: TicketType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Ticket.findByIdAndDelete(args.id);
      },
    },
    updateTicket: {
      type: TicketType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        priority: {
          type: TicketPriorityEnum,
          defaultValue: "NORMAL",
        },
        type: {
          type: TicketTypeEnum,
          defaultValue: "SERVICE",
        },
        status: {
          type: TicketStatusEnum,
          defaultValue: "ASSIGNED",
        },
        projectId: { type: new GraphQLNonNull(GraphQLID) },
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Ticket.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              priority: args.priority,
              type: args.type,
              status: args.status,
              projectId: args.projectId,
              employeeId: args.employeeId,
            },
          },
          { new: true }
        );
      },
    },
    addEmployee: {
      type: EmployeeType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        number: { type: new GraphQLNonNull(GraphQLString) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: EmployeeStatusEnum,
          defaultValue: "ACTIVE",
        },
      },
      resolve: (parent, args) => {
        const employee = new Employee({
          name: args.name,
          email: args.email,
          number: args.number,
          position: args.position,
          department: args.department,
          status: args.status,
        });
        return employee.save();
      },
    },
    deleteEmployee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Employee.findByIdAndDelete(args.id);
      },
    },
    updateEmployee: {
      type: EmployeeType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        number: { type: GraphQLString },
        position: { type: GraphQLString },
        department: { type: GraphQLString },
        status: {
          type: EmployeeStatusEnum,
          defaultValue: "ACTIVE",
        },
      },
      resolve(parent, args) {
        return Employee.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
              number: args.number,
              position: args.position,
              department: args.department,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});



const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});

export default schema;