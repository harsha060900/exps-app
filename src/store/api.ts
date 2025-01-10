import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http:///192.168.29.162:5000/" }),
  // baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.16:5000/" }),
  tagTypes: ["Category", "SubCategory", "Expense", "PieChart"],
  endpoints: (builder) => ({})
});
