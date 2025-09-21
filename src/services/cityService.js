import { get } from "../utils/request";

export const getListCity = async () => {
  return await get(`cities`);
};
