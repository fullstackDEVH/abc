import { useGetListArea } from "@/services/area/useGetListArea";
import { useGetListCamera } from "@/services/camera/useGetListCamera";
import {
  DeleteOutlined,
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Input, Select, Table, Typography } from "antd";
import { Key, useState } from "react";
import fireSwal from "@/components/SweetAlert";
import { getColumns } from "./columns";
import { SweetAlertResult } from "sweetalert2";
import { Camera } from "@/models/camera";
import CameraDetailModal from "./detail";
import { ModalModeType } from "@/constants";

const CameraPage = () => {
  const listArea = useGetListArea({ page: 1, pagesize: 10, searchVal: "" });
  const [selectedArea, setSelectedArea] = useState<string[]>([]); // [1
  const listCamera = useGetListCamera({
    page: 1,
    pagesize: 10,
    areas: selectedArea,
    searchVal: "",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [modeModal, setModeModal] = useState<ModalModeType>('create');
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

  const handleDelete = (record: Camera) => {
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

  const handleEdit = (record: Camera) => {
    setModeModal('edit');
    setSelectedCamera(record);
  };

  const handleView = (record: Camera) => {
    setModeModal('info');
    setSelectedCamera(record);
  };

  const openCreateModal = () => {
    setModeModal('create');
    setSelectedCamera(null);
  };

  const handleCloseModal = () => {
    setModeModal(null);
    setSelectedCamera(null);
  };

  return (
    <div>
      {modeModal && (
        <CameraDetailModal camera={selectedCamera} mode={modeModal} toggle={handleCloseModal} />
      )}
      <div className="flex justify-between bg-white p-0 ">
        <Typography.Title className="p-3 px-5" level={3}>
          Camera Management
        </Typography.Title>
        <div className="content-center p-2 space-x-1">
          {selectedRowKeys.length > 0 && (
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={handleDeletes}
            >
              Delete {selectedRowKeys.length} item
              {selectedRowKeys.length > 1 ? "s" : ""}
            </Button>
          )}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={openCreateModal}
          >
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
        <div className="flex justify-end w-full pr-2 space-x-2">
          <Select
            className="w-1/5 h-full truncate"
            size="middle"
            mode="multiple"
            showSearch
            maxTagCount="responsive"
            options={listArea.data?.data.map((area) => ({
              label: area.name,
              value: area.id,
            }))}
            placeholder="Areas ..."
            onChange={(value) => setSelectedArea(value as string[])}
          />
          <Input
            className="w-1/5 p-1"
            placeholder="Search ..."
            size="middle"
            prefix={<SearchOutlined className="flex p-1" />}
          />
        </div>
      </div>
      <Table
        className="p-2 px-5"
        dataSource={listCamera?.data?.data || []}
        rowKey="id"
        columns={getColumns(handleView, handleEdit, handleDelete)}
        rowSelection={rowSelection}
      />
    </div>
  );
};
export default CameraPage;
