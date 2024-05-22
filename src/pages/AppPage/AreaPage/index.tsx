import "./index.css";
import { Key, useCallback, useState } from "react";
import { Pagination, Select, Table } from "antd";

// components
import Heading from "../../../components/HeadingDetail/User/Heading";
import MultipleSelect, {
  IItemFilterType,
} from "@/components/Filter/MultipleSelect";
import AreaDetailModal from "./detail";

// icons
import locationGreyIcon from "@/assets/logo/location/location_grey.svg";
import cameraGreyIcon from "@/assets/logo/camera/camera_grey.svg";

// models
import { Area, ListAreaResponse } from "@/models/area";

// supports decrations
import { getColumns } from "./columns";
import { ModalModeType } from "@/constants";
import usePopupMultiple from "@/hooks/useMultiplesPopup";

const areaData: ListAreaResponse = {
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

const AreaPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [selectedStaff, setSelectedStaff] = useState<Area | null>(null);

  const { isOpen, typePopup, openPopup, closePopup } =
    usePopupMultiple<ModalModeType>();

  const [selectedRecords, setSelectedRecords] = useState<Area[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleDeletes = (deleteIds: string[]) => {
    if (deleteIds.length == 0) {
      return;
    }

    alert("delete")
  };

  const handleEdit = (record: Area) => {
    openPopup("edit");
    setSelectedStaff(record);
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

  const handleClosePopup = () => {
    setSelectedStaff(null);
    closePopup();
  };

  return (
    <>
      {isOpen && typePopup && ["create", "edit"].includes(typePopup) ? (
        <AreaDetailModal
          AreaDetail={selectedStaff}
          onClose={() => handleClosePopup()}
        />
      ) : null}
      <div>
        <Heading
          title="Area"
          desc="Area Management"
          buttonProps={{
            text: "Add area",
            onClick: () => {
              openPopup("create");
            },
          }}
        />

        {/* Main */}
        <div className="flex flex-col gap-4 bg-white border border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] mt-10 mx-[33.5px] mb-[61px] rounded-xl">
          <div className="p-[14px]">
            {/* title table */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-[20px] leading-[30px] text-[#0E2259]">
                Area list
              </h3>

              {/* Filter */}
              <div className="flex_center gap-3">
                <div className="group/filter">
                  <div className="flex_center gap-[6px] p-[14px] cursor-pointer">
                    <img
                      src={cameraGreyIcon}
                      alt="cameraGreyIcon"
                      width={20}
                      height={20}
                    />
                    <p className="text-[#475467] font-semibold text-sm">
                      Camera
                    </p>
                  </div>

                  <div className="z-50 relative transition-all invisible opacity-0 group-hover/filter:opacity-100 group-hover/filter:visible">
                    <MultipleSelect<Area>
                      title={`Camera (${selectedRecords.length})`}
                      records={areaData.data || []}
                      itemChoose={renderItemFilter}
                      selectedRecords={selectedRecords}
                      handleChooseRecord={handleChooseRecord}
                      handleRemoveChoose={handleRemoveChoose}
                    />
                  </div>
                </div>

                <div className="group/filter">
                  <div className="flex_center gap-[6px] p-[14px] cursor-pointer">
                    <img
                      src={locationGreyIcon}
                      alt="locationGreyIcon"
                      width={20}
                      height={20}
                    />
                    <p className="text-[#475467] font-semibold text-sm">
                      Address
                    </p>
                  </div>

                  <div className="z-50 relative transition-all invisible opacity-0 group-hover/filter:opacity-100 group-hover/filter:visible">
                    <MultipleSelect<Area>
                      title={`Address (${selectedRecords.length})`}
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

            {/* table */}
            <Table
              dataSource={areaData.data || []}
              columns={getColumns(handleEdit, handleDeletes)}
              rowSelection={rowSelection}
              rowKey={"id"}
              scroll={{ x: 1100, y: 504 }}
              footer={() => (
                <div className="flex items-center justify-between bg-white">
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
                  <Pagination
                    current={page}
                    pageSize={pagesize}
                    total={areaData.total || 0}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              )}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AreaPage;
