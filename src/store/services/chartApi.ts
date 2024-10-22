import { api } from "../api";

export const chartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPieChart: builder.query({
      query: (param) => {
        return {
          url: `pie-chart?filterBy=${param.filterBy}&start=${param.start}&end=${param.end}`
        };
      }
    })
  }),
  overrideExisting: true
});
export const { useGetPieChartQuery } = chartApi;
