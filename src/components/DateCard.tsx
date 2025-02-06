import dayjs, { Dayjs } from "dayjs";
import React from "react";

interface Props {
  date: Dayjs;
  isCurrent: boolean;
  onClick: (date: Dayjs) => void;
}
export default function DateCard({ date, isCurrent, onClick }: Props) {
  return (
    <div
      className={`main-card flex flex-col ${
        isCurrent
          ? "bg-white text-blue"
          : "bg-background-secondary text-text-secondary"
      } w-[150px] h-[100px] justify-center items-center rounded`}
      onClick={() => {
        onClick(date), console.log("clicked");
      }}
    >
      <h3>{date.format("dddd")}</h3>
      <h1 className="text-5xl ">{date.date()}</h1>
    </div>
  );
}
