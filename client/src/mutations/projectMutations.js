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
    $employeeId: ID!
  ) {
    addProject(
      name: $name
      description: $description
      priority: $priority
      status: $status
      employeeId: $employeeId
    ) {
      name
      description
      priority
      status
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

const UPDATE_PROJECT = gql`
  mutation updateProject(
    $id: ID!
    $name: String!
    $description: String!
    $status: ProjectStatus!
    $priority: ProjectPriority!
    $employeeId: ID!
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      priority: $priority
      status: $status
      employeeId: $employeeId
    ) {
      name
      description
      priority
      status
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

export { DELETE_PROJECT, ADD_PROJECT, UPDATE_PROJECT };
