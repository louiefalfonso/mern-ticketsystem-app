import { gql } from "@apollo/client";

const GET_TICKETS = gql`
  query getTickets {
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
      user {
        __typename
        id
        name
        email
        title
        role }
      }  
    }
  }
`;

const GET_TICKET = gql`
  query getTicket($id: ID!) {
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
      user {
        __typename
        id
        name
        email
        title
        role }
    }
  }
`;
export { GET_TICKETS, GET_TICKET };
