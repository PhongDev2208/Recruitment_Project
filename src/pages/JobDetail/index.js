/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../services/jobService";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Tag,
  Form,
  notification,
  Select,
} from "antd";
import { getDetailCompany } from "../../services/companyService";
import { rules } from "../../constants";
import { getTimeCurrent } from "../../helpers/getTime";
import { createCV } from "../../services/cvService";
import { useApi, useAsyncOperation } from "../../hooks/useApi";
import GoBack from "../../components/GoBack";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";
const { TextArea } = Input;
const { Option } = Select;

function JobDetail() {
  const params = useParams();
  const [form] = Form.useForm();
  const [noti, contextHolder] = notification.useNotification();
  const { execute: submitCV, loading: submitting } = useAsyncOperation();

  // Get job details using useApi
  const {
    data: jobData,
    loading: jobLoading,
    error: jobError,
  } = useApi(() => getDetailJob(params.id), [params.id]);

  // Get company details using useApi (only when we have job data)
  const {
    data: companyData,
    loading: companyLoading,
    error: companyError,
  } = useApi(
    () => (jobData?.idCompany ? getDetailCompany(jobData.idCompany) : null),
    [jobData?.idCompany]
  );

  // Combine data
  const job =
    jobData && companyData
      ? {
          ...jobData,
          infoCompany: companyData,
        }
      : null;

  const loading = jobLoading || (jobData && companyLoading);
  const error = jobError || companyError;

  const onFinish = async (values) => {
    try {
      values.idJob = job._id;
      values.idCompany = job.infoCompany._id;
      values.createAt = getTimeCurrent();

      await submitCV(() => createCV(values));

      form.resetFields();
      noti.success({
        message: `Gửi yêu cầu thành công!`,
        description:
          "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất.",
      });
    } catch (err) {
      noti.error({
        message: `Gửi yêu cầu không thành công!`,
        description:
          err.message || "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu.",
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay message="Error loading job detail" description={error} />
    );
  }

  return (
    <>
      {contextHolder}

      <GoBack />

      {job && (
        <>
          <h1>{job.name}</h1>

          <Button
            href="#formApply"
            type="primary"
            size="large"
            className="mb-20"
          >
            ỨNG TUYỂN NGAY
          </Button>

          <div className="mb-20">
            <span>Tags: </span>
            {(job.tags || []).map((item, index) => (
              <Tag color="blue" key={index}>
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-20">
            <span>Thành phố: </span>
            {(job.city || []).map((item, index) => (
              <Tag color="orange" key={index}>
                {item}
              </Tag>
            ))}
          </div>

          <div className="mb-20">
            Mức lương: <strong>{job.salary}$</strong>
          </div>

          <div className="mb-20">
            Địa chỉ công ty: <strong>{job.infoCompany.address}</strong>
          </div>

          <div className="mb-20">
            Thời gian đăng bài: <strong>{job.createAt}</strong>
          </div>

          <div className="mb-20">
            <div className="mb-10">Mô tả công việc:</div>
            <div>{job.description}</div>
          </div>

          <div className="mb-20">
            <div className="mb-10">Giới thiệu công ty:</div>
            <div>{job.infoCompany.description}</div>
          </div>

          <Card title="Ứng tuyển ngay" id="formApply">
            <Form
              name="form_apply"
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Row gutter={20}>
                <Col span={6}>
                  <Form.Item label="Họ tên" name="name" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Email" name="email" rules={rules}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Thành phố" name="city" rules={rules}>
                    <Select>
                      {(job.city || []).map((item, index) => (
                        <Option value={item} label={item} key={index}></Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Giới thiệu bản thân"
                    name="description"
                    rules={rules}
                  >
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Danh sách link project đã làm"
                    name="linkProject"
                    rules={rules}
                  >
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={submitting}
                    >
                      GỬI YÊU CẦU
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  );
}

export default JobDetail;
