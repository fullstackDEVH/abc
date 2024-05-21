import { useGetListArea } from "@/services/area/useGetListArea";
import { useGetListCamera } from "@/services/camera/useGetListCamera";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Table, Select } from "antd";
import { Key, useState } from "react";
import fireSwal from "@/components/SweetAlert";
import { getColumns } from "./columns";
import { SweetAlertResult } from "sweetalert2";
import { Camera } from "@/models/camera";
import CameraDetailModal from "./detail";
import { ModalModeType } from "@/constants";
import useDebounce from "@/hooks/useDebound";
import { useDeleteCameraMutation } from "@/services/camera/useDeleteCamera";
import toast from "react-hot-toast";
import Heading from "@/components/HeadingDetail/User/Heading";

const CameraPage = () => {
  const listArea = useGetListArea({ page: 1, pagesize: 10, searchVal: "" });
  const [selectedArea, setSelectedArea] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pagesize, setPageSize] = useState(10);
  const [searchVal, setSearchVal] = useState<string>("");
  const searchValDebounce = useDebounce(searchVal, 500);
  const listCamera = useGetListCamera({
    page,
    pagesize,
    areas: selectedArea,
    searchVal: searchValDebounce,
  });
  const deleteCameraMutation = useDeleteCameraMutation();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [modeModal, setModeModal] = useState<ModalModeType>(null);
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
        deleteCameraMutation.mutateAsync(deleteIds, {
          onSuccess: () => {
            setSelectedRowKeys([]);
            listCamera.refetch();
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

  const handleEdit = (record: Camera) => {
    setModeModal("edit");
    setSelectedCamera(record);
  };

  const handleView = (record: Camera) => {
    setModeModal("info");
    setSelectedCamera(record);
  };

  const openCreateModal = () => {
    setModeModal("create");
    setSelectedCamera(null);
  };

  const handleCloseModal = () => {
    setModeModal(null);
    setSelectedCamera(null);
    listCamera.refetch();
  };

  return (
    <div>
      {modeModal && (
        <CameraDetailModal
          camera={selectedCamera}
          mode={modeModal}
          toggle={handleCloseModal}
        />
      )}
      <Heading
        title="Camera"
        desc="Camera Management"
        buttonProps={{
          text: "Add camera",
          onClick: () => {
            openCreateModal();
          },
        }}
      />
      <div className="p-2 px-5">
        <div className="flex justify-end w-full space-x-2">
          <Select
            className="w-1/5 h-full truncate"
            size="middle"
            mode="multiple"
            allowClear
            showSearch
            maxTagCount="responsive"
            options={listArea.data?.data?.map((area) => ({
              label: area.name,
              value: area.id,
            }))}
            placeholder="Areas ..."
            onChange={(value) => setSelectedArea(value as string[])}
          />
          {/* <AsyncSelect /> */}
          <Input
            className="w-1/5 p-1"
            placeholder="Search ..."
            size="middle"
            prefix={<SearchOutlined className="flex p-1" />}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white border border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] mx-[33.5px] mb-[61px] rounded-xl">
        {/* title table */}
        <div className="">
          <div className="flex justify-between items-center pt-5 pl-5">
            <h3 className="font-bold text-[20px] leading-[30px] text-[#0E2259]">
              Camera list
            </h3>
          </div>

          <Table
            className="p-2 px-5"
            dataSource={listCamera?.data?.data || []}
            rowKey="id"
            columns={getColumns(handleView, handleEdit, handleDeletes)}
            rowSelection={rowSelection}
            pagination={{
              total: listCamera?.data?.total || 0,
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
    </div>
  );
};
export default CameraPage;
