import { gql } from "@apollo/client";

const GET_EMPLOYEES = gql`
  query getEmployees {
    employees {
      id
      name
      email
      title
      role
      isAdmin
      isActive
    }
  }
`;

const GET_EMPLOYEE = gql`
  query getEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      email
      title
      role
      isAdmin
      isActive
    }
  }
`;


export { GET_EMPLOYEES, GET_EMPLOYEE };