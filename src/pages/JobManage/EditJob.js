import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Switch,
  Tooltip,
  message,
} from "antd";
import { rules } from "../../constants";
import { useState } from "react";
import { getListTag } from "../../services/tagService";
import { updateJob } from "../../services/jobService";
import { getTimeCurrent } from "../../helpers/getTime";
import { EditOutlined } from "@ant-design/icons";
import { getListCity } from "../../services/cityService";
import { useApi, useAsyncOperation } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";
const { TextArea } = Input;

function EditJob(props) {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { execute: updateJobAsync, loading: updating } = useAsyncOperation();

  const {
    data: tags,
    loading: tagsLoading,
    error: tagsError,
  } = useApi(getListTag);
  const {
    data: cities,
    loading: citiesLoading,
    error: citiesError,
  } = useApi(getListCity);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleFinish = async (values) => {
    try {
      values.updateAt = getTimeCurrent();
      await updateJobAsync(() => updateJob(record._id, values));

      setIsModalOpen(false);
      onReload();
      mess.open({
        type: "success",
        content: "Cập nhật thành công!",
        duration: 5,
      });
    } catch (error) {
      mess.open({
        type: "error",
        content: error.message || "Cập nhật không thành công!",
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Tooltip title="Chỉnh sửa">
        <Button
          onClick={showModal}
          className="ml-5"
          icon={<EditOutlined />}
          type="primary"
          ghost
        ></Button>
      </Tooltip>

      <Modal
        title="Chỉnh sửa"
        open={isModalOpen}
        onCancel={handleCancel}
        width={1000}
        footer={null}
      >
        <Form
          onFinish={handleFinish}
          initialValues={record}
          layout="vertical"
          form={form}
        >
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên job" name="name" rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Tags" name="tags" rules={rules}>
                <Select mode="multiple" options={tags} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Mức lương" name="salary" rules={rules}>
                <Input addonAfter="$" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Thành phố" name="city" rules={rules}>
                <Select mode="multiple" options={cities} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description">
                <TextArea rows={16} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                valuePropName="checked"
                label="Trạng thái"
                name="status"
              >
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={updating}>
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default EditJob;
