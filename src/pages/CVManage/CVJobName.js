import { getDetailJob } from "../../services/jobService";
import { useApi } from "../../hooks/useApi";
import { Spin } from "antd";

function CVJobName(props) {
  const { record } = props;
  const {
    data: job,
    loading,
    error,
  } = useApi(() => getDetailJob(record.idJob));

  if (loading) {
    return <Spin size="small" />;
  }

  if (error) {
    return <span style={{ color: "red" }}>Lỗi tải job</span>;
  }

  return <>{job && job.name}</>;
}

export default CVJobName;
