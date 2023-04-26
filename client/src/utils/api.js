import axios from "axios";
const _BASE_URL = "https://react-node-stripe-payment-server-git-main-cool-cody.vercel.app";

export const postRequest = (path, data) => {
  return axios.post(`${_BASE_URL}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getRequest = (path) => {
  return axios.get(`${_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
