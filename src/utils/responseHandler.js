// Response Handler - Strategy Pattern
class ResponseHandler {
  static handleResponse(response) {
    if (!response) {
      throw new Error("No response received");
    }

    // Handle both old format {status: "success"} and new format {success: true}
    if (response.success === true || response.status === "success") {
      return {
        success: true,
        data: response.data,
        message: response.message,
        pagination: response.pagination, // Include pagination field
      };
    } else {
      throw new Error(response.message || "Request failed");
    }
  }

  static handleError(error) {
    // console.error and console.log removed
    return {
      success: false,
      data: null,
      message: error.message || "Something went wrong",
    };
  }
}

export default ResponseHandler;
