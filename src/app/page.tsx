"use client";
import DateCard from "@/components/DateCard";
import { useAllEvents } from "@/hooks/useEvents";
import { TEvent } from "@/types/types";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import ScheduleView from "@/components/Schedule/ScheduleView";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export async function fetchEvents(): Promise<TEvent[]> {
  const response = await fetch("https://api.hackthenorth.com/v3/events");
  if (!response.ok) throw new Error("Failed to fetch events");

  const data: TEvent[] = await response.json();
  return data;
}

export default function Home() {
  const router = useRouter();
  const sliderRef = useRef(null);

  // const { events, loading, error } = useAllEvents();
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const [events, setEvents] = useState<TEvent[] | null>(null);

  const [selectedDay, setSelectedDay] = useState<Dayjs>(
    dayjs(dayjs("01-12-21"))
  );
  const [days, setDays] = useState<Dayjs[]>([
    dayjs("01-12-21"),
    dayjs("01-13-21"),
    dayjs("12-01-21"),
  ]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch();
  }, []);


  return (
    <div className="flex flex-col">
      <nav className="fixed top-[5vh] left-1/2 transform -translate-x-1/2 w-4/5 rounded-full bg-background-secondary text-white z-50">
        <div className="flex justify-between text-text-secondary py-3 px-10 text-xs items-center">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <div className="flex gap-10">
            <a href="#" className="hover:text-gray-400">
              Schedule
            </a>
            <a href="#" className="hover:text-gray-400">
              FAQ
            </a>
            <a href="#" className="hover:text-gray-400">
              Contact Us
            </a>
          </div>
          <button
            onClick={() => router.push('/signin')}
            className="hover:text-gray-400 border px-3 py-1 border-text-secondary rounded-full cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </nav>{" "}
      <main className="flex flex-col">
        <section>
          <div className="header flex flex-col px-16 py-36">
            <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl ">
              Hackathon <br />
              Global Inc.™
            </h1>
            <button
              onClick={() => router.push('/auth/signin')}
              className="text-white hover:text-gray-400 cursor-pointer"
            >
              Go to Page
            </button>
          </div>

          <div className="px-16 ">
            <div className="font-bold py-8 text-xl">February 2025</div>
            <div className="flex flex-nowrap gap-2">
              {days.map((day, index) => (
                <section key={index}>
                  <DateCard
                    onClick={() => {
                      setSelectedDay(day);
                    }}
                    date={day}
                    isCurrent={selectedDay.isSame(day, "day")}
                  />
                </section>
              ))}
            </div>
          </div>
        </section>
        <section className="z-20">
          {events && (
            <ScheduleView
              events={events.filter(
                (event) =>
                  dayjs(event.start_time).format("DD/MM/YYYY") ===
                  selectedDay.format("DD/MM/YYYY")
              )}
            />
          )}
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
