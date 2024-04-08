import axios from "axios";

class FileServices {
  constructor() {
    this.URL = "http://localhost:8000"
  }
  sendFile = function (formData) {
    return axios.post(`${this.URL}/api/files/`, formData);
  };

  existsFile = function (fileKey) {
    return axios.get(`${this.URL}/api/file_is_ready/${fileKey}/`).then((response) => response.data);
  };

  getTable = function (fileKey, keys) {
    return axios
      .get(`${this.URL}/api/table/${fileKey}/`, {
        params: {
          keys: keys
        }
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };
}

export default new FileServices();