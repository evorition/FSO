import axios from "axios";

import { DiaryEntry, NewDiartyEntry } from "./types";

const baseUrl = "http://localhost:3001/api/diaries";

const getAll = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const create = async (newObject: NewDiartyEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newObject);
  return response.data;
};

export default {
  create,
  getAll,
};
