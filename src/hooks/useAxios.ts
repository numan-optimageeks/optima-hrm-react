import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_MAILING_BACKEND,
});

export const useAxios = () => {
  const navigate = useNavigate();
  const logoutUser = () => {};

  useEffect(() => {
    const resquestInterceptor = AxiosClient.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(process.env.REACT_APP_TOKEN_FIELD);
        if (!("Authorization" in config.headers) && token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = AxiosClient.interceptors.response.use(
      (response) => {
        if (response?.data?.status === "error") {
          return Promise.reject(new Error(response.data?.message));
        }
        return response;
      },
      (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          logoutUser();
          navigate("/");
        }

        return Promise.reject(error);
      }
    );

    return () => {
      AxiosClient.interceptors.request.eject(resquestInterceptor);
      AxiosClient.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, logoutUser]);

  return AxiosClient;
};
