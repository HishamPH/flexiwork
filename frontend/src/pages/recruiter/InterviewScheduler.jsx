import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const InterviewScheduler = () => {
  const [events, setEvents] = useState([
    {
      title: "Event 1",
      start: new Date(2023, 9, 7, 10, 0), // Year, Month (0-based), Day, Hour, Minute
      end: new Date(2023, 9, 7, 11, 0),
    },
    // Add more events as needed
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-1/2 bg-gray-50 p-4 shadow-lg">
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          events={events}
          selectable
          onSelectSlot={handleSelectSlot}
        />
      </div>
    </div>
  );
};

export default InterviewScheduler;
