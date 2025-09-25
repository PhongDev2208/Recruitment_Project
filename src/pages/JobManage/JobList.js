/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getListJob } from "../../services/jobService";
import { Button, Table, Tag, Tooltip, Input } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
import { getCookie } from "../../helpers/cookie";
import { usePaginatedApi } from "../../hooks/useApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorDisplay from "../../components/ErrorDisplay";

function JobList(props) {
  const idCompany = getCookie("id");
  const { className = "" } = props;
  const [searchValue, setSearchValue] = useState("");

  const {
    data: jobs,
    loading,
    error,
    pagination,
    params,
    search,
    goToPage,
    updateParams,
    resetFilters,
    refetch,
  } = usePaginatedApi(getListJob, { idCompany });

  // Sync local search value with params
  useEffect(() => {
    setSearchValue(params?.keyword || "");
  }, [params?.keyword]);

  useEffect(() => {
    refetch();
  }, []);

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
        {/* Search Section */}
        <div className="mb-20">
          <Input.Search
            placeholder="Tìm kiếm theo tên job..."
            allowClear
            value={searchValue}
            onSearch={handleSearch}
            onChange={handleInputChange}
            style={{ width: 300 }}
            enterButton={<SearchOutlined />}
          />
          <Button onClick={resetFilters} style={{ marginLeft: 10 }}>
            Reset
          </Button>
        </div>

        {/* Status Filter */}
        <div className="mb-20">
          <Button.Group>
            <Button
              onClick={() => updateParams({ status: undefined, page: 1 })}
              type={!params?.status ? "primary" : "default"}
            >
              Tất cả
            </Button>
            <Button
              onClick={() => updateParams({ status: "true", page: 1 })}
              type={params?.status === "true" ? "primary" : "default"}
            >
              Đang bật
            </Button>
            <Button
              onClick={() => updateParams({ status: "false", page: 1 })}
              type={params?.status === "false" ? "primary" : "default"}
            >
              Đang tắt
            </Button>
          </Button.Group>
        </div>

        {/* Table with Pagination */}
        <Table
          dataSource={jobs || []}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{
            current: pagination.currentPage,
            pageSize: pagination.limitItems,
            total: pagination.totalRecords,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} jobs`,
            onChange: (page, pageSize) => {
              goToPage(page, pageSize);
            },
            onShowSizeChange: (current, size) => {
              goToPage(1, size);
            },
          }}
        />
      </div>
    </>
  );
}

export default JobList;
