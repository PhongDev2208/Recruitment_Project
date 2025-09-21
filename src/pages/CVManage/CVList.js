/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Button, Table, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { getListCV } from "../../services/cvService";
import { getCookie } from "../../helpers/cookie";
import CVJobName from "./CVJobName";
import DeleteCV from "./DeleteCV";
import { useApi } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

function CVList(props) {
  const idCompany = getCookie("id");
  const { className = "" } = props;
  const {
    data: listCV,
    loading,
    error,
    refetch,
  } = useApi(() => getListCV(idCompany));

  const handleReload = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message="Error loading CV list" description={error} />;
  }

  const columns = [
    {
      title: "Tên job",
      dataIndex: "idJob",
      key: "idJob",
      render: (_, record) => <CVJobName record={record} />,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày gửi",
      key: "time",
      render: (_, record) => <>{record.createAt}</>,
    },
    {
      title: "Trạng thái",
      dataIndex: "statusRead",
      key: "statusRead",
      render: (_, record) => (
        <>
          {record.statusRead ? (
            <Tag color="green">Đã đọc</Tag>
          ) : (
            <Tag color="gray">Chưa đọc</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <>
          <Link to={`/detail-cv/${record._id}`}>
            <Tooltip title="Xem chi tiết">
              <Button icon={<EyeOutlined />}></Button>
            </Tooltip>
          </Link>
          <DeleteCV record={record} onReload={handleReload} />
        </>
      ),
    },
  ];

  return (
    <>
      <div className={className}>
        <Table dataSource={listCV || []} columns={columns} rowKey="_id" />
      </div>
    </>
  );
}

export default CVList;
