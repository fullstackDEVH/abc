import "./index.css";
import toast from "react-hot-toast";
import { Key, useEffect, useState } from "react";
import { Pagination, Select, Table } from "antd";
import { Link, useSearchParams } from "react-router-dom";

// components
import Loading from "@/components/Loading";
import fireSwal from "@/components/SweetAlert";
import HeadingDetail from "@/components/HeadingDetail";

// declarations supports
import { getColumnsStaffManagement } from "./columns";

// model
import { SweetAlertResult } from "sweetalert2";

// services
import { useGetListStaffManagement } from "@/services/admin/staff-management/useGetListStaffManagement";
import { useDeleteStaffManagementMutation } from "@/services/admin/staff-management/useDeleteStaffManagement";

/**
 * Route for staff management page side => /admin/staff
 */
const StaffManagementPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();

  const staffData = useGetListStaffManagement({
    page,
    pagesize,
    searchVal: searchParams.get("q") ?? "",
  });
  const deleteStaffMutation = useDeleteStaffManagementMutation();

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  useEffect(() => {
    if (page !== 1) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagesize]);

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

  const handleEdit = () => {
    alert("edit record");
  };

  return (
    <>
      {staffData.isFetching ? <Loading /> : null}

      <div>
        <HeadingDetail
          breadcrumbRoutes={[
            {
              title: <Link to={"/admin/staff"}>Staff management</Link>,
            },
            {
              title: "Staff list",
            },
          ]}
          buttonProps={{
            text: "Add new",
            onClick: () => alert("button click"),
          }}
        />

        {/* Main */}
        <div className="mt-6 flex flex-col gap-4 bg-white border border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] px-[14px] py-4 rounded-xl">
          {/* title table */}
          <div className="pt-[10px] px-10">
            <h3 className="font-bold text-[20px] leading-[30px] text-[#0E2259]">
              Staff list
            </h3>
          </div>
          {/* table */}
          <Table
            dataSource={staffData.data?.data || []}
            columns={getColumnsStaffManagement(handleEdit, handleDeletes)}
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
    </>
  );
};

export default StaffManagementPage;
