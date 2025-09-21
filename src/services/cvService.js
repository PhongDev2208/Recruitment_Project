import { del, get, patch, post } from "../utils/request";

export const getListCV = async (id) => {
  return await get(`cvs?idCompany=${id}`);
};

export const getDetailCV = async (id) => {
  return await get(`cvs/${id}`);
};

export const changeStatusCV = async (id, options) => {
  return await patch(`cvs/${id}`, options);
};

export const deleteCV = async (id) => {
  return await del(`cvs/${id}`);
};

export const createCV = async (options) => {
  return await post(`cvs`, options);
};

export const getCVStatistic = async () => {
  return await get(`cvs/statistic`);
};
