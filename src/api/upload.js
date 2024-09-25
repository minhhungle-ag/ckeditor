const { default: axiosClient } = require("./axiosClient");

export const uploadApi = {
  uploadFile(body) {
    return axiosClient.post(`/fileupload/uploadavarta`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
