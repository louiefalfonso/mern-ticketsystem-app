import React from 'react'
import Title from '../components/common/Title';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import { useParams } from "react-router-dom";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import DeleteProjectButton from '../components/projects/DeleteProjectButton';
import { Toaster, toast } from "react-hot-toast";
import EditProjectForm from '../components/projects/EditProjectForm';


const ProjectDetails = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    const { project } = data;
    
   
  return (
    <>
      <div className="flex items-center justify-between mb-4 w-full bg-white p-4 rounded shadow-sm">
        <Title title={`${project.name}`} />
        {
          <Button
            label="Back"
            onClick={() => window.history.back()}
            className="flex flex-row-reverse gap-1 items-center bg-black text-white rounded-md 2xl:py-2.5"
          />
        }
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <table className="w-full mb-5">
          <thead className="border-b border-gray-300 ">
            <tr className="text-black text-left">
              <th className="py-2 w-1/4">Project Name</th>
              <th className="py-2 w-1/4">Priority</th>
              <th className="py-2 w-1/4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <p className="text-base text-black">{project.name}</p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <p className="text-base text-black">{project.priority}</p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <p className="text-base text-black">{project.status}</p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <DeleteProjectButton projectId={data.project.id} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <div className="w-1/2">
          <EditProjectForm project={project} />
        </div>
        <div className="w-1/2">
          <div className="max-w-sm mx-auto bg-white rounded-lg border w-full ">
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900">Project ID:</h2>
              <p className="text-gray-900">{project.id}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Project Description:</p>
              <p className="text-gray-900">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default ProjectDetails