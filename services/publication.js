import axios from "./axios";

export function getPublication({ page = 1, limit = 10, ...other }) {
  return axios.get("/publication", {
    params: {
      page: page,
      limit: limit,
      ...other,
    },
  });
}

export function getPublicationDownloadHistory({
  id,
  page = 1,
  limit = 10,
  ...other
}) {
  return axios.get(`/publication/download-count-history/${id}`, {
    params: {
      page: page,
      limit: limit,
      ...other,
    },
  });
}

export function getPublicationDownloadCount({
  page = 1,
  limit = 10,
  ...other
}) {
  return axios.get("/publication/download-count", {
    params: {
      page: page,
      limit: limit,
      ...other,
    },
  });
}

export function deletePublication(id) {
  return axios.delete(`/publication/${id}`);
}

export function postPublication(values) {
  return axios.post(`/publication`, values);
}
