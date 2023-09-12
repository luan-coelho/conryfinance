"use client";

import { useLoading } from "@/contexts/request-loading-context";
import api from "@/services/api";
import { useEffect } from "react";

export const useAxiosInterceptor = () => {
  const { setLoading } = useLoading();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(config => {
      setLoading(true);
      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      response => {
        setLoading(false);
        return response;
      },
      error => {
        setLoading(false);
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoading]);
};
