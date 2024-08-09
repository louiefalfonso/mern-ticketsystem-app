
import { DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import { useMutation, useQuery } from "@apollo/client";
import { Toaster, toast } from "react-hot-toast";
import { ADD_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECTS } from "../../queries/projectQueries";

const AddNewProject = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState("NEW");
  const [priority, setPriority] = useState("NORMAL");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, date, status, priority },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: [...projects, addProject],
        },
      });
    },
  });

  const { loading, error, data } = useQuery(GET_PROJECTS);

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      name === "" ||
      description === "" ||
      date === "" ||
      status === "" ||
      priority === ""
    ) {
      return alert("Please fill in all fields");
    }
    addProject(name, description, date, status, priority);
    setName("");
    setDescription("");
    setDate("");
    setStatus("NEW");
    setPriority("NORMAL");
    toast.success("Add New Project Complete!");
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
            Add New Project{" "}
          </DialogTitle>
          <div className="w-full p-2">
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Project Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="name"
                    type="text"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Date Started
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Product Description:
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
                Project Status:
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
                    <option value="NEW">Not Started</option>
                    <option value="PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-span-full mb-4">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Project Priority:
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
                Save New Product
              </button>
            </div>
          </div>
        </form>
      </ModalWrapper>
      <Toaster />
    </>
  );
};

export default AddNewProject