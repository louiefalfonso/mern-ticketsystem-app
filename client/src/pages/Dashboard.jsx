import React from 'react'
import Title from "../components/common/Title";
import ProjectTable from '../components/projects/ProjectTable';
import TicketsTables from "../components/tickets/TicketsTables";
import TicketChart from '../components/tickets/TicketChart';

const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="w-full bg-white p-4 rounded shadow-sm">
        <Title title="Ticket System Platform" />
        <div className="overflow-x-auto mt-4">
          <TicketChart />
        </div>
      </div>
      <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
        <div className="overflow-x-auto">
          <TicketsTables />
        </div>
      </div>
      <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
        <div className="overflow-x-auto">
          <ProjectTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard