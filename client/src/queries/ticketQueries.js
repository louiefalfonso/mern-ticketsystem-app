import { gql } from "@apollo/client";

const GET_TICKETS = gql`
  query GetTickets {
    tickets {
      id
      name
      description
      priority
      type
      status
      project {
        __typename
        id
        name
        description
        priority
        status
      }
      employee {
        __typename
        id
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

const GET_TICKET = gql`
  query GetTicket($id: ID!) {
    ticket(id: $id) {
      id
      name
      description
      priority
      type
      status
      project {
        __typename
        id
        name
        description
        priority
        status
      }
      employee {
        __typename
        id
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

export { GET_TICKETS, GET_TICKET };
