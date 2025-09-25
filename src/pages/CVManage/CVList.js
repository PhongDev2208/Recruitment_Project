/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Table, Tag, Tooltip, Input } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import { getListCV } from "../../services/cvService";
import { getCookie } from "../../helpers/cookie";
import CVJobName from "./CVJobName";
import DeleteCV from "./DeleteCV";
import { usePaginatedApi } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";
import { useState, useEffect } from "react";

function CVList(props) {
  const idCompany = getCookie("id");
  const { className = "" } = props;
  const [searchValue, setSearchValue] = useState("");

  const {
    data: listCV,
    loading,
    error,
    pagination,
    params,
    search,
    updateParams,
    goToPage,
    changeLimit,
    refetch,
  } = usePaginatedApi(getListCV, {
    limit: 10,
    idCompany: idCompany,
  });

  // Sync local search value with params
  useEffect(() => {
    setSearchValue(params?.keyword || "");
  }, [params?.keyword]);

  const handleReload = () => {
    refetch();
  };

  const handleSearch = (value) => {
    search(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      search("");
    }
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
        {/* Search and Filter Controls */}
        <div style={{ marginBottom: 16, display: "flex", gap: 16 }}>
          <Input.Search
            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
            allowClear
            value={searchValue}
            onSearch={handleSearch}
            onChange={handleInputChange}
            style={{ width: 300 }}
          />
          <Button.Group>
            <Button
              onClick={() => updateParams({ statusRead: undefined, page: 1 })}
              type={!params?.statusRead ? "primary" : "default"}
            >
              Tất cả
            </Button>
            <Button
              onClick={() => updateParams({ statusRead: "true", page: 1 })}
              type={params?.statusRead === "true" ? "primary" : "default"}
            >
              Đã đọc
            </Button>
            <Button
              onClick={() => updateParams({ statusRead: "false", page: 1 })}
              type={params?.statusRead === "false" ? "primary" : "default"}
            >
              Chưa đọc
            </Button>
          </Button.Group>
        </div>

        <Table
          dataSource={listCV || []}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{
            current: pagination?.currentPage || 1,
            pageSize: pagination?.limitItems || 10,
            total: pagination?.totalRecords || 0,
            showTotal: (total, range) =>
              `${range?.[0] || 0}-${range?.[1] || 0} của ${total} CV`,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            onChange: (page) => {
              goToPage(page);
            },
            onShowSizeChange: (current, size) => {
              changeLimit(size);
            },
          }}
        />
      </div>
    </>
  );
}

export default CVList;
