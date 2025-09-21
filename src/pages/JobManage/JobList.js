/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { getListJob } from "../../services/jobService";
import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
import { getCookie } from "../../helpers/cookie";
import { useApi } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

function JobList(props) {
  const idCompany = getCookie("id");
  const { className = "" } = props;
  const {
    data: jobs,
    loading,
    error,
    refetch,
  } = useApi(() => getListJob(idCompany));

  useEffect(() => {
    refetch();
  }, []);

  const handleReload = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message="Error loading jobs" description={error} />;
  }

  const columns = [
    {
      title: "Tên job",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, record) =>
        (record.tags || []).map((item, index) => (
          <Tag className="mb-5" color="blue" key={index}>
            {item}
          </Tag>
        )),
    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời gian",
      key: "time",
      render: (_, record) => (
        <>
          <small>Ngày tạo: {record.createAt}</small>
          <br />
          <small>Cập nhật: {record.updateAt}</small>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.status ? (
            <Tag color="green">Đang bật</Tag>
          ) : (
            <Tag color="red">Đang tắt</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/detail-job/${record._id}`}>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />}></Button>
            </Tooltip>
          </Link>
          <EditJob record={record} onReload={handleReload} />
          <DeleteJob record={record} onReload={handleReload} />
        </>
      ),
    },
  ];

  return (
    <>
      <div className={className}>
        <Table dataSource={jobs || []} columns={columns} rowKey="_id" />
      </div>
    </>
  );
}

export default JobList;
