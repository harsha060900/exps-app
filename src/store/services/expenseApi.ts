import { api } from "../api";

export const expenseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addExpense: builder.mutation({
      query: (data) => {
        return {
          url: `expense`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["Expense"]
    })
  }),
  overrideExisting: true
});

export const { useAddExpenseMutation } = expenseApi;
