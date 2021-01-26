import Axios from "axios";
import Config from "../config/Config";

let api = {};

["GET", "POST", "PUT", "PATCH", "DELETE"].forEach((method) => {
  api[method.toLowerCase()] = async (url, params, callback = () => {}) => {
    await Axios[method.toLowerCase()](`${Config.SERVER_URL}${url}`, params)
      .then((res) => {
        callback(false, res);
      })
      .catch((err) => {
        callback(err);
      });
  };
});

export default api;
