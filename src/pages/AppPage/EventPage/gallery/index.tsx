import { EventTypeList } from "@/constants";
import { Area } from "@/models/area";
import { Event } from "@/models/event";
import { Col, Modal, Row, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Gallery from "react-image-gallery";

type EventGalleryProps = {
  events: Event[];
  selectedEvent: Event | null;
  toggle: () => void;
};

const EventGallery: React.FC<EventGalleryProps> = ({
  events,
  toggle,
  selectedEvent,
}) => {
  const [currentEvent, setCurrentEvent] = useState<Event | null>(selectedEvent);
  useEffect(() => {
    if (events?.length > 0) {
      setCurrentEvent(events[0]);
    }
    if (selectedEvent) {
      setCurrentEvent(selectedEvent);
    }
  }, [events, selectedEvent]);

  const handleChangeSlide = (index: number) => {
    console.log(index);
    setCurrentEvent(events[index]);
  };

  return (
    <Modal open={true} footer={null} onCancel={toggle} width="70%">
      <Typography.Title level={4}>
        {currentEvent
          ? EventTypeList.find(
              (e) => e.id === (currentEvent as Event)?.event_type
            )?.label
          : ""}
      </Typography.Title>
      <Row>
        <Col span={16}>
          <Gallery
            items={
              events?.map((event) => ({
                ...event,
                original: event.processed_image_url,
                thumbnail: event.processed_image_url,
              })) || []
            }
            startIndex={
              events && currentEvent
                ? events?.findIndex((e) => {
                    return e.id === currentEvent.id;
                  })
                : 0
            }
            infinite={false}
            showIndex={true}
            showFullscreenButton={false}
            showPlayButton={false}
            onBeforeSlide={handleChangeSlide}
          />
        </Col>
        <Col span={8} className="px-1 pl-5">
          <div className="p-3 pl-5 h-full shadow-2xl">
            <div className="mb-4">
              <div className="mb-1 text-xs text-slate-400 italic">Time</div>
              <div>
                {currentEvent?.event_time
                  ? dayjs(currentEvent.event_time).format("DD MMM YYYY HH:mm")
                  : ""}
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-1 text-xs text-slate-400 italic">Location</div>
              <div>{(currentEvent?.camera?.area as Area)?.name}</div>
            </div>
            <div className="mb-4">
              <div className="mb-1 text-xs text-slate-400 italic">Camera</div>
              <div>{currentEvent?.camera?.name}</div>
            </div>
            <hr className="mb-2"/>
            <div className="mb-4">
              <div className="mb-1 text-xs text-slate-400 italic">Category</div>
              <div>{currentEvent?.event_type || "--"}</div>
            </div>
            <div>
              <div className="mb-1 text-xs text-slate-400 italic">Status</div>
              <div>
              <Tag color={currentEvent?.status === "VERIFIED" ? "green" :  currentEvent?.status === "OPEN" ? "orange" : "default"}>{currentEvent?.status}</Tag>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default EventGallery;
