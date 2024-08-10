import React from 'react'
import Title from "../components/common/Title";
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Toaster, toast } from "react-hot-toast";
import { GET_TICKET } from "../queries/ticketQueries";
import { GET_EMPLOYEES } from "../queries/employeeQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import EditTicketForm from '../components/tickets/EditTicketForm';
import DeleteTicketButton from '../components/tickets/DeleteTicketButton';

const TicketDetails = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_TICKET, {
      variables: { id },
    });

    const { loading: employeesLoading, error: employeesError, data: employeesData } = useQuery(GET_EMPLOYEES);
    const { loading: projectsLoading, error: projectsError, data: projectsData } = useQuery(GET_PROJECTS);

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    const { ticket } = data;   

  return (
    <>
      <div className="flex items-center justify-between mb-4 w-full bg-white p-4 rounded shadow-sm">
        <Title title={`${ticket.name}`} />
        {
          <Button
            label="Back"
            onClick={() => window.history.back()}
            className="flex flex-row-reverse gap-1 items-center bg-black text-white rounded-md 2xl:py-2.5"
          />
        }
      </div>
      <div className="flex items-center justify-between mb-8 w-full bg-white p-4 rounded shadow-sm">
        <div className="w-1/2">
          <EditTicketForm ticket={ticket} />
        </div>
        <div className="w-1/2">
          <div className="mx-auto bg-white rounded-lg border w-full ">
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-900">Ticket ID:</h2>
              <p className="text-gray-900">{ticket.id}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Ticket Name:</p>
              <p className="text-gray-900">{ticket.name}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">
                Project Associated with:
              </p>
              <p className="text-gray-900">{ticket.project.name}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Assigned To:</p>
              <p className="text-gray-900">{ticket.employee.name}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Ticket Type:</p>
              <p className="text-gray-900">{ticket.type}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Status:</p>
              <p className="text-gray-900">{ticket.status}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Priority:</p>
              <p className="text-gray-900">{ticket.priority}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-900 font-bold">Ticket Description:</p>
              <p className="text-gray-900">{ticket.description}</p>
            </div>
            <div className="p-4 border-t border-gray-200">
              Delete Button HERE
              {/*<DeleteTicketButton ticketId={data.ticket.id} />*/}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default TicketDetails