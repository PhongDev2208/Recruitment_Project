import { get } from "../utils/request";

export const getListTag = async () => {
  return await get(`tags`);
};
