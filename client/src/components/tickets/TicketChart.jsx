import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TICKETS } from "../../queries/ticketQueries";
import Spinner from "../common/Spinner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Tooltip, } from "recharts";

const TicketChart = () => {
  
  // defaultProps error from XAxis & YAxis  Display (Dev Mode Only)
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  const { loading, error, data } = useQuery(GET_TICKETS);
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  const tickets = data.tickets;
  const priorityData = tickets.map((ticket) => ({
    priority: ticket.priority,
    count: 1,
  }));

  const groupedData = {};
  priorityData.forEach((item) => {
    if (!groupedData[item.priority]) {
      groupedData[item.priority] = 0;
    }
    groupedData[item.priority]++;
  });

  const chartData = Object.keys(groupedData).map((priority) => ({
    priority,
    count: groupedData[priority],
  }));

  const statusData = tickets.map((ticket) => ({
    status: ticket.status,
    count: 1,
  }));

  const groupedStatusData = {};
  statusData.forEach((item) => {
    if (!groupedStatusData[item.status]) {
      groupedStatusData[item.status] = 0;
    }
    groupedStatusData[item.status]++;
  });

  const chartStatusData = Object.keys(groupedStatusData).map((status) => ({
    status,
    count: groupedStatusData[status],
  }));

  // Combine data
  const combinedData = [];
  chartData.forEach((item, index) => {
    combinedData.push({ name: item.priority, priority: item.count });
  });
  chartStatusData.forEach((item, index) => {
    if (combinedData[index]) {
      combinedData[index].status = item.count;
    } else {
      combinedData.push({ name: item.status, status: item.count });
    }
  });

  return (
    <>
      <LineChart width={1000} height={300} data={combinedData}>
        <Line type="monotone" dataKey="priority" stroke="#dc2626" />
        <Line type="monotone" dataKey="status" stroke="#34c759" />
        <XAxis dataKey="name" type="category" />
        <YAxis type="number" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
      </LineChart>
    </>
  );
};

export default TicketChart;
