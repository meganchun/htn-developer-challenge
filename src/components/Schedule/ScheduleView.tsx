"use client";

import EventCard from "./EventCard";
import { useContext, useEffect, useState } from "react";
import { TEvent } from "@/types/types";
import dayjs, { Dayjs } from "dayjs";
import EventFilters from "./EventFilters";
import { UserContext } from "@/contexts/UserContext";
import { PreferencesContext } from "@/contexts/PreferencesContext";
import { motion } from "motion/react";

interface Props {
  events: TEvent[];
}
export default function ScheduleView({ events }: Props) {
  const [filteredEvents, setFilteredEvents] = useState<TEvent[] | null>(null);

  const [times, setTimes] = useState<Dayjs[]>([]);
  const [earliestTime, setEarliestTime] = useState<number>(0);
  const [lastestHour, setLastestHour] = useState<number>(0);
  const [diff, setDiff] = useState<number>(0);
  const [numCols, setNumCols] = useState(2);

  const userContext = useContext(UserContext);
  const { user } = userContext;

  const preferencesContext = useContext(PreferencesContext);
  const { preferences, setPreferences } = preferencesContext;

  // On first render filter events based on user type
  // Determine schedule view start/end time based on day
  useEffect(() => {
    if (!events || events.length === 0) return;

    // Find earliest event time
    const earliest = events.reduce((earliest, event) => {
      const startTime = dayjs(event.start_time);
      return startTime.isBefore(earliest) ? startTime : earliest;
    }, dayjs(events[0].start_time));

    // Find latest event time
    const latest = events.reduce((latest, event) => {
      const endTime = dayjs(event.end_time);
      return endTime.isAfter(latest) ? endTime : latest;
    }, dayjs(events[0].end_time));

    const earliestHour = earliest.hour();
    const latestHour = latest.hour();

    setEarliestTime(earliestHour);
    setLastestHour(latestHour);
  }, [events]);

  useEffect(() => {
    setFilteredEvents(events);
  }, []);

  useEffect(() => {
    if (filteredEvents && filteredEvents.length > 0) {
      if (
        dayjs(filteredEvents[0].start_time).format("DD/MM/YYYY") ===
        dayjs("13-01-21").format("DD/MM/YYYY")
      )
        // Increase number of columns to 4 if Jan 12, 2021
        user.type === "Guest" ? setNumCols(2) : setNumCols(3);
    }
  }, [filteredEvents]);

  // Create the time ranges
  useEffect(() => {
    if (!filteredEvents) return;
    else {
      const timesArray = [];
      for (
        let i = earliestTime === 0 ? 0 : earliestTime - 1;
        i <= (lastestHour === 24 ? 24 : lastestHour + 1);
        i++
      ) {
        timesArray.push(dayjs().hour(i).minute(0).second(0));
      }
      setTimes(timesArray);
    }
  }, [earliestTime, lastestHour, events]);

  // Filter events
  useEffect(() => {
    if (preferences.eventType === "all") setFilteredEvents(events);
    else
      setFilteredEvents(
        events.filter((event) => event.event_type === preferences.eventType)
      );
  }, [preferences, events]);

  const onSearch = (search: string) => {
    if (events) {
      setFilteredEvents(
        events.filter((event) =>
          event.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };

  const gridRowTemplate =
    times.length > 0
      ? `repeat(${times.length * 2}, minmax(75px, auto))`
      : "repeat(48, minmax(75px, auto))";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="my-4 flex flex-col justify-center items-center gap-16 h-fit"
    >
      <EventFilters
        onSearch={onSearch}
        preferences={preferences}
        setPreferences={setPreferences}
      />
      <div className="calendar-grid grid grid-cols-[50px_1fr] ">
        <div
          className="times-column grid gap-1"
          style={{
            gridTemplateRows: gridRowTemplate,
          }}
        >
          {times.map((time, index) => (
            <div
              key={index}
              style={{
                gridRow: `span 2`,
              }}
              className="flex "
            >
              <h3 className="text-sm text-text-secondary">
                {time.format("h")} {time.hour() >= 12 ? "PM" : "AM"}
              </h3>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numCols}, 1fr)`,
            gridTemplateRows: gridRowTemplate,
          }}
          className="filteredEvents-columns gap-2 gap-x-10 "
        >
          {filteredEvents &&
            filteredEvents.map((event, index) => {
              const startTime = dayjs(event.start_time);
              const endTime = dayjs(event.end_time);
              const startHour = startTime.hour();

              // Calculate row positioning
              const startMinutes = startTime.minute();
              const halfHourOffset = startMinutes >= 30 ? 1 : 0;
              const rowStart =
                (startHour - earliestTime) * 2 + halfHourOffset + diff * 2;
              const durationInMinutes = endTime.diff(startTime, "minutes");
              const rowSpan = Math.max(Math.ceil(durationInMinutes / 30), 1);

              // Prevent overlapping
              const overlappingEvents = filteredEvents.filter((e, i) => {
                if (i >= index) return false;
                const eStart = dayjs(e.start_time);
                const eEnd = dayjs(e.end_time);
                return (
                  // check if
                  // a) current event starts between another event
                  // b) current event ends between another event
                  // c) current event within another event
                  (startTime >= eStart && startTime < eEnd) ||
                  (endTime > eStart && endTime <= eEnd) ||
                  (startTime <= eStart && endTime >= eEnd)
                );
              });
              const column = (overlappingEvents.length % 4) + 1;

              return (
                <div
                  key={index}
                  className="w-full"
                  style={{
                    gridRow: `${rowStart} / span ${rowSpan}`,
                    gridColumn: column,
                  }}
                >
                  <EventCard
                    key={event.id}
                    event={event}
                    accent={
                      event.event_type === "activity"
                        ? "pink"
                        : event.event_type === "tech_talk"
                        ? "teal"
                        : "blue"
                    }
                    user={user}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
}
