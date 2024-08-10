import React from 'react'
import Spinner from "../common/Spinner";
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEES } from "../../queries/employeeQueries";
import EmployeeRow from './EmployeeRow';

const Employees = () => {
    const { loading, error, data } = useQuery(GET_EMPLOYEES);
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div className="flex items-center justify-between">
            <table className="w-full">
              <thead className="border-b border-gray-300 ">
                <tr className="text-black text-left">
                  <th className="py-2">Employee Name</th>
                  <th className="py-2">Contact Number</th>
                  <th className="py-2">Email Address</th>
                  <th className="py-2">Position</th>
                  <th className="py-2">Department</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.employees.map((employee, index) => (
                  <EmployeeRow key={index} employee={employee} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default Employees