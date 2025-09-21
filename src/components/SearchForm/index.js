import { Input, Select, Form, Button, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { getListCity } from "../../services/cityService";
import { useApi } from "../../hooks/useApi";

function SearchForm() {
  const navigate = useNavigate();
  const { data: cityData, loading } = useApi(getListCity);

  const handleFinish = (values) => {
    let city = values.city || "";
    city = values.city === "All" ? "" : city;
    navigate(`/search?city=${city}&keyword=${values.keyword || ""}`);
  };

  // Prepare city options
  const cityOptions = cityData
    ? [
        { key: 0, value: "All", label: "Tất cả thành phố" },
        ...cityData.map((item) => ({
          key: item.key,
          value: item.value,
          label: item.value,
        })),
      ]
    : [];

  return (
    <>
      <h1>1000+ IT Jobs For Developers</h1>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Form onFinish={handleFinish}>
          <Row gutter={[12, 12]}>
            <Col xxl={6} xl={6} lg={6}>
              <Form.Item name="city">
                <Select
                  options={cityOptions}
                  placeholder="Chọn thành phố"
                  fieldNames={{ label: "label", value: "value" }}
                />
              </Form.Item>
            </Col>
            <Col xxl={15} xl={15} lg={15}>
              <Form.Item name="keyword">
                <Input placeholder="Nhập từ khóa..." />
              </Form.Item>
            </Col>
            <Col xxl={3} xl={3} lg={3}>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Tìm kiếm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}

export default SearchForm;
