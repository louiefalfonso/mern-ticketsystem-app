import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";

import Button from "../common/Button";
import { DELETE_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECTS } from "../../queries/projectQueries";

const DeleteProjectButton = ({ projectId }) => {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
      variables: { id: projectId },
      onCompleted: () => {
        navigate("/projects")
      },
      refetchQueries: [{ query: GET_PROJECTS }],
    });

  return (
    <Button
      label="Delete"
      onClick={deleteProject}
      className="flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md 2xl:py-2.5"
    />
  );
};

export default DeleteProjectButton;
