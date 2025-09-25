import { get } from "../utils/request";

export const getListTag = async (params = {}) => {
  return await get(`tags`, params);
};

export const getAllTags = async (params = {}) => {
  return await get(`tags/all`, params);
};
