import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_EMPLOYEE } from "../../queries/employeeQueries";
import Spinner from "../common/Spinner";

const EmployeeRow = ({employee}) => {
    const { loading, error, data } = useQuery(GET_EMPLOYEE, {
      variables: { id: employee.id },
      skip: true,
    });

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      <React.Fragment>
        <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{employee.name}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{employee.number}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{employee.email}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{employee.position}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{employee.department}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{employee.status}</p>
            </div>
          </td>
        </tr>
      </React.Fragment>
    </>
  );
}

export default EmployeeRow