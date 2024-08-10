import React, { useState } from "react";
import { DialogTitle } from "@headlessui/react";
import ModalWrapper from "../common/ModalWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { Toaster, toast } from "react-hot-toast";
import { ADD_TICKET } from "../../mutations/ticketMutations";
import { GET_EMPLOYEES } from "../../queries/employeeQueries";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { GET_TICKETS } from "../../queries/ticketQueries";

const AddNewTicket = ({ open, setOpen }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("ASSIGNED");
    const [priority, setPriority] = useState("NORMAL");
    const [type, setType] = useState("SERVICE");
    const [employeeId, setEmployeeId] = useState("");
    const [projectId, setProjectId] = useState("");

    const [addTicket] = useMutation(ADD_TICKET, {
        variables: { name, description, status, priority, type, projectId, employeeId },
        update(cache, { data: { addTicket } }) {
            const { tickets } = cache.readQuery({ query: GET_TICKETS });
            cache.writeQuery({
                query: GET_TICKETS,
                data: {
                    tickets: [...tickets, addTicket],
                },
            });
        },
    });

    const {
        loading: employeesLoading,
        error: employeesError,
        data: employeesData,
    } = useQuery(GET_EMPLOYEES);

    const {
        loading: projectsLoading,
        error: projectsError,
        data: projectsData,
    } = useQuery(GET_PROJECTS);

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            name === "" ||
            description === "" ||
            status === "" ||
            priority === "" ||
            type === "" ||
            employeeId === "" ||
            projectId === ""
        ) {
            return alert("Please fill in all fields");
        }
        addTicket(name, description, status, priority, type, projectId, employeeId);
        setName("");
        setDescription("");
        setStatus("ASSIGNED");
        setPriority("NORMAL");
        setType("SERVICE");
        setEmployeeId("");
        setProjectId("");
        toast.success("Add New Ticket Complete!");
        //window.location.reload();
    };
    
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={onSubmit}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Add New Ticket
          </DialogTitle>
          <div className="w-full p-2">
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Ticket Name:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="name"
                    type="text"
                    placeholder="Ticket Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Ticket Description:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <textarea
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    id="description"
                    placeholder="Description"
                    value={description}
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Assigned Employee:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    id="employeeId"
                    value={employeeId}
                    type="text"
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    {employeesData &&
                      employeesData.employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Project:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    id="projectId"
                    value={projectId}
                    type="text"
                    onChange={(e) => setProjectId(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    {projectsData &&
                      projectsData.projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Ticket Status:
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
                    <option value="ASSIGNED">Assigned</option>
                    <option value="INPROGRESS">In Progress</option>
                    <option value="INREVIEW">In Review</option>
                    <option value="CLOSEDWFX">Closed & Wont Fix</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Ticket Type:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value="SERVICE">Service Request</option>
                    <option value="INCIDENT">Incident Report</option>
                    <option value="PROBLEM">Problem Issues</option>
                    <option value="REPLACEMENT">Replacement Request</option>
                    <option value="CHANGE">Other Changes</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Priority:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <select
                    id="priority"
                    name="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  >
                    <option value="LOW">Low</option>
                    <option value="NORMAL">Normal</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="col-span-full mt-4">
              <button
                type="submit"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orang-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 w-full"
              >
                Save New Ticket
              </button>
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddNewTicket;
