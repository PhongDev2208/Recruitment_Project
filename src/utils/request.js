import ResponseHandler from "./responseHandler";
import { API_CONFIG, HTTP_STATUS } from "../constants/api";

const API_DOMAIN = API_CONFIG.BASE_URL;

// Base request function with error handling
const baseRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      let errorMessage = result.message;

      // Use HTTP_STATUS constants for better error messages
      switch (response.status) {
        case HTTP_STATUS.BAD_REQUEST:
          errorMessage = errorMessage || "Yêu cầu không hợp lệ";
          break;
        case HTTP_STATUS.UNAUTHORIZED:
          errorMessage = errorMessage || "Chưa xác thực";
          break;
        case HTTP_STATUS.FORBIDDEN:
          errorMessage = errorMessage || "Không có quyền truy cập";
          break;
        case HTTP_STATUS.NOT_FOUND:
          errorMessage = errorMessage || "Không tìm thấy tài nguyên";
          break;
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          errorMessage = errorMessage || "Lỗi server nội bộ";
          break;
        default:
          errorMessage =
            errorMessage || `HTTP error! status: ${response.status}`;
      }

      // console.log removed
      throw new Error(errorMessage);
    }

    return ResponseHandler.handleResponse(result);
  } catch (error) {
    // Handle network errors and other fetch errors
    let errorMessage = error.message;

    if (error.name === "TypeError" && error.message === "Failed to fetch") {
      errorMessage =
        "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng hoặc server có đang chạy.";
    } else if (error.message.includes("ERR_CONNECTION_REFUSED")) {
      errorMessage =
        "Server không phản hồi. Vui lòng kiểm tra server có đang chạy.";
    } else if (error.message.includes("ERR_NETWORK")) {
      errorMessage = "Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.";
    }

    // console.log removed
    return ResponseHandler.handleError(new Error(errorMessage));
  }
};

export const get = async (path, options = {}) => {
  return baseRequest(API_DOMAIN + path, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...options,
  });
};

export const post = async (path, data = {}) => {
  return baseRequest(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const del = async (path) => {
  return baseRequest(API_DOMAIN + path, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const patch = async (path, data = {}) => {
  return baseRequest(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
