/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Spin, Alert } from "antd";
import { getCVStatistic } from "../../services/cvService";
import { useApi } from "../../hooks/useApi";

function CVStatistic() {
  const { data, loading, error } = useApi(() => getCVStatistic());

  if (loading) {
    return (
      <Card
        title="CV"
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
      <Card title="CV" className="mb-20" size="small">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </Card>
    );
  }

  return (
    <>
      {data && (
        <Card title="CV" className="mb-20" size="small">
          <div>
            Số lượng CV: <strong>{data.total}</strong>
          </div>
          <div>
            CV đã đọc: <strong>{data.totalRead}</strong>
          </div>
          <div>
            CV chưa đọc: <strong>{data.totalUnread}</strong>
          </div>
        </Card>
      )}
    </>
  );
}

export default CVStatistic;
