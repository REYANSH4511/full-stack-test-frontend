import axios from "axios";

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE}/`,
  // timeout: 15000,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
      }
    }
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url) => instance.get(url).then(responseBody),

  post: (url, body) =>
    instance
      .post(url, body, { headers: { "content-type": "application/json" } })
      .then(responseBody),

  put: (url, body) => instance.put(url, body, {}).then(responseBody),
  patch: (url, body) => instance.patch(url, body, {}).then(responseBody),
  delete: (url, body) => instance.delete(url, body, {}).then(responseBody),
};

export const allApi = {
  saveBrowserDetails: (data) => requests.post("/api/browser-details", data),
  savePersonalDetails: (data) =>
    requests.post("api/user-details/personal-details", data),
  saveAddressDetails: (data) =>
    requests.post("api/user-details/address-details", data),
};
