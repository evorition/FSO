import axios from "axios";

import userService from "./user";

const baseUrl = "/api/blogs";

const getHeaders = () => {
  return {
    headers: {
      Authorization: userService.getToken()
        ? `Bearer ${userService.getToken()}`
        : null,
    },
  };
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getHeaders());
  return response.data;
};

const update = async (updatedObject) => {
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject,
    getHeaders()
  );
  return response.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, getHeaders());
};

export default { getAll, create, update, remove };
