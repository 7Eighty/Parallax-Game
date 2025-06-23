import axios from "axios";

// Конфигурация для подключения к серверу
const VITE_TARGET = "http://localhost:3000";
const VITE_API = "/api";

// todo Создаём экземпляр axios
export const axiosInstance = axios.create({
  baseURL: `${VITE_TARGET}${VITE_API}`, // ? все запросы летят на /api
  headers: { "Content-Type": "application/json" }, //? все запросы летят с указанием типа контента
  withCredentials: true, // ! - все запросы принимают куки с сервера
});

// * переменная для хранения кратковременного токена
let accessToken = "";

// * используй эту ф-ию там, где ты ожидаешь приход токенов
export function setAccessToken(token) {
  accessToken = token;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.authorization && accessToken) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// * Перехватчик ответов:
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // ? Запомнили ин-фю о прошлом запросе
    const prevRequest = error.config;
    // ? Проверяем статус
    // ? проверка на первичность запроса, если попали внутрь
    // ? значит токен протух и нужна новая пара
    if (error.response?.status === 403 && !prevRequest.sent) {
      try {
        // ? Делаем запрос на пару токенов
        const response = await axiosInstance.get("/auth/refresh");
        // ? Достаём токен из ответа
        if (response.data?.data?.accessToken) {
          setAccessToken(response.data.data.accessToken);
          // ? создаём новый ключ и sent для проверки первичности
          prevRequest.sent = true;
          // ? Установим заголовки
          prevRequest.headers.authorization = `Bearer ${response.data.data.accessToken}`;
          // ? Делаем повторный запрос
          return axiosInstance(prevRequest);
        }
      } catch (refreshError) {
        console.log("Refresh token failed:", refreshError);
      }
    }
    return Promise.reject(error);
  }
);
