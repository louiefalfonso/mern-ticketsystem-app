import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../../queries/projectQueries";
import Spinner from "../common/Spinner";
import ProjectList from "./ProjectList";

const ProjectTable = () => {
     const { loading, error, data } = useQuery(GET_PROJECTS);
     if (loading) return <Spinner />;
     if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <div className="flex items-center ">
            <table className="w-full">
              <thead className="border-b border-gray-300 ">
                <tr className="text-black text-left">
                  <th className="py-2">Latest Projects</th>
                  <th className="py-2">Assigned Employee</th>
                  <th className="py-2">Priority</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.projects.slice(0, 5).map((project, index) => (
                  <ProjectList key={index} project={project} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectTable;
