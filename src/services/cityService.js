import { get } from "../utils/request";

export const getListCity = async (params = {}) => {
  return await get(`cities`, params);
};

export const getAllCities = async (params = {}) => {
  return await get(`cities/all`, params);
};
