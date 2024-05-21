import "./index.css";
import toast from "react-hot-toast";
import { Key, useCallback, useState } from "react";
import { Pagination, Select, Table } from "antd";
import { useSearchParams } from "react-router-dom";

// components
import Heading from "../../../components/HeadingDetail/User/Heading";
import Loading from "@/components//Loading";
import { SweetAlertResult } from "sweetalert2";
import fireSwal from "@/components/SweetAlert";
import MultipleSelect, {
  IItemFilterType,
} from "@/components/Filter/MultipleSelect";
import AreaDetailModal from "./detail";

// icons
import locationGreyIcon from "@/assets/logo/location/location_grey.svg";
import cameraGreyIcon from "@/assets/logo/camera/camera_grey.svg";

// models
import { Area } from "@/models/area";

// services
import { useGetListArea } from "@/services/area/useGetListArea";
import { useDeleteAreaMutation } from "@/services/area/useDeleteArea";

// supports decrations
import { getColumns } from "./columns";
import { ModalModeType } from "@/constants";
import usePopupMultiple from "@/hooks/useMultiplesPopup";

const AreaPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();
  const [selectedStaff, setSelectedStaff] = useState<Area | null>(null);

  const { isOpen, typePopup, openPopup, closePopup } =
    usePopupMultiple<ModalModeType>();

  const [selectedRecords, setSelectedRecords] = useState<Area[]>([]);

  const areaData = useGetListArea({
    page,
    pagesize,
    searchVal: searchParams.get("q") ?? "",
  });
  const deleteAreaMutation = useDeleteAreaMutation();

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleDeletes = (deleteIds: string[]) => {
    if (deleteIds.length == 0) {
      return;
    }

    fireSwal({
      title: "Are you sure?",
      text: `Delete ${deleteIds.length} item${
        deleteIds.length > 1 ? "s" : ""
      }?`,
      icon: "warning",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        deleteAreaMutation.mutateAsync(deleteIds, {
          onSuccess: () => {
            setSelectedRowKeys([]);
            areaData.refetch();
            toast.success(
              `${deleteIds.length} item${
                deleteIds.length > 1 ? "s" : ""
              } has been deleted.`
            );
          },
          onError: (err) => {
            toast.error(err.message);
          },
        });
      }
    });
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
      {areaData.isFetching ? <Loading /> : null}

      {isOpen && typePopup && ["create", "edit"].includes(typePopup) ? (
        <AreaDetailModal
          AreaDetail={selectedStaff}
          onClose={() => handleClosePopup()}
          onRefreshStaff={areaData.refetch}
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
                      records={areaData.data?.data || []}
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
                      records={areaData.data?.data || []}
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
              dataSource={areaData.data?.data || []}
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
                    total={areaData.data?.total || 0}
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
