import { Area } from "@/models/area";
import { ColumnsType } from "antd/es/table";
// icons
import trashGreyIcon from "@/assets/logo/trash/trash_grey.svg";
import penGreyIcon from "@/assets/logo/pen/pen_grey.svg";
import helpGreyIcon from "@/assets/logo/help/help_grey.svg";

type AreaActionFn = (record: Area) => void;

export const getColumns = (
  handleEdit: AreaActionFn,
  handleDelete: (ids: string[]) => void
): ColumnsType<Area> => {
  return [
    {
      title: "No",
      dataIndex: "id",
      width: "10%",
      fixed: "left",
      align: "left",
      ellipsis: {
        showTitle: true,
      },
      render: (_, __, index) => (
        <div className="text-[#64748B] font-medium text-base">{index + 1}</div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "35%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { name }) => (
        <div className="text-[#475467] text-sm">{name}</div>
      ),
    },
    {
      title: () => {
        return (
          <div className="flex_center gap-1">
            Address
            <img src={helpGreyIcon} alt="helpGreyIcon" width={16} height={16} />
          </div>
        );
      },
      dataIndex: "address",
      key: "address",
      width: "40%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { name }) => (
        <div className="text-[#475467] text-sm">{name}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "15%",
      align: "center",
      render: (_, record, index) => (
        <div className="flex_center gap-1" key={index}>
          <div
            className="p-[10px] cursor-pointer group/trash"
            onClick={() => handleDelete([`${record.id}`])}
          >
            <img
              className="group-hover/trash:translate-y-[-3px] transition-transform"
              src={trashGreyIcon}
              width={20}
              height={20}
            />
          </div>
          <div
            className="p-[10px] cursor-pointer group/pen"
            onClick={() => handleEdit(record)}
          >
            <img
              className="group-hover/pen:translate-y-[-3px] transition-transform"
              src={penGreyIcon}
              width={20}
              height={20}
            />
          </div>
        </div>
      ),
    },
  ];
};
