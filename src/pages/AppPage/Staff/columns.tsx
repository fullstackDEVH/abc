// models
import { ColumnsType } from "antd/es/table";

// icons
import trashGreyIcon from "@/assets/logo/trash/trash_grey.svg";
import helpGreyIcon from "@/assets/logo/help/help_grey.svg";
import penGreyIcon from "@/assets/logo/pen/pen_grey.svg";
import { ReadStaffManagement } from "@/models/admin/staff-management";
import { Button } from "antd";

type StaffActionFn = (record: ReadStaffManagement) => void;

export const getColumnsStaff = (
  handleEdit: StaffActionFn,
  handleDelete: (ids: string[]) => void
): ColumnsType<ReadStaffManagement> => {
  return [
    {
      title: "No",
      dataIndex: "id",
      width: "4%",
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
      width: "28%",
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
      title: () => {
        return (
          <div className="flex_center gap-1">
            Email
            <img src={helpGreyIcon} alt="helpGreyIcon" width={16} height={16} />
          </div>
        );
      },

      dataIndex: "email",
      key: "email",
      width: "28%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { email }) => (
        <div className="text-[#475467] text-sm">{email}</div>
      ),
    },
    {
      title: () => {
        return (
          <div className="flex_center gap-1">
            Role
            <img src={helpGreyIcon} alt="helpGreyIcon" width={16} height={16} />
          </div>
        );
      },
      dataIndex: "role",
      key: "role",
      width: "19.5%",
      align: "center",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { role }) => {
        const renderTextAndStylesByRole = () => {
          switch (role) {
            case "MANAGER":
              return {
                text: "Manager",
                styles:
                  "text-[#0DB670] bg-[#EEF4FF] border-[#C7D7FE] font-medium",
              };
            case "USER":
              return {
                text: "User",
                styles:
                  "text-[#64748B] bg-[#F9F5FF] border-[#E9D7FE] font-medium",
              };
            default:
              return {
                text: "None",
                styles: "text-[#475467] font-medium",
              };
          }
        };
        const { styles, text } = renderTextAndStylesByRole();

        return (
          <div className={`flex_center`}>
            <div
              className={`text-sm ${styles} border px-[10px] rounded-full py-1`}
            >
              {text}
            </div>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      width: "19.5%",
      align: "center",
      render: (_, record, index) => (
        <div className="flex_center gap-1" key={index}>
          <Button className="flex_center rounded-lg text-sm font-semibold text-[#6941C6] w-[80px] h-10 border-[#D6BBFB] shadow-[0px_1px_2px_0px_#1018280D]">
            Assign
          </Button>
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
