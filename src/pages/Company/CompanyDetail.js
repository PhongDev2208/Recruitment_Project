/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { getDetailCompany } from "../../services/companyService";
import { getListJob } from "../../services/jobService";
import { Col, Row, Spin, Alert } from "antd";
import JobItem from "../../components/JobItem";
import GoBack from "../../components/GoBack";
import { useApi } from "../../hooks/useApi";

function CompanyDetail() {
  const params = useParams();

  // Use useApi for company detail
  const {
    data: infoCompany,
    loading: companyLoading,
    error: companyError,
  } = useApi(() => getDetailCompany(params.id), [params.id]);

  // Use useApi for jobs list
  const {
    data: jobs,
    loading: jobsLoading,
    error: jobsError,
  } = useApi(() => getListJob(params.id), [params.id]);

  if (companyLoading || jobsLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (companyError) {
    return (
      <div>
        <GoBack />
        <Alert
          message="Lỗi"
          description={companyError}
          type="error"
          showIcon
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }

  return (
    <>
      <GoBack />

      {infoCompany && (
        <>
          <h1>
            {infoCompany.companyName ||
              infoCompany.name ||
              "Tên công ty không có"}
          </h1>

          <div className="mb-20">
            Địa chỉ: <strong>{infoCompany.address || "Chưa cập nhật"}</strong>
          </div>

          <div className="mb-20">
            Số lượng nhân sự:{" "}
            <strong>{infoCompany.quantityPeople || "Chưa cập nhật"}</strong>
          </div>

          <div className="mb-20">
            Thời gian làm việc:{" "}
            <strong>{infoCompany.workingTime || "Chưa cập nhật"}</strong>
          </div>

          <div className="mb-20">
            Link website:{" "}
            <strong>{infoCompany.website || "Chưa cập nhật"}</strong>
          </div>

          <div className="mb-10">Mô tả ngắn:</div>
          <div className="mb-20">
            {infoCompany.description || "Chưa có mô tả"}
          </div>

          <div className="mb-10">Mô tả chi tiết:</div>
          <div className="mb-20">
            {infoCompany.detail || "Chưa có mô tả chi tiết"}
          </div>

          <div className="mb-10">Danh sách các job:</div>
          {jobsError && (
            <Alert
              message="Không thể tải danh sách công việc"
              description={jobsError}
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}
          <div className="mb-20">
            <Row gutter={[20, 20]}>
              {jobs && jobs.length > 0 ? (
                jobs.map((item) => (
                  <Col span={8} key={item._id}>
                    <JobItem item={item} infoCompany={infoCompany} />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <p>Không có việc làm nào được tìm thấy.</p>
                </Col>
              )}
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default CompanyDetail;
