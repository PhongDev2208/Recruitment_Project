import { Alert, Button } from "antd";

const ErrorDisplay = ({
  message = "Something went wrong",
  description,
  onRetry,
  showRetry = true,
  type = "error",
}) => {
  return (
    <div style={{ padding: "20px" }}>
      <Alert
        message={message}
        description={description}
        type={type}
        showIcon
        action={
          showRetry && onRetry ? (
            <Button size="small" onClick={onRetry}>
              Retry
            </Button>
          ) : null
        }
      />
    </div>
  );
};

export default ErrorDisplay;
