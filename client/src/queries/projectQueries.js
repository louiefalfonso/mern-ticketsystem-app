import { gql } from "@apollo/client";

const GET_PROJECTS = gql`
  query getProjects {
    projects {
      id
      name
      description
      date
      priority
      status
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      date
      priority
      status
    }
  }
`;




export { GET_PROJECTS, GET_PROJECT };