import React from 'react'
import Title from "../components/common/Title";
import ProjectTable from '../components/projects/ProjectTable';

const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="w-full bg-white p-4 rounded shadow-sm">
        <Title title="Ticket System Platform" />
      </div>
      <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
        <div className="overflow-x-auto">Ticket Table</div>
      </div>
      <div className="w-full bg-white my-4 p-4 rounded shadow-sm">
        <div className="overflow-x-auto">
          <ProjectTable/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard