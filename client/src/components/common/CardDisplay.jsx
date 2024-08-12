import React from 'react'
import { MdAdminPanelSettings, MdPriorityHigh, MdOutlineWarningAmber} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";


import { useQuery } from "@apollo/client";
import { GET_TICKETS } from "../../queries/ticketQueries";
import Spinner from "../common/Spinner";
import Card from './Card';

const CardDisplay = () => {
      const { loading, error, data } = useQuery(GET_TICKETS);
      if (loading) return <Spinner />;
      if (error) return <p>Something Went Wrong</p>;

      const stats = data.tickets.reduce((acc, ticket) => {
        const priority = ticket.priority;
        const count = acc[priority] ? acc[priority].count + 1 : 1;
        acc[priority] = {
          label: priority,
          count,
          icon: "icon-" + priority,
          bg: "bg-" + priority,
        };
        return acc;
      }, {});

    const cardIcons = [
      {
        _id: "1",
        label: "High",
        icon: <MdPriorityHigh />,
        bg: "bg-[#b91c1c]",
      },
      {
        _id: "2",
        label: "Medium",
        icon: <MdOutlineWarningAmber />,
        bg: "bg-[#f59e0b]",
      },
      {
        _id: "3",
        label: "Normal",
        icon: <FaArrowsToDot />,
        bg: "bg-[#65a30d]" || 0,
      },
      {
        _id: "4",
        label: "Low",
        icon: <FaArrowsToDot />,
        bg: "bg-[#64748b]" || 0,
      },
    ];
      

  return (
    <div className="w-full bg-white my-4 p-4 rounded">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {Object.values(stats).map((stat, index) => {
          const iconData = cardIcons.find((icon) => icon.label === stat.label);
          return (
            <Card
              key={index}
              icon={iconData ? iconData.icon : null}
              bg={iconData ? iconData.bg : null}
              label={stat.label}
              count={stat.count}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CardDisplay