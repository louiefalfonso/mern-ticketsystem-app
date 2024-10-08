import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../../queries/projectQueries";

const ProjectList = ({ project }) => {
    const { loading, error, data } = useQuery(GET_PROJECT, {
      variables: { id: project.id },
      skip: true,
    });
    
  return (
    <>
      <React.Fragment>
        <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
          <td className="py-2">
            <div className="flex gap-2">
              <p className="text-base text-black">{project.name}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex  gap-2">
              <p className="text-base text-black">{project.employee.name}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex gap-2">
              <p className="text-base text-black">{project.priority}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex gap-2">
              <p className="text-base text-black">{project.status}</p>
            </div>
          </td>
        </tr>
      </React.Fragment>
    </>
  );
};

export default ProjectList;
