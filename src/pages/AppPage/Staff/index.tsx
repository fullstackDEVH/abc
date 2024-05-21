import "./index.css";
import toast from "react-hot-toast";
import { Key, useCallback, useState } from "react";
import { Pagination, Select, Table } from "antd";
import { useSearchParams } from "react-router-dom";

// components
import Loading from "@/components//Loading";
import { SweetAlertResult } from "sweetalert2";
import fireSwal from "@/components/SweetAlert";
import StaffCustomerManagemenDetail from "./detail";
import Heading from "@/components/HeadingDetail/User/Heading";
import { ReadStaffManagement } from "@/models/admin/staff-management";
import { useGetListStaffManagement } from "@/services/admin/staff-management/useGetListStaffManagement";
import MultipleSelect, {
  IItemFilterType,
} from "@/components/Filter/MultipleSelect";

// icons
import personGreyIcon from "@/assets/logo/person/person_grey.svg";
import targetGreyIcon from "@/assets/logo/target/target_grey.svg";
import { useDeleteStaffManagementMutation } from "@/services/admin/staff-management/useDeleteStaffManagement";

// supports decrations
import { getColumnsStaff } from "./columns";
import { ModalModeType } from "@/constants";
import usePopupMultiple from "@/hooks/useMultiplesPopup";

const StaffManager = () => {
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();
  const [selectedStaff, setSelectedStaff] =
    useState<ReadStaffManagement | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { isOpen, typePopup, openPopup, closePopup } =
    usePopupMultiple<ModalModeType>();

  const [selectedRecords, setSelectedRecords] = useState<ReadStaffManagement[]>(
    []
  );

  const staffData = useGetListStaffManagement({
    page,
    pagesize,
    searchVal: searchParams.get("q") ?? "",
    roles: ["MANAGER", "USER"],
  });
  const deleteStaffMutation = useDeleteStaffManagementMutation();

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
        deleteStaffMutation.mutateAsync(deleteIds, {
          onSuccess: () => {
            setSelectedRowKeys([]);
            staffData.refetch();
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

  const handleEdit = (record: ReadStaffManagement) => {
    openPopup("edit");
    setSelectedStaff(record);
  };

  const renderItemFilter: IItemFilterType<ReadStaffManagement> = {
    key: "name",
  };

  const handleChooseRecord = useCallback((item: ReadStaffManagement) => {
    setSelectedRecords((pre) => {
      let newRecord: ReadStaffManagement[] = [...pre];
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
      {staffData.isFetching ? <Loading /> : null}

      {isOpen && typePopup && ["create", "edit"].includes(typePopup) ? (
        <StaffCustomerManagemenDetail
          staffManagement={selectedStaff}
          onClose={() => handleClosePopup()}
          onRefreshStaff={staffData.refetch}
        />
      ) : null}
      <div>
        <Heading
          title="Tenant"
          desc="Staff Management"
          buttonProps={{
            text: "Add account",
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
                Staff list
              </h3>

              {/* Filter */}
              <div className="flex_center gap-3">
                <div className="group/filter">
                  <div className="flex_center gap-[6px] p-[14px] cursor-pointer">
                    <img
                      src={personGreyIcon}
                      alt="personGreyIcon"
                      width={20}
                      height={20}
                    />
                    <p className="text-[#475467] font-semibold text-sm">Name</p>
                  </div>

                  <div className="z-50 relative transition-all invisible opacity-0 group-hover/filter:opacity-100 group-hover/filter:visible">
                    <MultipleSelect<ReadStaffManagement>
                      title={`Name (${selectedRecords.length})`}
                      records={staffData.data?.data || []}
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
                      src={targetGreyIcon}
                      alt="targetGreyIcon"
                      width={20}
                      height={20}
                    />
                    <p className="text-[#475467] font-semibold text-sm">Role</p>
                  </div>

                  <div className="z-50 relative transition-all invisible opacity-0 group-hover/filter:opacity-100 group-hover/filter:visible">
                    <MultipleSelect<ReadStaffManagement>
                      title={`Role (${selectedRecords.length})`}
                      records={staffData.data?.data || []}
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
              dataSource={staffData.data?.data || []}
              columns={getColumnsStaff(handleEdit, handleDeletes)}
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
                    total={staffData.data?.total || 0}
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

export default StaffManager;
