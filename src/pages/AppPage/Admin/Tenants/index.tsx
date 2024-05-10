import "./index.css";
import toast from "react-hot-toast";
import { Key, useState } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Input, Table } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

// components
import TenantDetail from "./detail";
import fireSwal from "@/components/SweetAlert";

// declarations supports
import { getColumnsTenant } from "./columns";
import { ModalModeType } from "@/constants";

// model
import { Tenant } from "@/models/admin/tenant";
import { SweetAlertResult } from "sweetalert2";

// hook
import useDebounce from "@/hooks/useDebound";
import usePopupMultiple from "@/hooks/useMultiplesPopup";

// services
import { useGetListTenants } from "@/services/admin/tenants/useGetListTenant";
import { useDeleteTenantMutation } from "@/services/admin/tenants/useDeleteTenant";

const fakeTenants: Tenant[] = [
  {
    _id: "1cxzczxc",
    name: "ABC Company",
    website: "https://www.abc.com",
    contact_person: "John Doe",
    email: "john.doe@abc.com",
    address: "123 Main Street, City, Country 123 Main Street, City, Country",
    phone_number: "123-456-7890",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "2czxczxc3",
    name: "XYZ Corporation",
    website: "https://www.xyzcorp.com",
    contact_person: "Jane Smith",
    email: "jane.smith@xyzcorp.com",
    address: "456 Elm Street, City, Country",
    phone_number: "987-654-3210",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "2czxczxc2",
    name: "XYZ Corporation",
    website: "https://www.xyzcorp.com",
    contact_person: "Jane Smith",
    email: "jane.smith@xyzcorp.com",
    address: "456 Elm Street, City, Country",
    phone_number: "987-654-3210",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    _id: "2czxczxc1",
    name: "XYZ Corporation",
    website: "https://www.xyzcorp.com",
    contact_person: "Jane Smith",
    email: "jane.smith@xyzcorp.com",
    address: "456 Elm Street, City, Country",
    phone_number: "987-654-3210",
    created_at: new Date(),
    updated_at: new Date(),
  },
  // Thêm các giá trị khác nếu cần
];

const TenantsPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [searchVal, setSearchVal] = useState<string>("");
  const searchValDebounce = useDebounce(searchVal, 500);
  const { isOpen, typePopup, openPopup, closePopup } =
    usePopupMultiple<ModalModeType>();

  const tenantsData = useGetListTenants({
    page,
    pagesize,
    searchVal: searchValDebounce,
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
      {isOpen && typePopup && ["create", "edit"].includes(typePopup) ? (
        <TenantDetail
          tenant={selectedTenant}
          onClose={() => handleClosePopup()}
        />
      ) : null}
      <div className="p-8 inter_font">
        <div>
          <Breadcrumb
            items={[
              {
                title: <Link to="">Tenant management</Link>,
              },
              {
                title: "Tenant list",
              },
            ]}
          />
        </div>

        {/* Main */}
        <div className="mt-6 flex flex-col gap-4">
          <h3 className="roboto_font font-semibold text-xl">Tenant list</h3>

          {/* controller */}
          <div className="flex items-center justify-between">
            <div className="w-[360px] h-[40px]">
              <Input
                size="large"
                placeholder="Search tenant"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                prefix={<SearchOutlined />}
              />
            </div>

            <Button
              type="primary"
              size={"large"}
              className="bg-[#058DF4] font-semibold text-sm flex_center"
              icon={<PlusOutlined color="white" className="text-[20px]" />}
              onClick={() => {
                openPopup("create");
              }}
            >
              Add tenant
            </Button>
          </div>

          {/* table */}
          <Table
            dataSource={fakeTenants || []}
            columns={getColumnsTenant(handleEdit, handleDeletes)}
            rowSelection={rowSelection}
            rowKey={"_id"}
            scroll={{ x: 1100 }}
            pagination={{
              position: ["bottomCenter"],
              total: 5 || 0,
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
