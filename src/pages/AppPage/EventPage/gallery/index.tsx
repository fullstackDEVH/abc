import { EventTypeList } from "@/constants";
import { Area } from "@/models/area";
import { Event } from "@/models/event";
import { Col, Image, Modal, Row, Tag, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import Gallery from "react-image-gallery";
import noImage from "@/assets/images/no_image.jpeg";

type EventGalleryProps = {
  events: Event[];
  currentEvent: Event;
  setCurrentEvent: (event: Event) => void;
  toggle: () => void;
  loadMore: (currEvent: Event) => void;
};

const EventGallery: React.FC<EventGalleryProps> = ({
  events,
  toggle,
  currentEvent,
  setCurrentEvent,
  loadMore,
}) => {
  const handleChangeSlide = (index: number) => {
    if (index === events.length - 1) {
      loadMore(events[index]);
    }
    setCurrentEvent(events[index]);
  };

  return (
    <Modal open={true} footer={null} onCancel={toggle} width="70%">
      <Typography.Title level={4}>
        {currentEvent
          ? EventTypeList.find(
              (e) => e.id === (currentEvent as Event)?.event_type
            )?.name
          : ""}
      </Typography.Title>
      <Row>
        <Col span={16}>
          <Gallery
            onErrorImageURL={noImage}
            items={
              events?.map((event) => ({
                ...event,
                original: event.image_url,
                thumbnail: event.image_url,
              })) || []
            }
            startIndex={
              events && currentEvent
                ? events?.findIndex((e) => {
                    return e._id === currentEvent._id;
                  })
                : 0
            }
            infinite={false}
            showIndex={true}
            showFullscreenButton={false}
            lazyLoad={true}
            showPlayButton={false}
            onBeforeSlide={handleChangeSlide}
            renderItem={(item) =>
              currentEvent.video_url ? (
                <video
                  autoPlay
                  src={currentEvent.video_url}
                  className="w-full h-full object-cover"
                />
              ) : currentEvent.image_url ? (
                <Image
                  src={item.original}
                  preview={false}
                  fallback={noImage}
                  alt={item.original}
                  className="w-full h-full object-cover"
                />
              ) : null
            }
          />
        </Col>
        <Col span={8} className="px-1 pl-5">
          <div className="p-3 pl-5 shadow-2xl rounded-lg">
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
            <hr className="mb-2" />
            <div className="mb-4">
              <div className="mb-1 text-xs text-slate-400 italic">Category</div>
              <Tag color="green">{currentEvent?.event_type}</Tag>
            </div>
            <div className="mb-4">
              <div className="mb-1 text-xs text-slate-400 italic">Business</div>
              <div>
                {
                  EventTypeList.find((e) => e.id === currentEvent?.event_type)
                    ?.name
                }
              </div>
            </div>
            <div>
              <div className="mb-1 text-xs text-slate-400 italic">
                Description
              </div>
              <div>
                {
                  EventTypeList.find((e) => e.id === currentEvent?.event_type)
                    ?.label
                }
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default EventGallery;
