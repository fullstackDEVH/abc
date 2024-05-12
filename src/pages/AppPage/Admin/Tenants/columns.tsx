// models
import { Tenant } from "@/models/admin/tenant";
import { ColumnsType } from "antd/es/table";

// icons
import trashGreyIcon from "@/assets/logo/trash/trash_grey.svg";
import helpGreyIcon from "@/assets/logo/help/help_grey.svg";
import penGreyIcon from "@/assets/logo/pen/pen_grey.svg";

type TenantActionFn = (record: Tenant) => void;

export const getColumnsTenant = (
  handleEdit: TenantActionFn,
  handleDelete: (ids: string[]) => void
): ColumnsType<Tenant> => {
  return [
    {
      title: "No",
      dataIndex: "id",
      width: "5%",
      fixed: "left",
      ellipsis: {
        showTitle: true,
      },
      render: (_, __, index) => (
        <div className="text-[#101828] text-sm inter_font">{index + 1}</div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "18%",
      ellipsis: {
        showTitle: true,
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
      render: (_, { name }) => (
        <div className="text-[#101828] text-sm inter_font">{name}</div>
      ),
    },
    {
      title: () => {
        return (
          <div className="flex items-center gap-1">
            Website
            <img src={helpGreyIcon} alt="helpGreyIcon" width={16} height={16} />
          </div>
        );
      },
      dataIndex: "website",
      key: "website",
      width: "15%",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { website }) => (
        <div className="text-[#475467] text-sm inter_font">{website}</div>
      ),
    },
    {
      title: "Contact person",
      dataIndex: "contact",
      key: "contact",
      width: "19%",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { contact }) => (
        <div className="text-[#101828] text-sm inter_font">{contact}</div>
      ),
    },
    {
      title: "Email address",
      dataIndex: "email",
      key: "email",
      width: "18%",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { email }) => (
        <div className="text-[#475467] text-sm inter_font">{email}</div>
      ),
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ellipsis: {
        showTitle: true,
      },
      render: (_, { phone }) => (
        <div className="text-[#101828] text-sm inter_font">{phone}</div>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "10%",
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
