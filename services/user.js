import axios from "./axios";

export function getUser({ page = 1, pageSize = 10, keyword }) {
  return axios.get("/user", {
    params: {
      page: page,
      limit: pageSize,
      keyword,
    },
  });
}

export function deleteUser(id) {
  return axios.delete(`/user/${id}`);
}

export function postUser(values) {
  return axios.post(`/user`, values);
}

export function putUser(id, values) {
  return axios.put(`/user/${id}`, values);
}

export function getProvince() {
  return axios.get("/place/province");
}

export function getUserById(id) {
  return axios.get(`/user/${id}`);
}
