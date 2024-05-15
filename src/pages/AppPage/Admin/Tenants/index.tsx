import "./index.css";
import { Table } from "antd";
import toast from "react-hot-toast";
import { Key, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// components
import TenantDetail from "./detail";
import Loading from "@/components/Loading";
import fireSwal from "@/components/SweetAlert";
import HeadingDetail from "@/components/HeadingDetail";

// declarations supports
import { getColumnsTenant } from "./columns";
import { ModalModeType } from "@/constants";

// model
import { Tenant } from "@/models/admin/tenant";
import { SweetAlertResult } from "sweetalert2";

// hook
import usePopupMultiple from "@/hooks/useMultiplesPopup";

// services
import { useGetListTenants } from "@/services/admin/tenants/useGetListTenant";
import { useDeleteTenantMutation } from "@/services/admin/tenants/useDeleteTenant";

const TenantsPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { isOpen, typePopup, openPopup, closePopup } =
    usePopupMultiple<ModalModeType>();

  const tenantsData = useGetListTenants({
    page,
    pagesize,
    searchVal: searchParams.get("q") ?? "",
  });

  const deleteTenantMutation = useDeleteTenantMutation();

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
        deleteTenantMutation.mutateAsync(deleteIds, {
          onSuccess: () => {
            setSelectedRowKeys([]);
            tenantsData.refetch();
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

  const handleEdit = (record: Tenant) => {
    openPopup("edit");
    setSelectedTenant(record);
  };

  const handleClosePopup = () => {
    setSelectedTenant(null);
    closePopup();
  };

  return (
    <>
      {tenantsData.isFetching ? <Loading /> : null}
      {isOpen && typePopup && ["create", "edit"].includes(typePopup) ? (
        <TenantDetail
          tenant={selectedTenant}
          onClose={() => handleClosePopup()}
          onRefreshTenants={tenantsData.refetch}
        />
      ) : null}
      <div>
        <HeadingDetail
          breadcrumbRoutes={[
            {
              title: <Link to={"/admin/tenants"}>Tenant management</Link>,
            },
            {
              title: "Tenant list",
            },
          ]}
          buttonProps={{
            text: "Add tenant",
            onClick: () => openPopup("create"),
          }}
        />

        {/* Main */}
        <div className="mt-6 flex flex-col gap-4">
          <h3 className="roboto_font font-semibold text-xl">Tenant list</h3>

          {/* table */}
          <Table
            dataSource={tenantsData.data?.data || []}
            columns={getColumnsTenant(handleEdit, handleDeletes)}
            rowSelection={rowSelection}
            rowKey={"id"}
            scroll={{ x: 1100, y: 504 }}
            onRow={(record) => {
              return {
                onDoubleClick: () => {
                  navigate(
                    `/admin/account-management/${record.id}?tenantName=${record.name}`
                  );
                },
              };
            }}
            pagination={{
              position: ["bottomCenter"],
              total: tenantsData.data?.total || 0,
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
    </>
  );
};

export default TenantsPage;
