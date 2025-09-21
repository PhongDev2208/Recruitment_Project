/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Spin, Alert } from "antd";
import { getCookie } from "../../helpers/cookie";
import { getDetailCompany } from "../../services/companyService";
import { useApi } from "../../hooks/useApi";

function InfoCompany() {
  const idCompany = getCookie("id");
  const {
    data: info,
    loading,
    error,
  } = useApi(() => getDetailCompany(idCompany), [idCompany]);

  if (loading) {
    return (
      <Card
        title="Thông tin công ty"
        size="small"
        style={{ textAlign: "center" }}
      >
        <Spin size="large" />
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Thông tin công ty" size="small">
        <Alert message="Lỗi" description={error} type="error" showIcon />
      </Card>
    );
  }

  return (
    <>
      {info && (
        <Card title="Thông tin công ty" size="small">
          <div>
            Tên công ty:{" "}
            <strong>{info.companyName || info.name || "Chưa cập nhật"}</strong>
          </div>
          <div>
            Email: <strong>{info.email}</strong>
          </div>
          <div>
            Số điện thoại: <strong>{info.phone}</strong>
          </div>
          <div>
            Số nhân viên: <strong>{info.quantityPeople}</strong>
          </div>
        </Card>
      )}
    </>
  );
}

export default InfoCompany;
