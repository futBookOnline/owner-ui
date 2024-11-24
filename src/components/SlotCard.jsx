import React, { useState } from "react";
import { isBefore, isEqual } from "date-fns";

const SlotCard = (props) => {
  const now = new Date();
  const { slotInfo, onClick } = props;
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
      : "btn-outline-success",
  ];

  return (
    <div
      className={`btn ${slotStyle.join(" ")}`}
      onClick={() => onClick()}
    >{`${slotInfo.startTime} - ${slotInfo.endTime}`}</div>
  );
};

export default SlotCard;
