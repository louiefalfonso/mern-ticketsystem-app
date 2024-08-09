import { gql } from "@apollo/client";

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      id
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation addEmployee(
    $name: String!
    $email: String!
    $number: String!
    $position: String!
    $department: String!
    $status: EmployeeStatus!
  ) {
    addEmployee(
      name: $name
      email: $email
      number: $number
      position: $position
      department: $department
      status: $status
    ) {
      id
      name
      email
      number
      position
      department
      status
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $id: ID!
    $name: String!
    $email: String!
    $number: String!
    $position: String!
    $department: String!
    $status: EmployeeStatus!
  ) {
    updateEmployee(
      name: $name
      email: $email
      number: $number
      position: $position
      department: $department
      status: $status
    ) {
      id
      name
      email
      number
      position
      department
      status
    }
  }
`;

export { DELETE_EMPLOYEE, ADD_EMPLOYEE, UPDATE_EMPLOYEE };