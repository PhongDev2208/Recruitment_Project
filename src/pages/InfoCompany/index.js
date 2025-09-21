/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  message,
  Spin,
  Alert,
} from "antd";
import { rules } from "../../constants";
import { getCookie } from "../../helpers/cookie";
import { useState } from "react";
import { editCompany, getDetailCompany } from "../../services/companyService";
import { useApi, useAsyncOperation } from "../../hooks/useApi";
const { TextArea } = Input;

function InfoCompany() {
  const idCompany = getCookie("id");
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();

  // Get company info using useApi
  const {
    data: info,
    loading,
    error,
    refetch,
  } = useApi(() => getDetailCompany(idCompany), [idCompany]);

  // For update operations
  const { execute: updateCompany, loading: updating } = useAsyncOperation();

  const handleFinish = async (values) => {
    try {
      const response = await updateCompany(() =>
        editCompany(idCompany, values)
      );
      mess.success("Cập nhật thành công!");
      refetch(); // Refresh data
      setIsEdit(false);
    } catch (error) {
      mess.error("Cập nhật thất bại!");
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    form.resetFields();
  };

  const handleEdit = () => {
    setIsEdit(true);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Đang tải thông tin công ty...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Lỗi"
        description={error}
        type="error"
        showIcon
        style={{ marginTop: 16 }}
      />
    );
  }

  return (
    <>
      {contextHolder}

      {info && (
        <Card
          title="Thông tin công ty"
          extra={
            !isEdit ? (
              <Button onClick={handleEdit} disabled={updating}>
                Chỉnh sửa
              </Button>
            ) : (
              <Button onClick={handleCancel} disabled={updating}>
                Hủy
              </Button>
            )
          }
        >
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={info}
            form={form}
            disabled={!isEdit}
          >
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Email" name="email" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Địa chỉ" name="address">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số lượng nhân sự" name="quantityPeople">
                  <InputNumber className="w-100" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Thời gian làm việc" name="workingTime">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Link website" name="website">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả ngắn" name="description">
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả chi tiết" name="detail">
                  <TextArea rows={16} />
                </Form.Item>
              </Col>
              {isEdit && (
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                    <Button onClick={handleCancel} className="ml-10">
                      Hủy
                    </Button>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </Card>
      )}
    </>
  );
}

export default InfoCompany;
