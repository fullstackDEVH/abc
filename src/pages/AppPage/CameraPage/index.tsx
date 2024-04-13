import { DeleteOutlined, DownloadOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Input, Typography } from "antd";

const CameraPage = () => {
  return (
    <div>
      <div className="flex justify-between bg-white p-0 ">
        <Typography.Title className="p-3 px-5" level={3}>
          Camera Management
        </Typography.Title>
        <div className="content-center p-2 space-x-1">
        <Button type="primary" danger icon={<DeleteOutlined />}>  Delete</Button>
        <Button type="primary" icon={<PlusOutlined />}> Add</Button>
        <Button type="primary" icon={<UploadOutlined />}>Import</Button>
        <Button type="primary" icon={<DownloadOutlined />}>Export</Button>
        </div>
      </div>
      <div className="p-2 px-5">
        <div className="flex justify-end w-full pr-2 space-x-2">
          <Input
            className="flex p-1 w-1/5"
            placeholder="input search text"
            size="middle"
            prefix={<SearchOutlined className="flex p-1" />}
            // suffix={suffix}
          />
        </div>
      </div>
    </div>
  );
};
export default CameraPage;
