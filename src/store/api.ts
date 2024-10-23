import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.178.122:5000/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.200.67.191:5000/" }),
  tagTypes: ["Category", "SubCategory", "Expense", "PieChart"],
  endpoints: (builder) => ({})
});
