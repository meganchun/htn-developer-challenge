import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";

interface Props {
  date: Dayjs;
  isCurrent: boolean;
  onClick: (date: Dayjs) => void;
}
export default function DateCard({ date, isCurrent, onClick }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`main-card flex flex-col ${
        isCurrent
          ? "bg-white text-pink"
          : "bg-background-secondary text-text-secondary"
      } w-[110px] h-[50px] p-3 sm:w-[150px] sm:h-[75px] justify-center items-center text-center rounded 
        hover:scale-110 duration-200
      `}
      onClick={() => {
        onClick(date);
      }}
    >
      <div
        className="hover-border-blur absolute z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          color: isHovered ? `var(--pink)` : "rgba(0, 0, 0, 0)",
          filter: isHovered ? "blur(3px)" : "blur(0px)",
          transition: "color 0.2s ease-in-out",
        }}
      >
        <h3>{date.format("dddd")}</h3>
        <h1 className="text-xl sm:text-2xl ">{date.date()}</h1>
      </div>
      <h3>{date.format("dddd")}</h3>
      <h1 className="text-xl sm:text-2xl ">{date.date()}</h1>
    </div>
  );
}
