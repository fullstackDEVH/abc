import { Table, Select, DatePicker } from "antd";
import { Key, useEffect, useMemo, useState } from "react";
import { SweetAlertResult } from "sweetalert2";
import fireSwal from "@/components/SweetAlert";
import { Event } from "@/models/event";
import { useGetListEvent } from "@/services/event/useGetListEvent";
import { useGetListCamera } from "@/services/camera/useGetListCamera";
import { EventTypeList, ModalModeType } from "@/constants";
import { getColumns } from "./columns";
import { useGetListArea } from "@/services/area/useGetListArea";
import EventGallery from "./gallery";
import useEventSocket from "@/services/event/useEventSocket";
import Heading from "@/components/HeadingDetail/User/Heading";

const { RangePicker } = DatePicker;
const EventPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const socket = useEventSocket();
  const [filterCamera, setFilterCamera] = useState<string[]>([]);
  const [filterArea, setFilterArea] = useState<string[]>([]);
  const [filterEventType, setFilterEventType] = useState<string[]>([]);
  const [modeModal, setModeModal] = useState<ModalModeType>(null);
  const [socketEvent, setSocketEvent] = useState<Event | null>(null);
  const [listEvent, setListEvent] = useState<Event[]>([]);

  useEffect(() => {
    socket.connect();
    socket.on("emagic-event", handleSocketEvent);
    return () => {
      socket?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const eventData = useGetListEvent({
    cameras: filterCamera,
    status: [],
    event_time: [],
    event_type: filterEventType,
    last_id: "",
  });
  const listArea = useGetListArea({
    page: 1,
    pagesize: 10,
    searchVal: "",
  });

  const listCamera = useGetListCamera({
    page: 1,
    pagesize: 10,
    areas: filterArea,
    searchVal: "",
  });
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleSocketEvent = (data: string) => {
    const event = JSON.parse(data);
    setSocketEvent(event);
  };

  useMemo(() => {
    if (eventData?.data?.pages) {
      const listEvent = eventData.data.pages.map((page) => page.data).flat();
      setListEvent(listEvent);
    }
  }, [eventData?.data?.pages]);

  useMemo(() => {
    if (socketEvent) {
      const newListEvent = [socketEvent, ...listEvent];
      if (selectedEvent) {
        setSelectedEvent(
          newListEvent.find((event) => event._id === selectedEvent._id) || null
        );
      }
      setListEvent(newListEvent);
      setSocketEvent(null);
    }
  }, [socketEvent, listEvent, selectedEvent]);

  const handleView = (record: Event) => {
    setModeModal("info");
    setSelectedEvent(record);
  };

  const handleEdit = (record: Event) => {
    setModeModal("edit");
    setSelectedEvent(record);
  };

  const handleDelete = (record: Event) => {
    fireSwal({
      title: "Are you sure?",
      text: `Delete ${record.event_type}?`,
      icon: "warning",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        fireSwal({
          title: "Deleted!",
          showCancelButton: false,
          text: `${record.event_type} has been deleted.`,
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      {selectedEvent && modeModal === "info" && (
        <EventGallery
          events={listEvent}
          toggle={() => {
            setSelectedEvent(null);
          }}
          currentEvent={selectedEvent}
          setCurrentEvent={setSelectedEvent}
          loadMore={(event: Event) => {
            setSelectedEvent(event);
            eventData.fetchNextPage();
          }}
        />
      )}
      <Heading title="Event" desc="Event Management" />
      <div className="p-2 px-5">
        <div className="flex justify-end w-full space-x-2">
          <Select
            className="w-1/6 h-full truncate"
            size="middle"
            mode="multiple"
            allowClear
            showSearch
            maxTagCount="responsive"
            options={EventTypeList.map((event_type) => ({
              label: event_type.name,
              value: event_type.id,
            }))}
            placeholder="Event types ..."
            onChange={(value) => setFilterEventType(value as string[])}
          />
          <Select
            className="w-1/6 h-full truncate"
            size="middle"
            mode="multiple"
            allowClear
            showSearch
            maxTagCount="responsive"
            options={listArea.data?.data.map((area) => ({
              label: area.name,
              value: area.id,
            }))}
            placeholder="Areas ..."
            onChange={(value) => setFilterArea(value as string[])}
          />
          <Select
            className="w-1/6 h-full truncate"
            size="middle"
            mode="multiple"
            allowClear
            showSearch
            maxTagCount="responsive"
            options={listCamera.data?.data.map((camera) => ({
              label: camera.name,
              value: camera.id,
            }))}
            placeholder="Cameras ..."
            onChange={(value) => setFilterCamera(value as string[])}
          />

          <RangePicker className="w-1/3" showTime />
        </div>
      </div>
      <Table
        className="p-2 px-5"
        dataSource={listEvent}
        rowKey="_id"
        columns={getColumns(handleView, handleEdit, handleDelete)}
        rowSelection={rowSelection}
        onRow={(record) => {
          return {
            onClick: () => handleView(record),
          };
        }}
        scroll={{ y: "calc(100vh - 300px)" }}
        onScroll={(event: any) => {
          const maxScroll =
            event.target.scrollHeight - event.target.clientHeight;
          const currentScroll = event.target.scrollTop;
          if (currentScroll >= maxScroll - 10) {
            eventData.fetchNextPage();
          }
        }}
        pagination={false}
        // pagination={{
        //   total: eventData?.data?.total || 0,
        //   pageSize: pagesize,
        //   current: page,
        //   pageSizeOptions: ["10", "20", "50"],
        //   showSizeChanger: false,
        //   onChange(page, pageSize) {
        //       setPage(page);
        //       setPageSize(pageSize);
        //   },
        // }}
      />
    </div>
  );
};

export default EventPage;
