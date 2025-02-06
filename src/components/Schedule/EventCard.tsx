import { TEvent } from "@/types/types";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface Props {
  event: TEvent;
  className?: string;
  accent: string;
}
export default function EventCard({ event, className, accent }: Props) {
  
  return (
    <div
      className={`${className}
 items-start text-start flex h-full flex-row rounded text-${accent} ${
        event.event_type === "activity"
          ? "bg-[#7F2B75]"
          : event.event_type === "tech_talk"
          ? "bg-[#086B7B]"
          : "bg-[#145889]"
      } items-center content-center`}
    >
      <div className={`icon h-[25px] aspect-square rounded bg-${accent}`}></div>
      <div>
        <h3 className={`text-${accent}`}>
          {event.name} {event.event_type}
        </h3>
        <h3>
          {dayjs(event.start_time).format("h:mm A")} -{" "}
          {dayjs(event.end_time).format("h:mm A")}
        </h3>
      </div>
    </div>
  );
}
