/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Spin, Alert } from "antd";
import { useEffect, useState } from "react";
import { getAllCompany } from "../../services/companyService";
import JobItem from "../../components/JobItem";
import { useApi } from "../../hooks/useApi";

function SearchList(props) {
  const { data = [] } = props;
  const [dataFinal, setDataFinal] = useState([]);

  // Get all companies using useApi
  const {
    data: companies,
    loading: companiesLoading,
    error: companiesError,
  } = useApi(() => getAllCompany());

  useEffect(() => {
    if (companies && data.length > 0) {
      const newData = data.map((item) => {
        const infoCompany = companies.find(
          (itemCompany) => itemCompany._id === item.idCompany
        );
        return {
          infoCompany: infoCompany,
          ...item,
        };
      });
      setDataFinal(newData);
    } else if (data.length === 0) {
      setDataFinal([]);
    }
  }, [companies, data]);

  if (companiesLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Đang tải danh sách công ty...</div>
      </div>
    );
  }

  if (companiesError) {
    return (
      <Alert
        message="Lỗi"
        description={companiesError}
        type="error"
        showIcon
        style={{ marginTop: 16 }}
      />
    );
  }

  return (
    <>
      {dataFinal.length > 0 ? (
        <div className="mt-20">
          <Row gutter={[20, 20]}>
            {dataFinal.map((item) => (
              <Col span={8} key={item._id}>
                <JobItem item={item} infoCompany={item.infoCompany} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="mt-20">Không tìm thấy công việc nào.</div>
      )}
    </>
  );
}

export default SearchList;
