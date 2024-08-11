import React from 'react'
import { useQuery } from "@apollo/client";
import { GET_TICKETS } from "../../queries/ticketQueries";
import Spinner from "../common/Spinner";
import TicketList from './TicketList';

const TicketsTables = () => {
    const { loading, error, data } = useQuery(GET_TICKETS);
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
                  <th className="py-2">Ticket Name</th>
                  <th className="py-2">For Project</th>
                  <th className="py-2">Assigned to</th>
                  <th className="py-2">Priority:</th>
                </tr>
              </thead>
              <tbody>
                {data.tickets.slice(0, 4).map((ticket, index) => (
                  <TicketList key={index} ticket={ticket} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default TicketsTables