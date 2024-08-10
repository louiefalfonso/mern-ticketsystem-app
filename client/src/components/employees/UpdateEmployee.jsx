import React, { useState } from "react";
import { DialogTitle } from "@headlessui/react";
import ModalWrapper from "../common/ModalWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";
import { UPDATE_EMPLOYEE } from "../../mutations/employeeMutations";
import { GET_EMPLOYEES } from "../../queries/employeeQueries";

const UpdateEmployee = ({ open, setOpen, employee }) => {
    const [name, setName] = useState(employee.name);
    const [email, setEmail] = useState(employee.email);
    const [number, setNumber] = useState(employee.number);
    const [position, setPosition] = useState(employee.position);
    const [department, setDepartment] = useState(employee.department);
    const [status, setStatus] = useState(()=> {
        switch (employee.status) {
          case "Active":
            return "ACTIVE";
          case "In Active":
            return "INACTIVE";
          default:
            throw new Error(`Unknown status: ${employee.status}`);
        }
    });

    const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
        variables: { id: employee.id, name, email, number, position, department, status },
        refetchQueries: [{ query: GET_EMPLOYEES }],
        onCompleted: () => {
            toast.success("Update Employee Complete!");
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !number || !position || !department || !status) {
            return alert("Please fill out all fields");
        }

        updateEmployee(name, email, number, position, department, status);
        setName("");
        setEmail("");
        setNumber("");
        setPosition("");
        setDepartment("");
        setStatus("ACTIVE");
        toast.success("Update Employee Complete!");
        window.location.reload();
    };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen} >
        <form onSubmit={onSubmit}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Update Employee Details
          </DialogTitle>
          <div className="w-full p-2">
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Employee Fullname:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="name"
                    type="text"
                    placeholder="Employee Fullname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email Address:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="email"
                    type="text"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Contact Number:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="number"
                    type="text"
                    placeholder="Contact Number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Position:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="position"
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Department:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="department"
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Employee Status:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">In Active</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-full mt-4">
              <button
                type="submit"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orang-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 w-full"
              >
                Update Employee
              </button>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default UpdateEmployee;
