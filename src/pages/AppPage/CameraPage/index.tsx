import "./index.css";
import { Table } from "antd";
import { Key, useCallback, useState } from "react";
import { getColumns } from "./columns";
import { Camera } from "@/models/camera";
import CameraDetailModal from "./detail";
import { ModalModeType } from "@/constants";
import toast from "react-hot-toast";
import Heading from "@/components/HeadingDetail/User/Heading";
import MultipleSelect, {
  IItemFilterType,
} from "@/components/Filter/MultipleSelect";
import { Area } from "@/models/area";
import locationIcon from "@/assets/logo/location/location_grey.svg";
import PopupDelete from "@/components/Popup/Delete";

const areaData = {
  total: 3,
  data: [
    {
      id: 7198643381730451,
      name: "area5",
      address: "area5 qng",
      tenant: {
        id: 7197873089592599,
        name: "RAINSCALE",
        logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
        contact: "Admin Rainscale",
        phone: "0000000000",
        website: "https://rainscale.com.vn",
        email: "admin1@rainscale.com.vn",
        created_at: "2024-05-19T08:17:54.574980+00:00",
        updated_at: "2024-05-19T08:17:54.575001+00:00",
      },
      created_at: "2024-05-21T11:18:46.531347+00:00",
      updated_at: "2024-05-21T11:18:46.531358+00:00",
    },
    {
      id: 7198640659119645,
      name: "DN Area3",
      address: "QNG",
      tenant: {
        id: 7197873089592599,
        name: "RAINSCALE",
        logo: "logo/2fe89f29-11c1-45a5-9a38-a7f690ab3d21-logo.jpg",
        contact: "Admin Rainscale",
        phone: "0000000000",
        website: "https://rainscale.com.vn",
        email: "admin1@rainscale.com.vn",
        created_at: "2024-05-19T08:17:54.574980+00:00",
        updated_at: "2024-05-19T08:17:54.575001+00:00",
      },
      created_at: "2024-05-21T11:07:57.410475+00:00",
      updated_at: "2024-05-21T11:07:57.410486+00:00",
    },
    {
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
        created_at: "2024-05-19T08:17:54.574980+00:00",
        updated_at: "2024-05-19T08:17:54.575001+00:00",
      },
      created_at: "2024-05-19T08:25:49.555895+00:00",
      updated_at: "2024-05-21T09:44:38.831735+00:00",
    },
  ],
};

const cameraData: {
  total: number;
  data: Camera[];
} = {
  total: 2,
  data: [
    {
      id: 719789985292616,
      name: "Camera 2",
      url: "http://117.2.164.10:18080/live/stream_2.flv",
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
          created_at: "2024-05-19T08:17:54.574980+00:00",
          updated_at: "2024-05-19T08:17:54.575001+00:00",
        },
        created_at: "2024-05-19T08:25:49.555895+00:00",
        updated_at: "2024-05-21T09:44:38.831735+00:00",
      },
      created_at: "2024-05-19T08:45:18.637763+00:00",
      updated_at: "2024-05-19T08:45:18.637814+00:00",
    },
    {
      id: 719788761902219,
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
          created_at: "2024-05-19T08:17:54.574980+00:00",
          updated_at: "2024-05-19T08:17:54.575001+00:00",
        },
        created_at: "2024-05-19T08:25:49.555895+00:00",
        updated_at: "2024-05-21T09:44:38.831735+00:00",
      },
      created_at: "2024-05-19T08:40:26.958322+00:00",
      updated_at: "2024-05-19T08:40:26.958359+00:00",
    },
    {
      id: 719787876192219,
      name: "Camera 1",
      url: "http://117.2.164.10:18080/live/stream_1.flv",
      status: "OFFLINE",
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
          created_at: "2024-05-19T08:17:54.574980+00:00",
          updated_at: "2024-05-19T08:17:54.575001+00:00",
        },
        created_at: "2024-05-19T08:25:49.555895+00:00",
        updated_at: "2024-05-21T09:44:38.831735+00:00",
      },
      created_at: "2024-05-19T08:40:26.958322+00:00",
      updated_at: "2024-05-19T08:40:26.958359+00:00",
    },
  ],
};

const CameraPage = () => {
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [modeModal, setModeModal] = useState<ModalModeType>(null);
  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const [selectedRecords, setSelectedRecords] = useState<Area[]>([]);

  const handleDeletes = (deleteIds: string[]) => {
    if (deleteIds.length == 0) {
      return;
    }

    if (modeModal === "delete") {
      toast.success(
        `${deleteIds.length} item${
          deleteIds.length > 1 ? "s" : ""
        } has been deleted.`
      );
    } else {
      setSelectedRowKeys((pre) => [...pre, ...deleteIds]);
      setModeModal("delete");
    }
  };

  const handleEdit = (record: Camera) => {
    setModeModal("edit");
    setSelectedCamera(record);
  };

  const handleView = (record: Camera) => {
    setModeModal("info");
    setSelectedCamera(record);
  };

  const openCreateModal = () => {
    setModeModal("create");
    setSelectedCamera(null);
  };

  const handleCloseModal = () => {
    setModeModal(null);
    setSelectedCamera(null);
  };

  const renderItemFilter: IItemFilterType<Area> = {
    key: "name",
  };

  const handleChooseRecord = useCallback((item: Area) => {
    setSelectedRecords((pre) => {
      let newRecord: Area[] = [...pre];
      const indexExist = pre.findIndex((preRecord) => preRecord.id === item.id);

      if (indexExist !== -1) {
        newRecord = newRecord.filter((record) => record.id !== item.id);
        return newRecord;
      } else {
        newRecord.push(item);
      }
      return newRecord;
    });
  }, []);

  const handleRemoveChoose = useCallback(() => {
    setSelectedRecords([]);
  }, []);
  console.log(modeModal);
  
  return (
    <div>
      {modeModal && ["delete"].includes(modeModal) ? (
        <PopupDelete
          propButtonCancel={{
            onClick: () => {
              setModeModal(null);
            },
          }}
          propButtonOK={{
            onClick: () => {
              handleDeletes(selectedRowKeys as string[]);
            },
          }}
        />
      ) : null}
      {modeModal &&  ["create", "info", "edit"].includes(modeModal) && (
        <CameraDetailModal
          camera={selectedCamera}
          mode={modeModal}
          toggle={handleCloseModal}
        />
      )}
      <Heading
        title="Camera"
        desc="Camera Management"
        buttonProps={{
          text: "Add camera",
          onClick: () => {
            openCreateModal();
          },
        }}
      />

      <div className="flex flex-col gap-4 bg-white border border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] mt-10 mx-[33.5px] mb-[61px] rounded-xl">
        <div className="p-[14px]">
          {/* title table */}
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[20px] leading-[30px] text-[#0E2259]">
              Camera list
            </h3>

            {/* Filter */}
            <div className="flex_center gap-3">
              <div className="group/filter">
                <div className="flex_center gap-[6px] p-[14px] cursor-pointer">
                  <img
                    src={locationIcon}
                    alt="personGreyIcon"
                    width={20}
                    height={20}
                  />
                  <p className="text-[#475467] font-semibold text-sm">Name</p>
                </div>

                <div className="z-50 relative transition-all invisible opacity-0 group-hover/filter:opacity-100 group-hover/filter:visible">
                  <MultipleSelect<Area>
                    title={`Name (${selectedRecords.length})`}
                    records={areaData.data || []}
                    itemChoose={renderItemFilter}
                    selectedRecords={selectedRecords}
                    handleChooseRecord={handleChooseRecord}
                    handleRemoveChoose={handleRemoveChoose}
                  />
                </div>
              </div>
            </div>
          </div>

          <Table
            dataSource={cameraData?.data || []}
            rowKey="id"
            columns={getColumns(handleView, handleEdit, handleDeletes)}
            rowSelection={rowSelection}
            pagination={{
              total: cameraData?.total || 0,
              pageSize: pagesize,
              current: page,
              pageSizeOptions: ["10", "20", "50"],
              showSizeChanger: false,
              onChange(page, pageSize) {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default CameraPage;
