import { Area } from "@/models/area";
import { useCreateAreaMutation } from "@/services/area/useCreateArea";
import swalFire from "@/components/SweetAlert";
import { Form, Input, Modal } from "antd";
import { FC } from "react";
import { MessageInstance } from "antd/es/message/interface";
import { ModalModeType } from "@/constants";
import { useUpdateAreaMutation } from "@/services/area/useUpdateArea";


type AreaModalProps = {
  toggle: () => void;
  area: Area | null;
  messageApi: MessageInstance
};
const AreaDetailModal: FC<AreaModalProps> = (props) => {
  const { toggle, area, messageApi } = props;
  const createAreaMutation = useCreateAreaMutation();
  const updateAreaMutation = useUpdateAreaMutation();
  const [form] = Form.useForm();
  

  const onFinish = (values: Area) => {
    let mode: ModalModeType = "create";
    if (area) {
      mode = "edit";
    }
    swalFire({
      title: "Are you sure?",
      text: `${mode === "create" ? "Create" : "Update"} ${values.name}?`,
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        if (mode === "create") {
          createAreaMutation.mutateAsync(values,
            {
              onSuccess: async() => {
                messageApi.open({
                  type: 'success',
                  content: `Area ${values.name} created`,
                });
                toggle();
              },
              onError: (err) => {
                messageApi.open({
                  type: 'error',
                  content: err.message,
                });
              }
            }
          )
        } else {
          updateAreaMutation.mutateAsync({id: area?._id as string, body: values},
            {
              onSuccess: async() => {
                messageApi.open({
                  type: 'success',
                  content: `Area ${values.name} updated`,
                });
                toggle();
              },
              onError: (err) => {
                messageApi.open({
                  type: 'error',
                  content: err.message,
                });
              }
            }
          )
        }
      }
    });
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
