import GoBack from "../../components/GoBack";
import { Button, Col, Form, Input, Row, Select, Switch, message } from "antd";
import { rules } from "../../constants";
import { getListTag } from "../../services/tagService";
import { createJob } from "../../services/jobService";
import { getTimeCurrent } from "../../helpers/getTime";
import { getCookie } from "../../helpers/cookie";
import { getListCity } from "../../services/cityService";
import { useApi, useAsyncOperation } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";
const { TextArea } = Input;

function CreateJob() {
  const idCompany = getCookie("id");
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();
  const { execute: submitJob, loading: submitting } = useAsyncOperation();

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

  const handleFinish = async (values) => {
    try {
      values.idCompany = idCompany;
      values.createAt = getTimeCurrent();

      await submitJob(() => createJob(values));

      form.resetFields();
      mess.open({
        type: "success",
        content: "Tạo job mới thành công!",
        duration: 5,
      });
    } catch (error) {
      mess.open({
        type: "error",
        content: error.message || "Tạo job mới không thành công!",
        duration: 3,
      });
    }
  };

  if (tagsLoading || citiesLoading) {
    return <LoadingSpinner />;
  }

  if (tagsError || citiesError) {
    return (
      <ErrorDisplay
        message="Error loading form data"
        description={tagsError || citiesError}
      />
    );
  }

  return (
    <>
      {contextHolder}

      <GoBack />

      <h1>Tạo job mới</h1>
      <Form onFinish={handleFinish} layout="vertical" form={form}>
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
            <Form.Item valuePropName="checked" label="Trạng thái" name="status">
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={submitting}>
                Tạo mới
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CreateJob;
