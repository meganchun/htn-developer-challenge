"use client";
import { useEvent } from "@/hooks/useEvents";
import { TEvent, User } from "@/types/types";
import { LinkOutlined } from "@ant-design/icons";
import { Avatar, Button, Modal, Tooltip } from "antd";
import Link from "antd/es/typography/Link";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  event: TEvent;
  user: User;
}
export default function EventModal({ open, setOpen, event, user }: Props) {
  const [relatedEvents, setRelatedEvents] = useState<any[]>([]);
  const { getEvent } = useEvent();

  useEffect(() => {
    const fetchEvents = async () => {
      const results = await Promise.all(
        event.related_events.map(async (id) => {
          const { data } = await getEvent({ variables: { id } });
          return data?.sampleEvent;
        })
      );

      setRelatedEvents(results.filter(Boolean));
    };
    if (event.related_events.length > 0) fetchEvents();
  }, [event.related_events, getEvent]);

  return (
    <Modal
      centered
      style={{
        maxHeight: "80vh",
        overflowY: "auto",
      }}
      className="w-[80vw] sm:w-auto"
      open={open}
      onCancel={() => setOpen(false)}
      footer={[
        <div className="flex justify-end">
          <Button className="border border-blue p-2 bg-blue text-white">
            Close
          </Button>
        </div>,
      ]}
    >
      <div className="main-container flex flex-col gap-6">
        <div className="title-container flex flex-col">
          <h2 className="font-bold text-lg">{event.name}</h2>
          <div className="event-info text-text-secondary">
            <h2>{event.description}</h2>
          </div>
        </div>

        <div className="flex flex-row flex-wrap gap-x-10 gap-y-6">
          <div className="speakers flex flex-col gap-2">
            <h2>Speakers</h2>
            <Avatar.Group>
              {event.speakers.map((speaker, index) => (
                <Tooltip key={index} title={speaker.name} placement="top">
                  <Avatar style={{ backgroundColor: "var(--pink)" }}>
                    {speaker.name[0]}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
          <div className="time flex flex-col">
            <h2>Time</h2>
            <h2 className="text-text-secondary">
              {dayjs(event.start_time).format("h:mm A")} -{" "}
              {dayjs(event.end_time).format("h:mm A")}
            </h2>
          </div>
          <div className="links flex flex-col">
            <h2>Links</h2>
            <Link style={{ color: "var(--blue)" }} href={event.private_url}>
              Private Link
              <LinkOutlined />
            </Link>
            {event.public_url && (
              <Link style={{ color: "var(--blue)" }} href={event.public_url}>
                Public Link
                <LinkOutlined />
              </Link>
            )}
          </div>
          <div className="related-events flex flex-col gap-2">
            <h2>Related Events</h2>
            <div className="events-container flex flex-row gap-3 flex-wrap">
              {relatedEvents.length === 0 ? (
                <p>Loading related events...</p>
              ) : (
                relatedEvents.map((event) => (
                  <h2
                    key={event.name}
                    className="border border-blue text-blue rounded p-2"
                  >
                    {event.name}
                  </h2>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
