import * as company from "../../services/companyService";
import { setCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authentication";
import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { rules } from "../../constants";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    try {
      const response = await company.login(values.email, values.password);

      // Check ResponseHandler format: {success, data, message}
      if (response.success && response.data && response.data.length > 0) {
        const userData = response.data[0];
        const time = 1;
        setCookie("id", userData._id, time);
        setCookie("companyName", userData.companyName, time);
        setCookie("email", userData.email, time);
        setCookie("token", userData.token || "dummy-token", time);
        dispatch(checkAuthen(true));
        navigate("/");
      } else {
        messageApi.error("Tài khoản hoặc mật khẩu không chính xác!");
      }
    } catch (error) {
      console.error("Login error:", error);
      messageApi.error("Có lỗi xảy ra khi đăng nhập!");
    }
  };

  return (
    <>
      {contextHolder}

      <Row justify="center">
        <Col span={12}>
          <Card title="Đăng nhập">
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item label="Email" name="email" rules={rules}>
                <Input />
              </Form.Item>

              <Form.Item label="Password" name="password" rules={rules}>
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
