// models
import { ColumnsType } from "antd/es/table";
import { ReadStaffManagement } from "@/models/admin/staff-management";

// icons
import penGreyIcon from "@/assets/logo/pen/pen_grey.svg";
import trashGreyIcon from "@/assets/logo/trash/trash_grey.svg";

type StaffManagementActionFn = (record: ReadStaffManagement) => void;

export const getColumnsStaffManagement = (
  handleEdit: StaffManagementActionFn,
  handleDelete: (ids: string[]) => void
): ColumnsType<ReadStaffManagement> => {
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
      width: "23.333%",
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
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "23.333%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { role }) => {
        let convertVisible: { text: string; color: string } | null = null;
        switch (role) {
          case "ADMIN":
            convertVisible = { text: "Admin", color: "text-[#2A4CFF]" };
            break;
          case "QA_USER":
            convertVisible = { text: "QA", color: "text-[#64748B]" };
            break;
          default:
            convertVisible = { text: "None", color: "text-[#475467]" };
            break;
        }

        return (
          <div className={`${convertVisible.color} text-sm`}>
            {convertVisible.text}
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "23.333%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { email }) => (
        <div className="text-[#475467] text-sm">{email}</div>
      ),
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "20%",
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
