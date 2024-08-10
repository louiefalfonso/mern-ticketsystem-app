import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_TICKET } from "../../queries/ticketQueries";
import { useNavigate } from "react-router-dom";
import { TbListDetails } from "react-icons/tb";

const TicketRow = ({ticket}) => {
    const { loading, error, data } = useQuery(GET_TICKET, {
      variables: { id: ticket.id },
      skip: true,
    });
    const navigate = useNavigate();
    const viewTicket = () => {
      navigate(`/tickets/${ticket.id}`);
    };

  return (
    <>
      <React.Fragment>
        <tr className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10">
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{ticket.name}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{ticket.project.name}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{ticket.employee.name}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">{ticket.priority}</p>
            </div>
          </td>
          <td className="py-2">
            <div className="flex items-center gap-2">
              <p className="text-base text-black">
                <button
                  className="text-slate-950 hover:text-slate-950"
                  onClick={viewTicket}
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

export default TicketRow