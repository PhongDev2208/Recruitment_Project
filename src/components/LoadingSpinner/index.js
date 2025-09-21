import { Spin } from "antd";

const LoadingSpinner = ({
  size = "large",
  message = "Loading...",
  style = {},
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        ...style,
      }}
    >
      <Spin size={size} tip={message} />
    </div>
  );
};

export default LoadingSpinner;
