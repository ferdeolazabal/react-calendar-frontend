import React from "react";

export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div>
      <strong className="capitalize"> {title} </strong>
      <span className="capitalize">- {user.name} </span>
    </div>
  );
};
