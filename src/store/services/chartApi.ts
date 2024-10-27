import { api } from "../api";

export const chartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPieChart: builder.query({
      query: (param) => {
        return {
          url: `pie-chart?filterBy=${param.filterBy}&start=${param.start}+" 00:00:00"&end=${param.end}+" 23:59:59"`
        };
      },
      providesTags: ["PieChart"]
    })
  }),
  overrideExisting: true
});
export const { useGetPieChartQuery } = chartApi;
