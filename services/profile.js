import axios from "./axios";

export function getProfile() {
  return axios.get("/auth/profile");
}