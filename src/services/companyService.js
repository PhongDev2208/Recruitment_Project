import { get, patch, post } from "../utils/request";

export const login = async (email, password = "") => {
  const params = { email };
  if (password !== "") {
    params.password = password;
  }
  return await get(`companies`, params);
};

export const checkExist = async (type, value) => {
  const params = { [type]: value };
  return await get(`companies`, params);
};

export const createCompany = async (options) => {
  return await post(`companies`, options);
};

export const getDetailCompany = async (id) => {
  return await get(`companies/${id}`);
};

export const editCompany = async (id, options) => {
  return await patch(`companies/${id}`, options);
};

export const getAllCompany = async (params = {}) => {
  return await get(`companies`, params);
};
