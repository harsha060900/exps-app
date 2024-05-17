import { api } from "../api";

export const expenseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExpense: builder.query({
      query: (param) => {
        console.log('p:',param);
        
        return {
          url: `expense?orderBy=${param.orderBy}`,
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
    })
  }),
  overrideExisting: true
});

export const { useGetExpenseQuery,useAddExpenseMutation } = expenseApi;
