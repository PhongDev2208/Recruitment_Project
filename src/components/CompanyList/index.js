import { Button, Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { getAllCompany } from "../../services/companyService";
import { useApi } from "../../hooks/useApi";
import LoadingSpinner from "../LoadingSpinner";
import ErrorDisplay from "../ErrorDisplay";

function CompanyList() {
  const { data, loading, error, refetch } = useApi(getAllCompany);

  if (loading) {
    return <LoadingSpinner message="Loading companies..." />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message="Error loading companies"
        description={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <>
      <h2>Danh sách một số công ty</h2>
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
                    Số nhân sự: <strong>{item.quantityPeople}</strong>
                  </div>
                  <div className="mb-10">
                    Địa chỉ: <strong>{item.address}</strong>
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
      <Link to="/company">
        <Button className="mt-20">Xem thêm</Button>
      </Link>
    </>
  );
}

export default CompanyList;
