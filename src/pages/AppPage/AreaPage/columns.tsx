import { Area } from "@/models/area";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

type AreaActionFn = (record: Area) => void;

export const getColumns = (handleEdit: AreaActionFn, handleDelete: AreaActionFn): ColumnsType<Area> => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "35%",
    },
    {
      title: "Created Time",
      dataIndex: "created_at",
      key: "created_at",
      width: "15%",
      render: (date: Date) => dayjs(date).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "12%",
      align: "center",
      render: (_, record, index) => (
        <div className="space-x-2" key={index}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];
};
