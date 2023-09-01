import axios from "./axios";

export function getDetail({
  page = 1,
  page_size = 10,
  keyword,
  order_column,
  order_state,
  status,
  filter = null,
  province_id = null,
}) {
  return axios.get("/copyright/search", {
    params: {
      ...filter,
      page,
      page_size,
      keyword,
      order_column,
      order_state,
      status,
      province_id,
    },
  });
}

export function getExport() {
  return axios.get("/copyright-report/export", {
    responseType: "arraybuffer",
  });
}
