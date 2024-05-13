// models
import { ColumnsType } from "antd/es/table";

// icons
import trashGreyIcon from "@/assets/logo/trash/trash_grey.svg";
import penGreyIcon from "@/assets/logo/pen/pen_grey.svg";
import { AccountManagementRead } from "@/models/admin/account-management";

type AccountManagementActionFn = (record: AccountManagementRead) => void;

export const getColumnsAccountManagement = (
  handleEdit: AccountManagementActionFn,
  handleDelete: (ids: string[]) => void
): ColumnsType<AccountManagementRead> => {
  return [
    {
      title: "No",
      dataIndex: "id",
      width: "8.5%",
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
      width: "25.5%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      render: (_, { name }) => (
        <div className="text-[#475467] text-sm">{name}</div>
      ),
    },

    {
      title: "Email address",
      dataIndex: "email",
      key: "email",
      width: "24%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { email }) => (
        <div className="text-[#475467] text-sm">{email}</div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "24%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { role }) => (
        <div className="text-[#475467] text-sm">{role}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "18%",
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
