import { axiosInstance } from "../shared/lib/axiosInstance";

export default class UserApi {
  static async register(inputs) {
    const { data } = await axiosInstance.post("/auth/register", {
      user_name: inputs.user_name,
      email: inputs.email,
      password: inputs.password,
    });
    return data;
  }

  static async login(inputs) {
    const { data } = await axiosInstance.post("/auth/login", {
      email: inputs.email || inputs.user_name,
      password: inputs.password,
    });
    return data;
  }

  static async logout() {
    const { data } = await axiosInstance.get("/auth/logout");
    return data;
  }

  static async refresh() {
    const { data } = await axiosInstance.get("/auth/refresh");
    return data;
  }
}
