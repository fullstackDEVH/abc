import { Area } from "@/models/area";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Typography, Input, Button, Table } from "antd";
import { getColumns } from "./columns";
import { Key, useState } from "react";
import { SweetAlertResult } from "sweetalert2";
import fireSwal from "@/components/SweetAlert";
import AreaDetailModal from "./detail";

const mockData: Area[] = [
  {
    id: "1",
    name: "Area 1",
    address: "Address 1",
    updated_at: new Date(),
    created_at: new Date(),
  },
  {
    id: "2",
    name: "Area 2",
    address: "Address 2",
    updated_at: new Date(),
    created_at: new Date(),
  },
  {
    id: "3",
    name: "Area 3",
    address: "Address 3",
    updated_at: new Date(),
    created_at: new Date(),
  },
  {
    id: "4",
    name: "Area 4",
    address: "Address 4",
    updated_at: new Date(),
    created_at: new Date(),
  },
];

const AreaPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  };

  const handleDeletes = () => {
    if (selectedRowKeys.length == 0) {
      return;
    }
    fireSwal({
      title: "Are you sure?",
      text: `Delete ${selectedRowKeys.length} item${
        selectedRowKeys.length > 1 ? "s" : ""
      }?`,
      icon: "warning",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        setSelectedRowKeys([]);        
        fireSwal({
          title: "Deleted!",
          showCancelButton: false,
          text: `${selectedRowKeys.length} item${
            selectedRowKeys.length > 1 ? "s" : ""
          } has been deleted.`,
          icon: "success",
        });
      }
    });
  };

  const handleDelete = (record: Area) => {
    fireSwal({
      title: "Are you sure?",
      text: `Delete ${record.name}?`,
      icon: "warning",
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        fireSwal({
          title: "Deleted!",
          showCancelButton: false,
          text: `${record.name} has been deleted.`,
          icon: "success",
        });
      }
    });
  };

  const handleEdit = (record: Area) => {
    setIsOpenModal(true);
    setSelectedArea(record);
  };

  const openCreateModal = () => {
    setIsOpenModal(true);
    setSelectedArea(null);
  }

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedArea(null);
  }

  return (
    <div>
    {isOpenModal && <AreaDetailModal area={selectedArea} toggle={handleCloseModal}/>}
      <div className="flex justify-between bg-white p-0 ">
        <Typography.Title className="p-3 px-6" level={3}>
          Area Management
        </Typography.Title>
        <div className="content-center p-2 px-6 space-x-1">
          {selectedRowKeys.length > 0 && (
            <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleDeletes}>
              Delete {selectedRowKeys.length} item
              {selectedRowKeys.length > 1 ? "s" : ""}
            </Button>
          )}
          <Button type="primary" icon={<PlusOutlined />} onClick={openCreateModal}>
            Add
          </Button>
          <Button type="primary" icon={<UploadOutlined />}>
            Import
          </Button>
          <Button type="primary" icon={<DownloadOutlined />}>
            Export
          </Button>
        </div>
      </div>
      <div className="p-2 px-5">
        <div className="flex justify-end w-full space-x-2">
          <Input
            className="flex p-1 w-1/5"
            placeholder="Search ..."
            size="middle"
            prefix={<SearchOutlined className="flex p-1" />}
          />
        </div>
      </div>
      <Table
        className="p-2 px-5"
        dataSource={mockData}
        rowKey="id"
        columns={getColumns(handleEdit, handleDelete)}
        rowSelection={rowSelection}
      />
    </div>
  );
};

export default AreaPage;
