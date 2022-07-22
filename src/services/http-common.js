import axios from "axios";

export default axios.create({
  //   baseURL: "http://localhost:5000/api/v1/restaurants",
  baseURL:
    "https://5000-yegow-doniceserver-wqa7m78obof.ws-eu54.gitpod.io/api/v1/restaurants",
  headers: {
    "Content-Type": "application/json",
  },
});
