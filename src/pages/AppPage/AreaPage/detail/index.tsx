import { Area } from "@/models/area";
import { useCreateAreaMutation } from "@/services/area/useCreateArea";
import { Form, Input, Modal } from "antd";
import { FC } from "react";

type AreaModalProps = {
  toggle: () => void;
  area: Area | null;
};
const AreaDetailModal: FC<AreaModalProps> = (props) => {
  const { toggle, area } = props;
  const createAreaMutation = useCreateAreaMutation();
  const [form] = Form.useForm();

  const onFinish = (values: Area) => {
    console.log(values);
    createAreaMutation.mutateAsync(values,
      {
        onSuccess: () => {
          alert("Create area success");
          toggle();
        },
        onError: () => {
          alert("Create area failed");
        }
      }
    )
  };



  return (
    <Modal
      title={area ? `${area.name}` : `Create area`}
      open={true}
      onOk={form.submit}
      onCancel={toggle}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={area as Area}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Area name is required!" }]}
        >
          <Input placeholder="Area name" />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input placeholder="Area address" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AreaDetailModal;
