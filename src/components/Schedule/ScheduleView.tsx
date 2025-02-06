import { fetchEvents } from "@/app/page";
import EventCard from "./EventCard";
import { useEffect, useState } from "react";
import { TEvent } from "@/types/types";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  events: TEvent[];
}
export default function ScheduleView({ events }: Props) {
  const [times, setTimes] = useState<Dayjs[]>([]);
  const [earliestTime, setEarliestTime] = useState<number>(0);
  const [lastestHour, setLastestHour] = useState<number>(0);
  const [diff,setDiff] = useState<number>(0);

  useEffect(() => {
    console.log(earliestTime)
    console.log(lastestHour)
  },[lastestHour])

  useEffect(() => {
    if (events.length === 0) return;

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
    setDiff(earliestHour === 0 ? 0 : 1);
  }, [events]);

  useEffect(() => {
    if (events.length === 0) return;
    
    const timesArray = [];
    for (let i = (earliestTime === 0 ? 0 : earliestTime - 1); i < (lastestHour === 24 ? 24 : lastestHour + 1); i++) {
      timesArray.push(dayjs().hour(i).minute(0).second(0));
    }
    setTimes(timesArray);
  }, [earliestTime, lastestHour]);

  return (

    <div className="px-16 my-4">
      <div className="grid grid-cols-[100px_1fr]">
        {/* Time labels column */}
        <div className="grid grid-rows-[repeat(19,minmax(4rem,1fr))]">
          {times.map((time, index) => (
            <div key={index} className="flex">
              <h3 className="text-sm text-text-secondary">
                {time.format("h")} {time.hour() >= 12 ? "PM" : "AM"}
              </h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 grid-rows-[repeat(19,minmax(4rem,1fr))]">
          {events.map((event, index) => {
            const startTime = dayjs(event.start_time);
            const endTime = dayjs(event.end_time);
            const startHour = startTime.hour();
            
            // Calculate grid positioning
            const rowStart = startHour - earliestTime + diff + 1;
            const durationInMinutes = endTime.diff(startTime, 'minutes');
            const rowSpan = Math.max(Math.ceil(durationInMinutes/60), 1);

            // Calculate column to prevent overlapping
            const overlappingEvents = events.filter((e, i) => {
              if (i >= index) return false;
              const eStart = dayjs(e.start_time);
              const eEnd = dayjs(e.end_time);
              return (
                (startTime >= eStart && startTime < eEnd) ||
                (endTime > eStart && endTime <= eEnd) ||
                (startTime <= eStart && endTime >= eEnd)
              );
            });
            const column = (overlappingEvents.length % 3) + 1;

            return (
              <div
                key={index}
                className="w-full"
                style={{
                  gridRow: `${rowStart} / span ${rowSpan}`,
                  gridColumn: column,
                }}
              >
                <EventCard event={event} accent={event.event_type === "activity" ? "teal" : event.event_type === "tech_talk" ? "pink" : "blue"} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
