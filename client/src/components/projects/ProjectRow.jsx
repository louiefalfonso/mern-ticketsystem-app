import React from 'react'
import { useQuery } from "@apollo/client";

import { GET_PROJECT } from "../../queries/projectQueries";
import { useNavigate } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";

const ProjectRow = ({project}) => {
    const { loading, error, data } = useQuery(GET_PROJECT, {
      variables: { id: project.id },
      skip: true,
    });

    const navigate = useNavigate();
    const viewProject = () => {
      navigate(`/projects/${project.id}`);
    };

  return (
    <>
      <React.Fragment>
        <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{project.id}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{project.name}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{project.status}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{project.priority}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">
                <button
                  className="text-slate-950 hover:text-slate-950"
                  onClick={viewProject}
                >
                  <TbListDetails />
                </button>
              </p>
            </div>
          </td>
        </tr>
      </React.Fragment>
    </>
  );
}

export default ProjectRow