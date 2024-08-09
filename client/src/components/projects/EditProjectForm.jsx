import { DialogTitle } from "@headlessui/react";
import React, { useState } from "react";
import ModalWrapper from "../common/ModalWrapper";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projectQueries";
import { UPDATE_PROJECT } from "../../mutations/projectMutations";
import { Toaster, toast } from "react-hot-toast";

const EditProjectForm = ({ project }) => {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [status, setStatus] = useState(() => {
    switch (project.status) {
      case "Not Started":
        return "NEW";
      case "In Progress":
        return "PROGRESS";
      case "Completed":
        return "COMPLETED";
      default:
        throw new Error(`Unknown status: ${project.status}`);
    }
  });
  const [ priority, setPriority] = useState(() => {
    switch (project.priority) {
      case "Low":
        return "LOW";
      case "Normal":
        return "NORMAL";
      case "Medium":
        return "MEDIUM";
      case "High":
        return "HIGH";
      default:
        throw new Error(`Unknown status: ${project.priority}`);
    }
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status, priority },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    onCompleted: () => {
      toast.success("Update Project Complete!");
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !status || !priority) {
      return alert("Please fill out all fields");
    }

    updateProject(name, description, status);
    toast.success("Project Update Complete!");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <h2 className="text-base font-bold leading-6 text-gray-900 mb-4">
          Update Project Details:
        </h2>
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
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orang-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 "
            >
              Update Product
            </button>
          </div>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default EditProjectForm;
