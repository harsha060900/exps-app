import { api } from "../api";

export const expenseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExpense: builder.query({
      query: (param) => {
        return {
          url: `expense?orderBy=${param.orderBy}&start=${param.start}&end=${param.end}`
        };
      },
      providesTags: ["Expense"]
    }),
    addExpense: builder.mutation({
      query: (data) => {
        return {
          url: `expense`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["Expense"]
    }),
    updateExpense: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `expense/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["Expense"]
    }),
    deleteExpense: builder.mutation({
      query: (id) => {
        return {
          url: `expense/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["Expense"]
    })
  }),
  overrideExisting: true
});

export const {
  useGetExpenseQuery,
  useAddExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation
} = expenseApi;
