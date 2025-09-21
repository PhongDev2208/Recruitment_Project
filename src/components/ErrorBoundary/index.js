import React from "react";
import { Alert, Button } from "antd";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "50px", textAlign: "center" }}>
          <Alert
            message="Something went wrong"
            description={
              this.state.error?.message || "An unexpected error occurred"
            }
            type="error"
            showIcon
            action={
              <Button
                size="small"
                type="primary"
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
