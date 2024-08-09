import React, { useState } from "react";
import { DialogTitle } from "@headlessui/react";
import { useMutation, useQuery } from "@apollo/client";
import { Toaster, toast } from "react-hot-toast";
import { ADD_EMPLOYEE } from "../../mutations/employeeMutations";
import { GET_EMPLOYEES } from "../../queries/employeeQueries";
import ModalWrapper from "../common/ModalWrapper";

const AddNewEmployee = ({ open, setOpen }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [position, setPosition] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("ACTIVE");

    const [addEmployee] = useMutation(ADD_EMPLOYEE, {
        variables: { name, email, number, position, department, status },
        update(cache, { data: { addEmployee } }) {
            const { employees } = cache.readQuery({ query: GET_EMPLOYEES });
            cache.writeQuery({
                query: GET_EMPLOYEES,
                data: {
                    employees: [...employees, addEmployee],
                },
            });
        },
    });

    const { loading, error, data } = useQuery(GET_EMPLOYEES);

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            name === "" ||
            email === "" ||
            number === "" ||
            position === "" ||
            department === "" ||
            status === ""
        ) {
            return alert("Please fill in all fields");
        }
        addEmployee(name, email, number, position, department, status);
        setName("");
        setEmail("");
        setNumber("");
        setPosition("");
        setDepartment("");
        setStatus("ACTIVE");
        toast.success("Add New Employee Complete!");
        window.location.reload();
    };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={onSubmit}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Add New Employee
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
                Save New Employee
              </button>
            </div>
          </div>
        </form>
      </ModalWrapper>
      <Toaster />
    </>
  );
}

export default AddNewEmployee