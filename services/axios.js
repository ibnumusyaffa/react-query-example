import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";

let client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,

  paramsSerializer: function (params) {
    return qs.stringify(params, { encode: false, skipNulls: true });
  },
});

export const syncToken = () => {
  client.defaults.headers.Authorization = `Bearer ${Cookies.get(
    "token"
  )}`;
};
export const clearToken = () => {
  delete client.defaults.headers.Authorization
};

export default client;
