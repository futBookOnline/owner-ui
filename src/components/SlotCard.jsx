import React, { useState } from "react";
import { isBefore, isEqual } from "date-fns";

const SlotCard = (props) => {
  const now = new Date();
  const { slotInfo, onBookClick, onEditClick } = props;
  let date = new Date(slotInfo.date);
  date = date.toISOString().split("T")[0];
  const slotStyle = [
    slotInfo.isReserved
      ? "btn-danger disabled"
      : (isEqual(date, now.toISOString().split("T")[0]) &&
          slotInfo.startTime.slice(0, 2) < now.getHours()) ||
        (isBefore(date, now.toISOString().split("T")[0]) &&
          slotInfo.startTime.slice(0, 2) < now.getHours())
      ? "btn-secondary disabled"
      : "btn-outline-success dropdown-toggle",
  ];

  return (
    <div className="btn-group" role="group">
    <div
      className={`btn ${slotStyle.join(" ")}`} data-bs-toggle="dropdown" aria-expanded="false"
      
    >{`${slotInfo.startTime} - ${slotInfo.endTime}`}
    <ul className="dropdown-menu bg-success-subtle">
      <li><a className="dropdown-item" onClick={() => onBookClick()}>Book</a></li>
      <li><a className="dropdown-item" onClick={() => onEditClick()}>Edit</a></li>
    </ul></div>
    </div>
  );
};

export default SlotCard;
