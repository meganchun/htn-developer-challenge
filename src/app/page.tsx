"use client";

import { useContext, useEffect, useState } from "react";
import DateCard from "@/components/DateCard";
import { TEvent } from "@/types/types";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import lockImage from "./assets/lock.png";
import { Tooltip } from "antd";
import { useAllEvents } from "@/hooks/useEvents";
import { UserContext } from "@/contexts/UserContext";
import { PreferencesContext } from "@/contexts/PreferencesContext";
import NavBar from "@/components/NavBar";
import ScheduleView from "@/components/Schedule/ScheduleView";
import techTalkImage from "./assets/tech_talk.png";
import workshopImage from "./assets/workshop.png";
import activityImage from "./assets/activity.png";
import TextScramble from "@skits/react-text-scramble";
import * as motion from "motion/react-client";

export default function Home() {
  const userContext = useContext(UserContext);
  const { user, setUser } = userContext;
  const { events, loading, error } = useAllEvents();

  const preferencesContext = useContext(PreferencesContext);
  const { preferences, setPreferences } = preferencesContext;

  const [selectedDay, setSelectedDay] = useState<Dayjs | null>(null);
  const [days, setDays] = useState<Dayjs[] | null>(null);

  const [filteredEvents, setFilteredEvents] = useState<TEvent[] | null>(null);

  useEffect(() => {
    setDays([dayjs("2021-01-12"), dayjs("2021-01-13")]);
    setSelectedDay(dayjs("2021-01-12"));
  }, []);

  useEffect(() => {
    if (events) {
      console.log(events);
      let filteredEvents =
        user.type === "Guest"
          ? events.filter((event: TEvent) => event.permission === "public")
          : events;
      setFilteredEvents(filteredEvents);
    }
  }, [events, user]);

  useEffect(() => {
    if (selectedDay && !dayjs.isDayjs(selectedDay)) {
      setSelectedDay(dayjs(selectedDay));
    }
  }, [selectedDay]);

  return (
    <div className="flex flex-col font-dmSans overflow-hidden">
      <NavBar user={user} setUser={setUser} />
      <main className="flex flex-col overflow-x-hidden relative">
        <section id="header">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            className="header h-[100vh] w-[100vw] overflow-hidden flex flex-col px-16 py-36 text-white text-5xl sm:text-7xl lg:text-8xl font-semibold "
          >
            <TextScramble
              text="Hackathon"
              autostart
              revealText
              revealSpeed={200}
              revealMode="typewriter"
            />
            <TextScramble
              text="Global Inc.™"
              autostart
              wrappingElement="p"
              revealText
              revealSpeed={200}
              revealMode="typewriter"
            />

            <h3 className="text-text-secondary text-xl sm:text-2xl lg:text-3xl font-medium font-robotoMono ">
              // ctrl + alt + innovate.
            </h3>
          </motion.div>
        </section>
        <section id="schedule" className=" w-full flex justify-center">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <div className="flex flex-wrap gap-10 w-full px-8 sm:px-0 sm:w-3/5 ">
              <div className="public-event-dates flex flex-col ">
                <div className="font-bold text-text-secondary py-8 text-xl">
                  January 2021
                </div>
                <div className="flex flex-wrap gap-2">
                  {days?.map((day, index) => (
                    <DateCard
                      key={index}
                      onClick={() => {
                        setSelectedDay(day);
                        setPreferences({ ...preferences, eventDate: day });
                      }}
                      date={day}
                      isCurrent={selectedDay?.isSame(day, "day") || false}
                    />
                  ))}
                </div>
              </div>
              <div>
                {user.type === "Guest" ? (
                  <div>
                    <div className="private-event-dates font-bold text-pink blur-sm py-8 text-xl">
                      December 2021
                    </div>
                    <Tooltip title="Sign in to unlock!" placement="top">
                      <div className="relative flex justify-center items-center w-[110px]  h-[50px] p-3 sm:w-[150px] sm:h-[75px] border border-pink rounded-lg">
                        <div className="hover-border-blur absolute inset-0 z-10 border-4 border-pink blur-sm" />
                        <Image
                          src={lockImage}
                          alt="lock-image"
                          className="w-8 h-auto object-contain"
                        />
                      </div>
                    </Tooltip>
                  </div>
                ) : (
                  <div>
                    <div className="private-event-dates text-text-secondary font-bold py-8 text-xl">
                      December 2021
                    </div>
                    <DateCard
                      onClick={() => {
                        setSelectedDay(dayjs("2021-12-01"));
                        setPreferences({
                          ...preferences,
                          eventDate: dayjs("2021-12-01"),
                        });
                      }}
                      date={dayjs("2021-12-01")}
                      isCurrent={
                        selectedDay?.isSame(dayjs("2021-12-01"), "day") || false
                      }
                    />
                  </div>
                )}
              </div>
              {selectedDay && filteredEvents && (
                <ScheduleView
                  events={filteredEvents.filter(
                    (event: TEvent) =>
                      dayjs(event.start_time).format("DD/MM/YYYY") ===
                      selectedDay.format("DD/MM/YYYY")
                  )}
                />
              )}
            </div>
          )}
        </section>
        <section id="faq" className="w-full px-16 h-[500px]">
          <div className="faq-title font-bold text-white text-xl">
            Frequently Asked Questions
          </div>
          <h3 className="text-text-secondary">
            Nothing to see here...keep scrolling!
          </h3>
        </section>
        <section id="contactUs" className="w-full px-16 h-[250px]">
          <div className="contact-title font-bold text-white text-xl">
            Contact Us
          </div>
          <h3 className="text-text-secondary">
            Nothing to see here either...sorry about that!
          </h3>
        </section>

        <Image
          src={techTalkImage}
          alt="tech-talk-mascot"
          className="absolute -right-24 top-[250px] transform -rotate-12 w-64 h-auto z-10"
        />

        <Image
          src={workshopImage}
          alt="workshop-mascot"
          className="absolute -left-24 top-[1200px] transform rotate-12 w-32 sm:w-64 h-auto z-10 pointer-events-none opacity-50"
        />
        <Image
          src={activityImage}
          alt="activity-mascot"
          className="absolute -right-16 top-[2000px] transform -rotate-12 w-48 sm:w-80 h-auto z-10 pointer-events-none opacity-50"
        />
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
