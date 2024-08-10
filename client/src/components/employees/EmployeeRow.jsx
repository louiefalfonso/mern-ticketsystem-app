import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { BiSolidEditAlt } from "react-icons/bi";
import { GET_EMPLOYEE } from "../../queries/employeeQueries";
import Spinner from "../common/Spinner";
import UpdateEmployee from "./UpdateEmployee";

const EmployeeRow = ({ employee }) => {
  const [open, setOpen] = useState(false);
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
          <td className="py-2">
            <div className="flex items-center gap-2">
              <button
                className="text-slate-950 hover:text-slate-950"
                onClick={() => setOpen(true)}
              >
                <BiSolidEditAlt />
              </button>
            </div>
          </td>
        </tr>
        {open && (
          <tr>
            <td colSpan={7}>
              <UpdateEmployee employee={employee} setOpen={setOpen} open={open} />
            </td>
          </tr>
        )}
      </React.Fragment>
    </>
  );
};

export default EmployeeRow;
