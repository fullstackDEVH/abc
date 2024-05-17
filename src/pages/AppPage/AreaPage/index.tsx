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
import { useGetListArea } from "@/services/area/useGetListArea";
import useDebounce from "@/hooks/useDebound";
import { useDeleteAreaMutation } from "@/services/area/useDeleteArea";
import toast from "react-hot-toast";

const AreaPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [searchVal, setSearchVal] = useState<string>("");
  const searchValDebounce = useDebounce(searchVal, 500); 
  const areaData = useGetListArea({ page, pagesize, searchVal: searchValDebounce })
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
            toast.success(`${deleteIds.length} item${
              deleteIds.length > 1 ? "s" : ""
            } has been deleted.`);
          },
          onError: (err) => {
            toast.error(err.message);
          }
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
    areaData.refetch();
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
            <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => handleDeletes(selectedRowKeys as string[])}>
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
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            prefix={<SearchOutlined className="flex p-1" />}
          />
        </div>
      </div>
      <Table
        className="p-2 px-5"
        dataSource={areaData?.data?.data || []}
        rowKey="id"
        columns={getColumns(handleEdit, handleDeletes)}
        rowSelection={rowSelection}
        pagination={{
          total: areaData?.data?.total || 0,
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
  );
};

export default AreaPage;
