import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://apibreakinghiphop.gvbsoft.vn/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Auto attach token to request if available in local storage
  const token = localStorage.getItem("token");
  if (config.url !== "/login" && token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Do something before request is sent
  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // for single response: get data
    // for plural response: get data + meta
    const axiosData = response.data;
    return axiosData.totals ? axiosData : axiosData.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(
      new Error(error?.response?.data?.message || "Something went wrong.")
    );
  }
);

export default axiosClient;
