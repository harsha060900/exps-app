import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.135:5000/" }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({})
});
