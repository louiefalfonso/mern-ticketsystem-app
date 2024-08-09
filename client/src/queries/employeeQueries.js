import { gql } from "@apollo/client";

const GET_EMPLOYEES = gql`
  query getEmployees {
    employees {
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

const GET_EMPLOYEE = gql`
  query getEmployee($id: ID!) {
    employee(id: $id) {
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


export { GET_EMPLOYEES, GET_EMPLOYEE };