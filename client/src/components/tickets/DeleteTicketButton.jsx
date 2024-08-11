import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
import Button from "../common/Button";
import { DELETE_TICKET } from "../../mutations/ticketMutations";
import { GET_TICKETS } from "../../queries/ticketQueries";

const DeleteTicketButton = ({ticketId}) => {
  const navigate = useNavigate();

  const [deleteTicket] = useMutation(DELETE_TICKET, {
    variables: { id: ticketId },
    onCompleted: () => {
      setTimeout(() => {
        toast.success("Ticket Deleted");
      }, 1000); // delay for 1 second
      navigate("/tickets");
    },
    refetchQueries: [{ query: GET_TICKETS }],
  });

  return (
    <Button
      label="Delete This Project"
      onClick={deleteTicket}
      className="flex flex-row-reverse gap-1 items-center bg-red-600 text-white rounded-md 2xl:py-2.5"
    />
  );
}

export default DeleteTicketButton