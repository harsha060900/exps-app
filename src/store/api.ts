import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.93.159:5000/" }),
  tagTypes: ["Category", "SubCategory"],
  endpoints: (builder) => ({})
});
