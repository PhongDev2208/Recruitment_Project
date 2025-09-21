/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Spin, Alert } from "antd";
import { getJobStatistic } from "../../services/jobService";
import { useApi } from "../../hooks/useApi";

function JobStatistic() {
  const { data, loading, error } = useApi(() => getJobStatistic());

  if (loading) {
    return (
      <Card
        title="Job"
        className="mb-20"
        size="small"
        style={{ textAlign: "center" }}
      >
        <Spin size="large" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Job" className="mb-20" size="small">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </Card>
    );
  }

  return (
    <>
      {data && (
        <Card title="Job" className="mb-20" size="small">
          <div>
            Số lượng job: <strong>{data.total}</strong>
          </div>
          <div>
            Job đang bật: <strong>{data.totalActive}</strong>
          </div>
          <div>
            Job đang tắt: <strong>{data.totalInactive}</strong>
          </div>
        </Card>
      )}
    </>
  );
}

export default JobStatistic;
