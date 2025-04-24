"use client";

import axios from "axios";
import { signOut, getSession } from "next-auth/react";

const organizationApi = axios.create({
  baseURL: "https://advancedpos.duckdns.org/api/organization",
  headers: {
    "Content-Type": "application/json",
  },
});

organizationApi.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.token && session?.user?.type === "organization") {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

organizationApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      console.warn("Organization token expired or forbidden. Logging out...");
      await signOut({ callbackUrl: "/" });
    }
    return Promise.reject(error);
  }
);

const retailerApi = axios.create({
  baseURL: "https://advancedpos.duckdns.org/api/retailer",
  headers: {
    "Content-Type": "application/json",
  },
});

retailerApi.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user?.token && session?.user?.type === "retailer") {
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

retailerApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      console.warn("Retailer token expired or forbidden. Logging out...");
      await signOut({ callbackUrl: "/" });
    }
    return Promise.reject(error);
  }
);

export { organizationApi, retailerApi };
