import { get, patch, post } from "../utils/request";

export const login = async (email, password = "") => {
  let pass = "";
  if (password !== "") {
    pass = `&password=${password}`;
  }
  return await get(`companies?email=${email}${pass}`);
};

export const checkExist = async (type, value) => {
  return await get(`companies?${type}=${value}`);
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

export const getAllCompany = async () => {
  return await get(`companies`);
};
