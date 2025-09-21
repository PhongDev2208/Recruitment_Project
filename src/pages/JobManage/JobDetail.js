import { useParams } from "react-router-dom";
import GoBack from "../../components/GoBack";
import { getDetailJob } from "../../services/jobService";
import { Tag, Spin, Alert } from "antd";
import { useApi } from "../../hooks/useApi";

function JobDetail() {
  const params = useParams();
  const { data, loading, error } = useApi(() => getDetailJob(params.id));

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Đang tải thông tin job...</div>
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
      {data && (
        <>
          <h1>Tên job: {data.name}</h1>
          <div className="mb-20">
            <span>Trạng thái: </span>
            {data.status ? (
              <Tag color="green">Đang bật</Tag>
            ) : (
              <Tag color="red">Đang tắt</Tag>
            )}
          </div>
          <div className="mb-20">
            <span>Tags: </span>
            {(data.tags || []).map((item, index) => (
              <Tag color="blue" key={index}>
                {item}
              </Tag>
            ))}
          </div>
          <div className="mb-20">
            Mức lương: <strong>{data.salary}$</strong>
          </div>
          <div className="mb-20">
            Ngày tạo: <strong>{data.createAt}</strong>
          </div>
          <div className="mb-20">
            Cập nhật: <strong>{data.updateAt}</strong>
          </div>
          <div className="mb-20">
            <span>Thành phố: </span>
            {(data.city || []).map((item, index) => (
              <Tag color="orange" key={index}>
                {item}
              </Tag>
            ))}
          </div>
          <div className="mb-20">
            <div className="mb-10">Mô tả:</div>
            <div>{data.description}</div>
          </div>
        </>
      )}
    </>
  );
}

export default JobDetail;
