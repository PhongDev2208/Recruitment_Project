// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1/",
  TIMEOUT: 10000,
};

// API Status
export const API_STATUS = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
