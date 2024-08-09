import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      priority
      status
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

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      priority
      status
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




export { GET_PROJECTS, GET_PROJECT };