import axios from "./axios";

export function getLog({ page = 1, limit = 10, keyword }) {
  return axios.get("/log", {
    params: {
      page: page,
      limit: limit,
      keyword,
    },
  });
}
