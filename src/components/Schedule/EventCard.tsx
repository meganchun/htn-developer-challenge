"use client";

import { TEvent, User } from "@/types/types";
import dayjs from "dayjs";
import React, { useMemo, useState, useEffect } from "react";
import { IoGameController } from "react-icons/io5";
import { FaLightbulb, FaWrench } from "react-icons/fa";
import EventModal from "./EventModal";
import { useEvent } from "@/hooks/useEvents";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";

interface Props {
  event: TEvent;
  className?: string;
  accent: string;
  user: User;
}
export default function EventCard({ event, className, accent, user }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{ color: `var(--${accent})` }}
      className={`${className}
 text-start flex h-full flex-wrap sm:flex-row rounded text-${accent} ${
        event.event_type === "activity"
          ? "bg-[#7F2B75]"
          : event.event_type === "tech_talk"
          ? "bg-[#086B7B]"
          : "bg-[#145889]"
      } items-center content-center p-2 sm:p-5 md:px-6 lg:px-10 gap-3 relative
      `}
      onClick={() => setOpen(!open)}
    >
      <div
        className="hover-border absolute inset-0 z-10 rounded-lg "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          border: isHovered
            ? `2px solid var(--${accent})`
            : "2px solid transparent",
          transition: "border 0.2s ease-in-out",
        }}
      />
      <div
        className="hover-border-blur absolute inset-0 z-10 rounded-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          border: isHovered ? `2px solid white` : "2px solid transparent",
          filter: isHovered ? "blur(4px)" : "blur(0px)",
          transition: "border 0.2s ease-in-out",
        }}
      />
      <div
        style={{ backgroundColor: `var(--${accent})` }}
        className={`icon h-[25px] aspect-square rounded flex justify-center items-center`}
      >
        {accent === "pink" && <IoGameController size={16} color={"white"} />}
        {accent === "blue" && <FaWrench size={14} color={"white"} />}
        {accent === "teal" && <FaLightbulb size={14} color={"white"} />}
      </div>
      <div>
        <h3 className="text-xs sm:text-sm md:text-base text-white font-medium flex flex-wrap">
          {event.name}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="hidden text-sm sm:block ">
            {dayjs(event.start_time).format("h:mm A")} -{" "}
            {dayjs(event.end_time).format("h:mm A")}
          </h3>
          {event.permission && (
            <div
              className="border border-[var(--accent)] sm:h-auto opacity-0 h-0 sm:border sm:opacity-100 rounded-sm w-fit flex flex-row text-sm gap-1 px-2"
            >
              {event.permission === "public" ? (
                <UnlockOutlined size={10} />
              ) : (
                <LockOutlined size={10} />
              )}
              <h3 className=" text-xs md:text-sm">
                {event.permission?.charAt(0).toUpperCase() +
                  event.permission?.slice(1)}
              </h3>
            </div>
          )}
        </div>
      </div>
      <EventModal open={open} setOpen={setOpen} event={event} user={user} />
    </div>
  );
}
