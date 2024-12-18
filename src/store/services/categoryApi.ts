import { api } from "../api";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (params) => {
        return {
          url: `category?search=${params}`
        };
      },
      providesTags: ["Category"]
    }),
    addCategory: builder.mutation({
      query: (data) => {
        return {
          url: `category`,
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["Category"]
    }),
    updateCategory: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `category/${id}`,
          method: "patch",
          body: data
        };
      },
      invalidatesTags: ["Category","Expense"]
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        console.log("q:", id);

        return {
          url: `category/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["Category","Expense"]
    })
  }),
  overrideExisting: true
});

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = categoryApi;
