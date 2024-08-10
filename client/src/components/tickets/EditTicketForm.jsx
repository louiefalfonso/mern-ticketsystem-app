import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-hot-toast";
import { GET_TICKET } from "../../queries/ticketQueries";
import { UPDATE_TICKET } from "../../mutations/ticketMutations";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { GET_EMPLOYEES } from "../../queries/employeeQueries";


const EditTicketForm = ({ticket}) => {
    const [name, setName] = useState(ticket.name);
    const [description, setDescription] = useState(ticket.description);
    const [employeeId, setEmployeeId] = useState(ticket.employee.id);
    
    const [projectId, setProjectId] = useState(ticket.project.id);
    const [status, setStatus] = useState(() => {
      switch (ticket.status) {
        case "Assigned":
          return "ASSIGNED";
        case "In Progress":
          return "INPROGRESS";
        case "In Review":
          return "INREVIEW";
        case "Closed":
          return "CLOSED";
        default:
          throw new Error(`Unknown status: ${ticket.status}`);
      }
    });

    const [priority, setPriority] = useState(() => {
      switch (ticket.priority) {
        case "High":
          return "HIGH";
        case "Medium":
          return "MEDIUM";
        case "Low":
          return "LOW";
        case "Normal":
          return "NORMAL";
        default:
          throw new Error(`Unknown priority: ${ticket.priority}`);
      }
    });

    const [type, setType] = useState(() => {
      switch (ticket.type) {
        case "Service Request":
          return "SERVICE";
        case "Incident Report":
          return "INCIDENT";
        case "Problem Issues":
          return "PROBLEM";
        case "Replacement Request":
          return "REPLACEMENT";
        case "Other Changes":
          return "CHANGE";
        default:
          throw new Error(`Unknown priority: ${ticket.priority}`);
      }
    });


     const [updateTicket] = useMutation(UPDATE_TICKET, {
       variables: {
         id: ticket.id,
         name,
         description,
         status,
         priority,
         type,
         projectId,
         employeeId
       },
       refetchQueries: [{ query: GET_TICKET, variables: { id: ticket.id } }],
       onCompleted: () => {
         toast.success("Update Project Complete!");
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

    const onSubmit = async (e) => {
      e.preventDefault();

      if (!name || !description || !status || !priority || !type || !employeeId || !projectId) {
        return alert("Please fill out all fields");
      }

      updateTicket(name, description, status, priority, type, projectId, employeeId);
      //toast.success("Ticket Update Complete!");
    };


  return (
    <>
      <form onSubmit={onSubmit}>
        <h2 className="text-base font-bold leading-6 text-gray-900 mb-4">
          Update Ticket Details
        </h2>
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
                  {employeesData.employees.map((employee) => (
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
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orang-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Update Ticket Details
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default EditTicketForm