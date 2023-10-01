import axios from "axios";

const BASE_URL = "https://strore-eccomerce.up.railway.app/api/";

const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${currentUser?.accessToken}` },
});
