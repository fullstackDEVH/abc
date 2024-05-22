import "./index.css";

import { Select, Table } from "antd";
import { Key, useState } from "react";
import { Event } from "@/models/event";
import { getColumns } from "./columns";
import EventAssingerPage from "./assigner";

const eventData: {
  total: number;
  data: Event[];
} = {
  total: 10,
  data: [
    {
      _id: "664d6d2b09356123bf08cd80",
      event_type: "PPE01",
      status: "OPEN",
      image_url:
        "http://47.128.81.230:8001/emagic-event/1716350243.3697019_PPE01.jpg",
      video_url:
        "http://47.128.81.230:8001/emagic-event/1716350243.369699_PPE01.mp4",
      camera: {
        id: 7197878761902219,
        name: "Camera 1",
        url: "http://117.2.164.10:18080/live/stream_1.flv",
        status: "ONLINE",
        screenshot: null,
        area: {
          id: 7197875081807307,
          name: "RS Area 2",
          address: "Address of area 1",
          tenant: {
            id: 7197873089592599,
            name: "RAINSCALE",
            logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
            contact: "Admin Rainscale",
            phone: "0000000000",
            website: "https://rainscale.com.vn",
            email: "admin1@rainscale.com.vn",
            created_at: "2024-05-19T08:17:54.574000",
            updated_at: "2024-05-19T08:17:54.575000",
          },
          created_at: "2024-05-19T08:25:49.555000",
          updated_at: "2024-05-21T09:44:38.831000",
        },
        created_at: "2024-05-19T08:40:26.958000",
        updated_at: "2024-05-19T08:40:26.958000",
      },
      event_time: "2024-05-22T03:57:31.435000",
      created_at: "2024-05-22T03:57:31.736000",
      updated_at: "2024-05-22T03:57:31.736000",
    },
    {
      _id: "664d6c4209356123bf08cd7f",
      event_type: "HM05",
      status: "OPEN",
      image_url:
        "http://47.128.81.230:8001/emagic-event/1716350004.667447_HM07.jpg",
      video_url:
        "http://47.128.81.230:8001/emagic-event/1716350004.667441_HM07.mp4",
      camera: {
        id: 7197878761902219,
        name: "Camera 1",
        url: "http://117.2.164.10:18080/live/stream_1.flv",
        status: "ONLINE",
        screenshot: null,
        area: {
          id: 7197875081807307,
          name: "RS Area 2",
          address: "Address of area 1",
          tenant: {
            id: 7197873089592599,
            name: "RAINSCALE",
            logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
            contact: "Admin Rainscale",
            phone: "0000000000",
            website: "https://rainscale.com.vn",
            email: "admin1@rainscale.com.vn",
            created_at: "2024-05-19T08:17:54.574000",
            updated_at: "2024-05-19T08:17:54.575000",
          },
          created_at: "2024-05-19T08:25:49.555000",
          updated_at: "2024-05-21T09:44:38.831000",
        },
        created_at: "2024-05-19T08:40:26.958000",
        updated_at: "2024-05-19T08:40:26.958000",
      },
      event_time: "2024-05-22T03:53:38.541000",
      created_at: "2024-05-22T03:53:38.821000",
      updated_at: "2024-05-22T03:53:38.821000",
    },
    {
      _id: "664d6b6509356123bf08cd7e",
      event_type: "HM05",
      status: "OPEN",
      image_url:
        "http://47.128.81.230:8001/emagic-event/1716349788.6016371_HM05.jpg",
      video_url:
        "http://47.128.81.230:8001/emagic-event/1716349788.6016278_HM05.mp4",
      camera: {
        id: 7197878761902219,
        name: "Camera 1",
        url: "http://117.2.164.10:18080/live/stream_1.flv",
        status: "ONLINE",
        screenshot: null,
        area: {
          id: 7197875081807307,
          name: "RS Area 2",
          address: "Address of area 1",
          tenant: {
            id: 7197873089592599,
            name: "RAINSCALE",
            logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
            contact: "Admin Rainscale",
            phone: "0000000000",
            website: "https://rainscale.com.vn",
            email: "admin1@rainscale.com.vn",
            created_at: "2024-05-19T08:17:54.574000",
            updated_at: "2024-05-19T08:17:54.575000",
          },
          created_at: "2024-05-19T08:25:49.555000",
          updated_at: "2024-05-21T09:44:38.831000",
        },
        created_at: "2024-05-19T08:40:26.958000",
        updated_at: "2024-05-19T08:40:26.958000",
      },
      event_time: "2024-05-22T03:49:57.256000",
      created_at: "2024-05-22T03:49:57.529000",
      updated_at: "2024-05-22T03:49:57.529000",
    },
    {
      _id: "664d6d2b09356123bf08c3d80",
      event_type: "PPE01",
      status: "OPEN",
      image_url:
        "http://47.128.81.230:8001/emagic-event/1716350243.3697019_PPE01.jpg",
      video_url:
        "http://47.128.81.230:8001/emagic-event/1716350243.369699_PPE01.mp4",
      camera: {
        id: 7197878761902219,
        name: "Camera 1",
        url: "http://117.2.164.10:18080/live/stream_1.flv",
        status: "ONLINE",
        screenshot: null,
        area: {
          id: 7197875081807307,
          name: "RS Area 2",
          address: "Address of area 1",
          tenant: {
            id: 7197873089592599,
            name: "RAINSCALE",
            logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
            contact: "Admin Rainscale",
            phone: "0000000000",
            website: "https://rainscale.com.vn",
            email: "admin1@rainscale.com.vn",
            created_at: "2024-05-19T08:17:54.574000",
            updated_at: "2024-05-19T08:17:54.575000",
          },
          created_at: "2024-05-19T08:25:49.555000",
          updated_at: "2024-05-21T09:44:38.831000",
        },
        created_at: "2024-05-19T08:40:26.958000",
        updated_at: "2024-05-19T08:40:26.958000",
      },
      event_time: "2024-05-22T03:57:31.435000",
      created_at: "2024-05-22T03:57:31.736000",
      updated_at: "2024-05-22T03:57:31.736000",
    },
    {
      _id: "664d6c4209356123bf028cd7f",
      event_type: "HM05",
      status: "OPEN",
      image_url:
        "http://47.128.81.230:8001/emagic-event/1716350004.667447_HM07.jpg",
      video_url:
        "http://47.128.81.230:8001/emagic-event/1716350004.667441_HM07.mp4",
      camera: {
        id: 7197878761902219,
        name: "Camera 1",
        url: "http://117.2.164.10:18080/live/stream_1.flv",
        status: "ONLINE",
        screenshot: null,
        area: {
          id: 7197875081807307,
          name: "RS Area 2",
          address: "Address of area 1",
          tenant: {
            id: 7197873089592599,
            name: "RAINSCALE",
            logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
            contact: "Admin Rainscale",
            phone: "0000000000",
            website: "https://rainscale.com.vn",
            email: "admin1@rainscale.com.vn",
            created_at: "2024-05-19T08:17:54.574000",
            updated_at: "2024-05-19T08:17:54.575000",
          },
          created_at: "2024-05-19T08:25:49.555000",
          updated_at: "2024-05-21T09:44:38.831000",
        },
        created_at: "2024-05-19T08:40:26.958000",
        updated_at: "2024-05-19T08:40:26.958000",
      },
      event_time: "2024-05-22T03:53:38.541000",
      created_at: "2024-05-22T03:53:38.821000",
      updated_at: "2024-05-22T03:53:38.821000",
    },
    {
      _id: "664d6b6509356123bf08c1d7e",
      event_type: "HM05",
      status: "OPEN",
      image_url:
        "http://47.128.81.230:8001/emagic-event/1716349788.6016371_HM05.jpg",
      video_url:
        "http://47.128.81.230:8001/emagic-event/1716349788.6016278_HM05.mp4",
      camera: {
        id: 7197878761902219,
        name: "Camera 1",
        url: "http://117.2.164.10:18080/live/stream_1.flv",
        status: "ONLINE",
        screenshot: null,
        area: {
          id: 7197875081807307,
          name: "RS Area 2",
          address: "Address of area 1",
          tenant: {
            id: 7197873089592599,
            name: "RAINSCALE",
            logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
            contact: "Admin Rainscale",
            phone: "0000000000",
            website: "https://rainscale.com.vn",
            email: "admin1@rainscale.com.vn",
            created_at: "2024-05-19T08:17:54.574000",
            updated_at: "2024-05-19T08:17:54.575000",
          },
          created_at: "2024-05-19T08:25:49.555000",
          updated_at: "2024-05-21T09:44:38.831000",
        },
        created_at: "2024-05-19T08:40:26.958000",
        updated_at: "2024-05-19T08:40:26.958000",
      },
      event_time: "2024-05-22T03:49:57.256000",
      created_at: "2024-05-22T03:49:57.529000",
      updated_at: "2024-05-22T03:49:57.529000",
    },
  ],
};

const EventPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [pagesize, setPageSize] = useState(10);
  const [openPopup, setOpenPopup] = useState<"assigner" | null>(null);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  return (
    <div>
      {openPopup === "assigner" ? (
        <EventAssingerPage onClose={() => setOpenPopup(null)} />
      ) : null}
      <div className="px-8 pt-[16px] flex-1">
        <div className="flex flex-col">
          <h2 className="text-[#64748B] text-[20px] leading-[25px] tracking-[0.2px] font-semibold">
            Events Management
          </h2>

          <div className="flex-1 flex flex-col gap-4 bg-white border border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] mt-4 rounded-xl">
            {/* title table */}
            <div className="flex justify-between items-center pt-5 px-5">
              <h3 className="font-bold text-[20px] leading-[30px] text-[#0E2259]">
                Event list
              </h3>

              <div className="flex items-center gap-4">
                <span className="text-[#0F172A] text-base font-semibold">
                  Show rows:
                </span>
                <Select
                  defaultValue={10}
                  style={{ width: 122, height: 48 }}
                  value={pagesize}
                  onChange={(value) => {
                    setPageSize(!isNaN(+value) ? +value : 10);
                  }}
                  options={[
                    { value: 10, label: "10 items" },
                    { value: 20, label: "20 items" },
                    { value: 50, label: "50 items" },
                  ]}
                />
              </div>
            </div>

            <Table
              className="p-2 px-5 flex-1"
              dataSource={eventData.data}
              rowKey="_id"
              columns={getColumns(() => {
                setOpenPopup("assigner");
              })}
              rowSelection={rowSelection}
              scroll={{ y: "calc(100vh - 300px)" }}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
