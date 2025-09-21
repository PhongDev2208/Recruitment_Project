import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { changeStatusCV, getDetailCV } from "../../services/cvService";
import GoBack from "../../components/GoBack";
import { Card, Tag, Spin, Alert } from "antd";
import { getDetailJob } from "../../services/jobService";
import { useApi, useAsyncOperation } from "../../hooks/useApi";

function CVDetail() {
  const params = useParams();

  // Get CV details using useApi
  const {
    data: cv,
    loading: cvLoading,
    error: cvError,
  } = useApi(() => getDetailCV(params.id), [params.id]);

  // Get job details using useApi (only when we have CV data)
  const {
    data: job,
    loading: jobLoading,
    error: jobError,
  } = useApi(cv?.idJob ? () => getDetailJob(cv.idJob) : null, [cv?.idJob]);

  // Use async operation for marking CV as read
  const { execute: markAsRead } = useAsyncOperation();

  // Mark CV as read when CV is loaded
  useEffect(() => {
    if (cv && params.id) {
      markAsRead(() => changeStatusCV(params.id, { statusRead: true }));
    }
  }, []);

  const loading = cvLoading || jobLoading;
  const error = cvError || jobError;

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Đang tải thông tin CV...</div>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <GoBack />
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
          style={{ marginTop: 16 }}
        />
      </>
    );
  }

  return (
    <>
      <GoBack />
      {cv && job && (
        <>
          <Card title={`Ứng viên: ${cv.name}`} className="mt-20">
            <div className="mb-20">
              Ngày gửi: <strong>{cv.createAt}</strong>
            </div>
            <div className="mb-20">
              Số điện thoại: <strong>{cv.phone}</strong>
            </div>
            <div className="mb-20">
              Email: <strong>{cv.email}</strong>
            </div>
            <div className="mb-20">
              Thành phố ứng tuyển: <strong>{cv.city}</strong>
            </div>
            <div className="mb-20">
              <div className="mb-10">Giới thiệu bản thân:</div>
              <div>{cv.description}</div>
            </div>
            <div className="mb-20">
              <div className="mb-10">Link project:</div>
              <div>{cv.linkProject}</div>
            </div>
          </Card>

          <Card title={`Thông tin job: ${job.name}`} className="mt-20">
            <div className="mb-20">
              <span>Tags: </span>
              {(job.tags || []).map((item, index) => (
                <Tag color="blue" key={index}>
                  {item}
                </Tag>
              ))}
            </div>
            <div className="mb-20">
              Mức lương: <strong>{job.salary}$</strong>
            </div>
            <div className="mb-20">
              <div className="mb-10">Mô tả:</div>
              <div>{job.description}</div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}

export default CVDetail;
