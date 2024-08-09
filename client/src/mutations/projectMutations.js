import { gql } from "@apollo/client";

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $priority: ProjectPriority!
  ) {
    addProject(
      name: $name
      description: $description
      priority: $priority
      status: $status
    ) {
      id
      name
      description
      priority
      status
    }
  }
`;

const UPDATE_PROJECT = gql`
  mutation addProject(
    $id: ID!
    $name: String!
    $date: String!
    $description: String!
    $status: ProjectStatus!
    $priority: ProjectPriority!
  ) {
    updateProject(
      name: $name
      description: $description
      priority: $priority
      status: $status
    ) {
      id
      name
      description
      priority
      status
    }
  }
`;



export { DELETE_PROJECT, ADD_PROJECT, UPDATE_PROJECT };