import "./index.css";
import toast from "react-hot-toast";
import { Key, useCallback, useState } from "react";
import { Pagination, Select, Table } from "antd";

// components
import StaffCustomerManagemenDetail from "./detail";
import Heading from "@/components/HeadingDetail/User/Heading";
import { ReadStaffManagement } from "@/models/admin/staff-management";
import MultipleSelect, {
  IItemFilterType,
} from "@/components/Filter/MultipleSelect";

// icons
import personGreyIcon from "@/assets/logo/person/person_grey.svg";
import targetGreyIcon from "@/assets/logo/target/target_grey.svg";

// supports decrations
import { getColumnsStaff } from "./columns";
import { ModalModeType } from "@/constants";
import usePopupMultiple from "@/hooks/useMultiplesPopup";
import PopupDelete from "@/components/Popup/Delete";
import StaffAssingerPage from "./assigner";

const staffData: { total: number; data: ReadStaffManagement[] } = {
  total: 3,
  data: [
    {
      id: 7198887589678588,
      email: "manager2@gmail.com",
      phone: "0385151582",
      name: "manager2",
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
      role: "MANAGER",
      created_at: "2024-05-22T03:29:10.487749+00:00",
      updated_at: "2024-05-22T03:29:10.487768+00:00",
    },
    {
      id: 7197939640496726,
      email: "mrthuy_user@rainscale.com",
      phone: "0000000000",
      name: "MrThuy",
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
      role: "MANAGER",
      created_at: "2024-05-19T12:42:21.790238+00:00",
      updated_at: "2024-05-19T12:42:21.790255+00:00",
    },
    {
      id: 7197873253443084,
      email: "manager1@rainscale.com.vn",
      phone: "0000000000",
      name: "RS Manager 1",
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
      role: "MANAGER",
      created_at: "2024-05-19T08:18:34.050138+00:00",
      updated_at: "2024-05-19T08:18:34.050175+00:00",
    },
  ],
};

const StaffManager = () => {
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [selectedStaff, setSelectedStaff] =
    useState<ReadStaffManagement | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const { isOpen, typePopup, openPopup, closePopup } = usePopupMultiple<
    ModalModeType | "assigner"
  >();

  const [selectedRecords, setSelectedRecords] = useState<ReadStaffManagement[]>(
    []
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleDeletes = (deleteIds: string[]): void => {
    if (deleteIds.length == 0) {
      return;
    }

    if (typePopup === "delete" && isOpen) {
      toast.success(
        `${deleteIds.length} item${
          deleteIds.length > 1 ? "s" : ""
        } has been deleted.`
      );
    } else {
      setSelectedRowKeys((pre) => [...pre, ...deleteIds]);
      openPopup("delete");
    }
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
      {isOpen && typePopup && ["assigner"].includes(typePopup) ? (
        <StaffAssingerPage onClose={() => handleClosePopup()} />
      ) : null}
      {isOpen && typePopup && ["create", "edit"].includes(typePopup) ? (
        <StaffCustomerManagemenDetail
          staffManagement={selectedStaff}
          onClose={() => handleClosePopup()}
        />
      ) : null}

      {isOpen && typePopup && ["delete"].includes(typePopup) ? (
        <PopupDelete
          propButtonCancel={{
            onClick: () => {
              closePopup();
            },
          }}
          propButtonOK={{
            onClick: () => {
              handleDeletes(selectedRowKeys as string[]);
            },
          }}
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
                      records={staffData.data || []}
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
                      records={staffData.data || []}
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
              dataSource={staffData.data || []}
              columns={getColumnsStaff(handleEdit, handleDeletes, () =>
                openPopup("assigner")
              )}
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
                    total={staffData.total || 0}
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
