import { gql } from "@apollo/client";

const DELETE_TICKET = gql`
  mutation DeleteTicket($id: ID!) {
    deleteTicket(id: $id) {
      id
    }
  }
`;

const ADD_TICKET = gql`
  mutation addTicket(
    $name: String!
    $description: String!
    $status: TicketStatus!
    $priority: TicketPriority!
    $type: TicketType!
    $projectId: ID!
    $employeeId: ID!
  ) {
    addTicket(
      name: $name
      description: $description
      status: $status
      priority: $priority
      type: $type
      projectId: $projectId
      employeeId: $employeeId
    ) {
      name
      description
      priority
      status
      type
      project {
        __typename
        name
        description
        priority
        status
      }
      employee {
        __typename
        name
        email
        number
        position
        department
        status
      }
    }
  }
`;

const UPDATE_TICKET = gql`
  mutation updateTicket(
    $id: ID!
    $name: String!
    $description: String!
    $status: TicketStatus!
    $priority: TicketPriority!
    $type: TicketType!
    $projectId: ID!
    $employeeId: ID!
  ) {
    updateTicket(
      id: $id
      name: $name
      description: $description
      status: $status
      priority: $priority
      type: $type
      projectId: $projectId
      employeeId: $employeeId
    ) {
      name
      description
      priority
      status
      type
      project {
        __typename
        name
        description
        priority
        status
      }
      employee {
        __typename
        name
        email
        number
        position
        department
        status
      }
    }
  }
`;

export { DELETE_TICKET, ADD_TICKET, UPDATE_TICKET };
