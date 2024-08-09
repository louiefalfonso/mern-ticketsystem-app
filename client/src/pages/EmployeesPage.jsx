import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import AddNewEmployee from "../components/employees/AddNewEmployee";
import Employees from "../components/employees/Employees";

const EmployeesPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-4 w-full bg-white p-4 rounded shadow-sm">
        <Title title="Employee Lists" />
        {
          <Button
            label="Add New Employee"
            onClick={() => setOpen(true)}
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-black text-white rounded-md 2xl:py-2.5"
          />
        }
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <div className="w-full md:px-1 px-0 mb-6">
          <div className="overflow-x-auto">
            <Employees/>
          </div>
        </div>
      </div>
      <AddNewEmployee open={open} setOpen={setOpen} />
    </>
  );
}

export default EmployeesPage