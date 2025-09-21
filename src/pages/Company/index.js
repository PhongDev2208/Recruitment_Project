import { getAllCompany } from "../../services/companyService";
import { Card, Col, Row, Spin, Alert } from "antd";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";

function Company() {
  const { data, loading, error } = useApi(getAllCompany);

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message="Error loading companies" type="error" showIcon />;
  }

  return (
    <>
      <h1>Danh sách công ty</h1>

      <Row gutter={[20, 20]}>
        {Array.isArray(data) &&
          data.map((item) => (
            <Col span={8} key={item._id}>
              <Link to={`/company/${item._id}`}>
                <Card>
                  <div className="mb-10">
                    Công ty:{" "}
                    <strong>
                      {item.companyName || item.name || "Chưa cập nhật"}
                    </strong>
                  </div>
                  <div className="mb-10">
                    Số điện thoại: <strong>{item.phone}</strong>
                  </div>
                  <div className="mb-10">
                    Số nhân sự: <strong>{item.quantityPeople}</strong>
                  </div>
                  <div className="mb-10">
                    Website: <strong>{item.website}</strong>
                  </div>
                  <div className="mb-10">
                    Địa chỉ: <strong>{item.address}</strong>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default Company;
