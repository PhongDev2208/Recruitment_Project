import { del, get, patch, post } from "../utils/request";

export const createJob = async (options) => {
  return await post(`jobs`, options);
};

export const updateJob = async (id, options) => {
  return await patch(`jobs/${id}`, options);
};

export const deleteJob = async (id) => {
  return await del(`jobs/${id}`);
};

export const getListJob = async (id) => {
  return await get(`jobs?idCompany=${id}`);
};

export const getDetailJob = async (id) => {
  return await get(`jobs/${id}`);
};

export const getAllJob = async () => {
  return await get(`jobs`);
};

export const getJobStatistic = async () => {
  return await get(`jobs/statistic`);
};
