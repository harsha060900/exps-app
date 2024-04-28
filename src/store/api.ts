import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.7:5000/" }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({}),
  })