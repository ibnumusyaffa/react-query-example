import axios from "./axios";
export function postSync(type, values) {
  return axios.post(`/sync-manual/${type}`, values);
}
