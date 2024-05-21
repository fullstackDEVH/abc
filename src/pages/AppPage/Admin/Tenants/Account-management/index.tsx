import "./index.css";
import toast from "react-hot-toast";
import { Key, useEffect, useState } from "react";
import { Pagination, Select, Table } from "antd";
import { Link, useSearchParams, useParams } from "react-router-dom";

// components
import Loading from "@/components/Loading";
import AccountManagemenDetail from "./detail";
import fireSwal from "@/components/SweetAlert";
import HeadingDetail from "@/components/HeadingDetail/Admin";

// declarations supports
import { ModalModeType } from "@/constants";
import { getColumnsAccountManagement } from "./columns";

// model
import { SweetAlertResult } from "sweetalert2";
import { AccountManagementRead } from "@/models/admin/account-management";

// hook
import usePopupMultiple from "@/hooks/useMultiplesPopup";

// services
import { useGetListAccountManagement } from "@/services/admin/account-management.ts/useGetListAccountManagement";
import { useDeleteAccountManagementMutation } from "@/services/admin/account-management.ts/useDeleteAccountManagement";

/**
 * Route for account management page side => /admin/account-management/{tenantId}
 */
const AccountManagement = () => {
  const params = useParams();
  const tenantId = params.tenantId ?? "";

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedAccount, setSelectedAccount] =
    useState<AccountManagementRead | null>(null);
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();

  const { isOpen, typePopup, openPopup, closePopup } =
    usePopupMultiple<ModalModeType>();

  const accountsData = useGetListAccountManagement({
    page,
    pagesize,
    tenantId,
    searchVal: searchParams.get("q") ?? "",
  });
  const deleteTenantMutation = useDeleteAccountManagementMutation();

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
        deleteTenantMutation.mutateAsync(deleteIds, {
          onSuccess: () => {
            setSelectedRowKeys([]);
            accountsData.refetch();
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

  const handleEdit = (record: AccountManagementRead) => {
    openPopup("edit");
    setSelectedAccount(record);
  };

  const handleClosePopup = () => {
    closePopup();
    setSelectedAccount(null);
  };

  return (
    <>
      {accountsData.isFetching ? <Loading /> : null}
      {isOpen && typePopup && ["create", "edit"].includes(typePopup) ? (
        <AccountManagemenDetail
          accountManagement={selectedAccount}
          onClose={() => handleClosePopup()}
          onRefreshAccounts={accountsData.refetch}
        />
      ) : null}

      <div className="">
        <HeadingDetail
          breadcrumbRoutes={[
            {
              title: <Link to={"/admin/tenants"}>Tenant management</Link>,
            },
            {
              title: <Link to={"/admin/tenants"}>Tenant list</Link>,
            },
            {
              title: "Account management",
            },
          ]}
          buttonProps={{ text: "Add new", onClick: () => openPopup("create") }}
        />

        {/* Main */}
        <div className="mt-6 flex flex-col gap-4 bg-white border border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] px-[14px] py-4 rounded-xl">
          {/* title table */}
          <div className="pt-[10px] px-10">
            <h3
              className="font-bold text-[20px] leading-[30px] text-[#0E2259]"
              onClick={handleClosePopup}
            >
              Tenant {searchParams.get("tenantName")} account list
            </h3>
          </div>
          {/* table */}
          <Table
            dataSource={accountsData.data?.data || []}
            columns={getColumnsAccountManagement(handleEdit, handleDeletes)}
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
                  total={accountsData.data?.total || 0}
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

export default AccountManagement;
