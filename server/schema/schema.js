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

// Types
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    date: { type: GraphQLString },
    priority: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

const TicketType = new GraphQLObjectType({
  name: "Ticket",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    priority: { type: GraphQLString },
    type: { type: GraphQLString },
    status: { type: GraphQLString },
    userId: { type: GraphQLID },
    projectId: { type: GraphQLID },
  }),
});

//Queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
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
    }
  },
});

//Enums
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
    INCIDENT: { value: "Incident Ticket" },
    PROBLEM: { value: "Problem Ticket" },
    CHANGE: { value: "Change Request Ticket" },
  },
});

const TicketStatusEnum = new GraphQLEnumType({
  name: "TicketStatus",
  values: {
    ASSIGNED: { value: "Assigned" },
    INPROGRESS: { value: "In Progress" },
    INREVIEW: { value: "In Review" },
    CLOSEDWFX: { value: "Closed (Won't Fix)" },
    CLOSED: { value: "Closed (Won't Fix)" },
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
        date: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        status: {
          type: ProjectStatusEnum,
          defaultValue: "NEW",
        },
        priority: {
          type: ProjectPriorityEnum,
          defaultValue: "NORMAL",
        },
      },
      resolve: (parent, args) => {
        const project = new Project({
          name: args.name,
          date: args.date,
          description: args.description,
          status: args.status,
          priority: args.priority,
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
        date: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: ProjectStatusEnum,
          defaultValue: "NEW",
        },
        priority: {
          type: ProjectPriorityEnum,
          defaultValue: "NORMAL",
        },
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              date: args.date,
              description: args.description,
              status: args.status,
              priority: args.priority,
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
        date: { type: new GraphQLNonNull(GraphQLString) },
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
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        const ticket = new Ticket({
          name: args.name,
          description: args.description,
          date: args.date,
          priority: args.priority,
          type: args.type,
          status: args.status,
          projectId: args.projectId,
          userId: args.userId,
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
        date: { type: GraphQLString },
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
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Ticket.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              date: args.date,
              description: args.description,
              priority: args.priority,
              type: args.type,
              status: args.status,
              projectId: args.projectId,
              userId: args.userId,
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