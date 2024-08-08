import React from 'react'

import { useQuery } from "@apollo/client";
import { GET_PROJECTS, GET_PROJECT } from "../../queries/projectQueries";
import Spinner from "../common/Spinner";
import { Toaster } from "react-hot-toast";
import ProjectRow from "./ProjectRow";


const Projects = () => {

     const { loading, error, data } = useQuery(GET_PROJECTS);
     if (loading) return <Spinner />;
     if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div className="flex items-center justify-between">
            <table className="w-full">
              <thead className="border-b border-gray-300 ">
                <tr className="text-black text-left">
                  <th className="py-2">Product Id</th>
                  <th className="py-2">Project Name</th>
                  <th className="py-2">Priority</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.projects.map((project, index) => (
                  <ProjectRow key={index} project={project} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
}

export default Projects